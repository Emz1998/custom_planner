import React, { useEffect, useRef, useState } from 'react';
import Pages from './Pages';
import { generate12MonthsMonthly } from '../config/plannerConfig';
import { Link } from 'react-router-dom';

const PrintPreview = () => {
  const { months } = generate12MonthsMonthly(6, 2025, 'monday');
  const containerRef = useRef();
  const [focusReloadEnabled, setFocusReloadEnabled] = useState(() => {
    const disabledUntil = localStorage.getItem('focusReloadDisabledUntil');
    return !disabledUntil || Date.now() > parseInt(disabledUntil);
  });
  const [fileReloadEnabled, setFileReloadEnabled] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    setTimeout(() => {
      script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
    }, 100);

    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('Paged.js loaded!');

      if (window.PagedPolyfill && containerRef.current) {
        setTimeout(() => {
          window.PagedPolyfill.preview(containerRef.current);
        }, 100);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Vite HMR detection for file changes
    if (import.meta.hot) {
      import.meta.hot.on('vite:afterUpdate', () => {
        if (!fileReloadEnabled) return;
        console.log('File change detected - reloading...');
        window.location.reload();
      });
    }

    // Browser focus detection - reload on every focus if enabled
    const handleFocus = () => {
      if (!focusReloadEnabled) return;
      console.log('Browser focused - reloading...');
      
      // Set disable timer before reload
      const disableUntil = Date.now() + 2000; // 2 seconds from now
      localStorage.setItem('focusReloadDisabledUntil', disableUntil.toString());
      
      window.location.reload();
    };

    // Ctrl key to enable focus reload
    const handleKeyDown = (event) => {
      if (event.key === 'Control') {
        localStorage.removeItem('focusReloadDisabledUntil');
        setFocusReloadEnabled(true);
        console.log('Focus reload enabled');
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusReloadEnabled, fileReloadEnabled]);

  return (
    <div ref={containerRef} className="h-full">
      <div className="page-right"></div>
      {months.map((month, index) => (
        <React.Fragment key={index}>
          <Pages config={month.pages.left} style="page-left" />
          <Pages config={month.pages.right} style="page-right" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default PrintPreview;