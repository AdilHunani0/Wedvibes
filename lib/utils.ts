import { type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  // Simple implementation without clsx dependency conflict
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ')
}

export function formatPrice(paise: number): string {
  const rupees = paise / 100
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees)
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getWhatsAppShareUrl(cardUrl: string, names?: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const link = `${appUrl}/card/${cardUrl}`
  const message = names
    ? `We're getting married! 💍✨\n\n${names} joyfully invite you to celebrate our special day.\n\nTap the link below to view our interactive invitation:\n\n${link}`
    : `You're invited! 🌸\n\nTap the link below to view our interactive wedding invitation:\n\n${link}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}
