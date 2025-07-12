import React from 'react';
import Button from '../Button/Button';

export const PDFExport = () => {
  console.log('PDFExport component loaded');

  const handleExportPDF = async () => {
    console.log('PDF export button clicked');
    alert('PDF export button clicked - check console for logs');
    try {
      console.log(
        'Sending request to:',
        'http://localhost:3001/api/generate-pdf'
      );

      // Call the PDF generation script
      const response = await fetch('http://localhost:3001/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage =
            errorJson.message || errorJson.error || 'PDF generation failed';
        } catch {
          errorMessage = errorText || 'PDF generation failed';
        }
        throw new Error(errorMessage);
      }

      // Check if response is actually a PDF
      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      // Download the PDF
      const blob = await response.blob();
      console.log('Blob size:', blob.size, 'bytes');
      console.log('Blob type:', blob.type);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'planner.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log('PDF download triggered successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      console.error('Full error details:', error.message);
      console.error('Error stack:', error.stack);
      alert(`Failed to export PDF: ${error.message}`);
    }
  };

  return (
    <Button onClick={handleExportPDF} className="pdf-export-button">
      Export PDF (Server)
    </Button>
  );
};
