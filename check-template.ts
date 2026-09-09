import { createClient } from '@supabase/supabase-js'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function run() {
  const cardUrlSlug = 'groom-and-bride-QGr5AW'

  // Get the order to find the generated file path
  const { data: order, error } = await supabase
    .from('orders')
    .select('id, card_url, status, generated_card_path, customization:customizations(*)')
    .eq('card_url', cardUrlSlug)
    .single()

  if (error || !order) {
    console.error('Order not found:', error)
    return
  }

  console.log('Order ID:', order.id)
  console.log('Generated card path:', order.generated_card_path)

  const cust: any = Array.isArray(order.customization) ? order.customization[0] : order.customization
  console.log('\nextra_fields:', JSON.stringify(cust?.extra_fields, null, 2))

  // Download the stored HTML and check what countdown_target resolved to
  const { data: fileData, error: downloadError } = await supabase.storage
    .from('generated-cards')
    .download(order.generated_card_path)

  if (downloadError || !fileData) {
    console.error('Failed to download card:', downloadError)
    return
  }

  const html = await fileData.text()
  
  // Find the countdown line
  const idx = html.indexOf('startCountdown')
  const snippet = html.substring(idx, idx + 200)
  console.log('\nCountdown JS snippet:')
  console.log(snippet)
}

run()
