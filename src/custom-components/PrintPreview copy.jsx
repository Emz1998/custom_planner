import React, { useEffect, useRef, useState } from 'react';
import Pages from './Pages';
import { generateMonthWithWeeklyPages } from '../config/plannerConfig';
import '../index.css';

const PrintPreview = () => {
  console.log('PrintPreview component mounted');
  const { pages } = generateMonthWithWeeklyPages(6, 6, 2025, 'monday');
  const containerRef = useRef();
  const [focusReloadEnabled, setFocusReloadEnabled] = useState(() => {
    const disabledUntil = localStorage.getItem('focusReloadDisabledUntil');
    return !disabledUntil || Date.now() > parseInt(disabledUntil);
  });
  const [fileReloadEnabled, setFileReloadEnabled] = useState(true);

  // Clear browser cache on component mount
  useEffect(() => {
    // Force reload of all cached resources
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }

    // Clear memory cache by reloading with cache bypass
    if (performance && performance.navigation.type !== 1) {
      // Only do hard reload if not already a reload
      const urlParams = new URLSearchParams(window.location.search);
      if (!urlParams.has('cacheBust')) {
        urlParams.set('cacheBust', Date.now().toString());
        window.location.search = urlParams.toString();
      }
    }
  }, []);

  useEffect(() => {
    // Function to wait for all stylesheets to load
    const waitForStyles = () => {
      return new Promise((resolve) => {
        const stylesheets = Array.from(document.styleSheets);
        const checkStyles = () => {
          const allLoaded = stylesheets.every((sheet) => {
            try {
              // Try to access cssRules to check if stylesheet is loaded
              return sheet.cssRules || sheet.rules;
            } catch (e) {
              // Cross-origin stylesheets will throw, but that's ok
              return true;
            }
          });

          if (allLoaded) {
            // Additional check: wait for computed styles to be applied
            const testElement = document.createElement('div');
            testElement.className = 'pagedjs_page';
            document.body.appendChild(testElement);
            const computedStyle = window.getComputedStyle(testElement);
            document.body.removeChild(testElement);

            // If styles are applied, border should be set
            if (computedStyle.borderWidth !== '0px') {
              resolve();
            } else {
              setTimeout(checkStyles, 100);
            }
          } else {
            setTimeout(checkStyles, 100);
          }
        };

        // Start checking after a small delay
        setTimeout(checkStyles, 100);

        // Fallback: resolve after 2 seconds regardless
        setTimeout(resolve, 2000);
      });
    };

    const loadPagedJS = async () => {
      // Wait for styles to be loaded
      await waitForStyles();
      console.log('Styles loaded, initializing Paged.js...');

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Paged.js script loaded!');

        if (window.PagedPolyfill && containerRef.current) {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.PagedPolyfill.preview(containerRef.current);
              console.log('Paged.js preview initialized');
            });
          });
        }
      };

      script.onerror = () => {
        console.error('Failed to load Paged.js polyfill');
      };

      return script;
    };

    let script;
    loadPagedJS().then((s) => {
      script = s;
    });

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
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

    // Keyboard shortcuts
    const handleKeyDown = (event) => {
      // Ctrl key to enable focus reload
      if (event.key === 'Control') {
        localStorage.removeItem('focusReloadDisabledUntil');
        setFocusReloadEnabled(true);
        console.log('Focus reload enabled');
      }

      // Ctrl+Shift+R for hard reload with cache clear
      if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        console.log('Clearing cache and reloading...');

        // Clear all caches
        if ('caches' in window) {
          caches.keys().then((names) => {
            Promise.all(names.map((name) => caches.delete(name))).then(() => {
              // Force reload with cache bypass
              window.location.reload(true);
            });
          });
        } else {
          window.location.reload(true);
        }
      }

      // Ctrl+S to enable file reload
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        setFileReloadEnabled(true);
        console.log('File reload enabled');
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
      {/* <div className="page-right"></div>
       */}

      <div className="page-left h-full">
        <Pages config={{ layout: 'monthly-budget' }} style="page-left" />
      </div>
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          <Pages config={page.pages.left} style="page-left" />
          <Pages config={page.pages.right} style="page-right" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default PrintPreview;
