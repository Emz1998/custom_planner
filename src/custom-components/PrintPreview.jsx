import React, { useEffect, useRef } from 'react';
import Pages from './Pages';
import { generateMonthWithWeeklyPages } from '../config/plannerConfig';
import '../index.css';

const PrintPreview = () => {
  console.log('PrintPreview component mounted');
  const { pages } = generateMonthWithWeeklyPages(6, 6, 2025, 'monday');
  const containerRef = useRef();

  useEffect(() => {
    let script;
    let isComponentMounted = true;

    const initializePagedJS = async () => {
      // Wait for DOM to be fully ready
      if (document.readyState !== 'complete') {
        await new Promise(resolve => {
          window.addEventListener('load', resolve, { once: true });
        });
      }

      // Ensure all content is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      if (!isComponentMounted) return;

      // Check if Paged.js is already loaded
      if (window.PagedPolyfill) {
        console.log('Paged.js already loaded, initializing preview...');
        if (containerRef.current) {
          window.PagedPolyfill.preview(containerRef.current);
        }
        return;
      }

      // Load Paged.js script
      script = document.createElement('script');
      script.src = 'https://unpkg.com/pagedjs/dist/paged.polyfill.js';
      document.head.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      if (!isComponentMounted) return;

      console.log('Paged.js script loaded!');

      // Wait a bit more for Paged.js to initialize
      await new Promise(resolve => setTimeout(resolve, 100));

      if (window.PagedPolyfill && containerRef.current && isComponentMounted) {
        try {
          await window.PagedPolyfill.preview(containerRef.current);
          console.log('Paged.js preview initialized successfully');
        } catch (error) {
          console.error('Error initializing Paged.js preview:', error);
        }
      }
    };

    initializePagedJS().catch(error => {
      console.error('Failed to initialize Paged.js:', error);
    });

    return () => {
      isComponentMounted = false;
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
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
