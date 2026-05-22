import { useState, useEffect, useRef } from 'react';

export default function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    
    const observer = new IntersectionObserver(([entry]) => {
      // Si el elemento entra al menos un 10% en pantalla, activamos la animación
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        // Una vez animado, dejamos de observarlo para ahorrar rendimiento
        if (currentElement) observer.unobserve(currentElement);
      }
    }, { threshold: 0.1, ...options });

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [options]);

  return [elementRef, isIntersecting];
}