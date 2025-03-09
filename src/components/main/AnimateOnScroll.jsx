'use client';

import { useEffect, useRef, useState } from 'react';

const AnimateOnScroll = ({ 
  children, 
  className = '',
  animation = 'fade-up', // Default animation
  duration = 0.6, // Default duration in seconds
  delay = 0, // Default delay in seconds
  threshold = 0.2, // Default threshold (0-1)
  once = false // Changed default to false to enable repeated animations
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Animation class mapping
  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-10',
    'fade-down': 'opacity-0 -translate-y-10',
    'fade-left': 'opacity-0 translate-x-10',
    'fade-right': 'opacity-0 -translate-x-10',
    'zoom-in': 'opacity-0 scale-95',
    'zoom-out': 'opacity-0 scale-105',
  };

  // Return active animation class
  const getAnimationClass = () => {
    return isVisible ? '' : animationClasses[animation] || animationClasses['fade-up'];
  };

  // Transition style
  const transitionStyle = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}s`,
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay: `${delay}s`,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visibility based on intersection
        setIsVisible(entry.isIntersecting);
        
        // If once is true and element is intersecting, disconnect observer
        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '0px' 
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`${className} ${getAnimationClass()}`}
      style={transitionStyle}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;