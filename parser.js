import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export const parseDoc = () => {
    document.addEventListener('DOMContentLoaded', (event) => {
        console.log('DOM fully loaded and parsed');
        document.querySelectorAll('pre code').forEach((el) => {
            console.log(el);
          hljs.highlightElement(el);
        });
    });
}
