import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to elements with .reveal / .reveal-left class.
 * Also supports stagger via data-delay attribute.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => {
              el.classList.add('visible');
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = document.querySelectorAll('.reveal, .reveal-left');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}

/**
 * useCardGlow — tracks mouse position per-card for the radial gradient glow effect.
 */
export function useCardGlow() {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const handlers = [];

    cards.forEach((card) => {
      const handler = (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      };
      card.addEventListener('mousemove', handler);
      handlers.push({ card, handler });
    });

    return () => {
      handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler));
    };
  });
}

/**
 * useCounter — animates a number from 0 to target when visible.
 */
export function useCounter(ref, target, duration = 1500, suffix = '') {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const step = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(eased * target);
          if (ref.current) ref.current.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(entry.target);
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, target, duration, suffix]);
}
