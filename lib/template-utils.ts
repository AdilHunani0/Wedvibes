/**
 * Resolves {{#if FIELD_KEY}} ... {{/if}} conditional blocks in a template HTML string.
 *
 * Rules:
 * - If the referenced field value is a non-empty string (after trimming), the block
 *   is kept and the wrapper tags are removed.
 * - If the field is absent, an empty string, or all-whitespace, the entire block
 *   (including the opening/closing tags) is removed from the output.
 *
 * Blocks may be nested -- outer blocks are resolved first (iterative approach).
 *
 * @param html    Raw template HTML that may contain conditional block markers.
 * @param data    Key-value map of resolved field values (field name -> string value).
 */
export function resolveConditionals(
  html: string,
  data: Record<string, string | string[] | boolean | undefined | null>
): string {
  function hasValue(key: string): boolean {
    const fieldKey = key.toLowerCase()
    const value = data[fieldKey] ?? data[key]
    return (
      value !== undefined &&
      value !== null &&
      value !== false &&
      value !== 'false' &&
      (Array.isArray(value) ? value.length > 0 : String(value).trim() !== '')
    )
  }

  let previous = ''
  let current = html
  let safety = 0

  while (current !== previous && safety < 30) {
    previous = current

    // 1. Process no-else blocks first
    current = current.replace(
      /\{\{#if ([A-Za-z0-9_]+)\}\}((?:(?!\{\{#if|\{\{\/if\}\}|\{\{else\}\})[\s\S])*?)\{\{\/if\}\}/g,
      (_match, key, content) => (hasValue(key) ? content : '')
    )

    // 2. Process blocks with {{else}}
    current = current.replace(
      /\{\{#if ([A-Za-z0-9_]+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g,
      (_match, key, ifContent, elseContent) => (hasValue(key) ? ifContent : elseContent)
    )

    safety++
  }

  return current
}
