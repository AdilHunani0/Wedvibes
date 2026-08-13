'use client';

import { useState } from 'react';
import { signInWithGoogle } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      toast.error('Could not sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-[#e8c97e]/60 
                 rounded-xl py-3 px-4 bg-white hover:bg-[#fdf8f4] hover:border-[#c9a96e] transition-colors 
                 disabled:opacity-50 disabled:cursor-not-allowed text-[#2a1810]"
    >
      <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l5.7-5.7C34.6 6.5 29.6 4.5 24 4.5 12.9 4.5 4 13.4 4 24.5s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12.5 24 12.5c3.1 0 5.9 1.1 8 3l5.7-5.7C34.6 6.5 29.6 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z"/>
        <path fill="#4CAF50" d="M24 44.5c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6c-2 1.4-4.6 2.2-7.7 2.2-5.2 0-9.7-3.3-11.3-8l-6.6 5.1C9.6 39.7 16.2 44.5 24 44.5z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.8l6.6 5.6C41.4 36 44 30.6 44 24.5c0-1.3-.1-2.7-.4-4z"/>
      </svg>
      <span className="text-sm font-semibold">
        {loading ? 'Connecting...' : 'Continue with Google'}
      </span>
    </button>
  );
}
