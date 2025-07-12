import React, { useEffect, useRef } from 'react';
import Pages from './Pages';
import { generate12MonthsMonthly } from '../config/plannerConfig';
import { Link } from 'react-router-dom';

const PrintPreview = () => {
  const { months } = generate12MonthsMonthly(6, 2025, 'monday');
  const containerRef = useRef();

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
        // Optional: sanitize content before passing to Paged.js
        const cleanNode = containerRef.current.cloneNode(true);

        Array.from(cleanNode.childNodes).forEach((child) => {
          // Only keep element nodes (not text, comment, etc.)
          if (child.nodeType !== Node.ELEMENT_NODE) {
            cleanNode.removeChild(child);
          }
        });

        // Delay slightly to ensure styles apply
        setTimeout(() => {
          window.PagedPolyfill.preview(cleanNode);
        }, 100);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
