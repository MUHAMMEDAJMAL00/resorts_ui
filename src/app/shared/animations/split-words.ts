/**
 * Wraps each word of the element's text in an overflow-hidden mask span so
 * GSAP can slide the words up out of their own "line masks":
 *
 *   <h1>Our Story</h1>
 *   → <h1><span class="x-word"><span class="x-word__inner">Our</span></span> …</h1>
 *
 * Style the masks with `overflow: hidden; display: inline-block` (see the
 * hero slider / page banner CSS) and animate `.<prefix>__inner`.
 */
export function splitWords(element: HTMLElement, prefix: string): void {
  const words = (element.textContent ?? '').trim().split(/\s+/);
  element.textContent = '';
  words.forEach((word, i) => {
    const mask = document.createElement('span');
    mask.className = prefix;
    const inner = document.createElement('span');
    inner.className = `${prefix}__inner`;
    inner.textContent = word;
    mask.appendChild(inner);
    element.appendChild(mask);
    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });
}
