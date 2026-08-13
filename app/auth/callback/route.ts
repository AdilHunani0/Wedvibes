import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as 'signup' | 'recovery' | 'email' | null;
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const supabase = await createServerClient();

  // Handle email verification link (token_hash flow)
  // Supabase sends this when a user clicks the confirmation email link
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
    // Verification failed — redirect to login with error message
    return NextResponse.redirect(`${origin}/auth/login?error=verification_failed`);
  }

  // Handle OAuth code exchange (Google sign-in, etc.)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Check if profile already exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        // Create profile on first Google login
        if (!existingProfile) {
          await supabase.from('profiles').insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'New User',
            avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
            role: 'customer',
            credits: 0,
          });
        }
      }

      return NextResponse.redirect(`${origin}${redirectTo}`);
    }
  }

  // Fallback — something went wrong, send to login
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
