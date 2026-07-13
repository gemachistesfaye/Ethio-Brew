/**
 * Safe, tiny Markdown-ish renderer.
 *
 * SECURITY: we escape ALL HTML first, then apply a minimal subset of
 * formatting (**bold**, *italic*) on the already-escaped string. Because
 * attacker-controlled markup is escaped before our regexes run, no <script>,
 * <img onerror>, or other tag can ever reach the DOM as live HTML.
 *
 * Use this instead of `dangerouslySetInnerHTML={{ __html: rawModelOutput }}`
 * for any content that originates from the AI or from user input.
 */
const escapeHtml = (str) =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

export const renderSafeMarkdown = (raw) => {
    if (typeof raw !== 'string') return '';

    // 1. Neutralize any HTML/entities the model or a user may have injected.
    let out = escapeHtml(raw);

    // 2. Apply formatting on the escaped text. Order matters: bold before italic
    //    so ** isn't consumed by the single-* rule.
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

    // 3. Preserve line breaks.
    out = out.replace(/\n/g, '<br/>');

    return out;
};
