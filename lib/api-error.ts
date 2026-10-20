/**
 * api-error.ts
 *
 * Centralised helper for safe API error handling.
 * - Logs the full error (including message / stack) SERVER-SIDE only.
 * - Returns a generic, user-friendly message to the client so internal
 *   details (DB schemas, stack traces, service names) are never leaked.
 */

import { NextResponse } from 'next/server'

/**
 * Log the error internally and return a safe JSON response.
 *
 * @param context  A short label for the log line, e.g. 'Card generation'
 * @param err      The caught error (unknown)
 * @param status   HTTP status code (default 500)
 * @param publicMsg Optional override for what the client sees.
 *                  Defaults to a generic "Something went wrong" message.
 */
export function apiError(
  context: string,
  err: unknown,
  status = 500,
  publicMsg?: string
): NextResponse {
  // Always log full details on the server
  console.error(`[${context}]`, err)

  const message = publicMsg ?? 'Something went wrong. Please try again.'
  return NextResponse.json({ error: message }, { status })
}
