const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
const viewerTitle = document.querySelector('#viewer-title');
const viewerOriginal = document.querySelector('#viewer-original');
let previousFocus = null;

if (viewer && typeof viewer.showModal === 'function') {
  document.querySelectorAll('[data-lightbox]').forEach((link) => {
    link.addEventListener('click', (event) => {
      // Modified clicks retain the original image link's normal browser behavior.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      previousFocus = link;
      viewerTitle.textContent = link.dataset.caption;
      viewerImage.alt = link.querySelector('img').alt;
      viewerImage.src = link.href;
      viewerOriginal.href = link.href;
      viewer.showModal();
    });
  });

  viewer.querySelector('.lightbox-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    const rect = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
      viewer.close();
    }
  });
  viewer.addEventListener('close', () => {
    viewerImage.removeAttribute('src');
    previousFocus?.focus({ preventScroll: true });
  });
}
