import React, { useEffect, useRef } from 'react';
import Pages from './Pages';
import { generateMonthWithWeeklyPages } from '../config/plannerConfig';
import '../index.css';

const PrintPreview = () => {
  console.log('PrintPreview component mounted');
  const { pages } = generateMonthWithWeeklyPages(6, 6, 2025, 'monday');
  const containerRef = useRef();

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
