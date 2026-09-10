/**
 * 3D Card Tilt Physics & Specular Glare Effect
 * Supports mouse tracking, perspective depth, and smooth reset.
 */

export function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Find all tilt cards
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach((card) => {
    let bounds;
    let isHovered = false;

    // Create dynamic glare element if not present
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      glare.style.position = 'absolute';
      glare.style.inset = '0';
      glare.style.pointerEvents = 'none';
      glare.style.borderRadius = 'inherit';
      glare.style.opacity = '0';
      glare.style.transition = 'opacity 0.25s ease';
      glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 75%)';
      card.appendChild(glare);
    }

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      isHovered = true;
      glare.style.opacity = '1';
    }

    function onMouseMove(e) {
      if (!isHovered || !bounds) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const halfWidth = bounds.width / 2;
      const halfHeight = bounds.height / 2;

      // Calculate tilt angles (degrees)
      const maxTilt = 10;
      const tiltX = -((mouseY - halfHeight) / halfHeight) * maxTilt;
      const tiltY = ((mouseX - halfWidth) / halfWidth) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glare position
      const glareX = (mouseX / bounds.width) * 100;
      const glareY = (mouseY / bounds.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 120, 40, 0.16), rgba(255, 255, 255, 0.08) 35%, transparent 70%)`;
    }

    function onMouseLeave() {
      isHovered = false;
      glare.style.opacity = '0';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}


