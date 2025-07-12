import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport to ensure consistent rendering
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    });

    // Navigate to the print preview page
    await page.goto('http://localhost:5173/print-preview', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // Wait for the planner to fully load
    await page.waitForSelector('.planner-container', {
      timeout: 30000
    });

    // Add print-specific styles
    await page.addStyleTag({
      content: `
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .planner-container {
            width: 100% !important;
            max-width: none !important;
          }
          
          .page-break {
            page-break-after: always;
          }
        }
      `
    });

    // Generate PDF with A5 format
    const pdfBuffer = await page.pdf({
      path: path.join(__dirname, '../output/planner.pdf'),
      format: 'A5',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true
    });

    console.log('PDF generated successfully at output/planner.pdf');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Run the PDF generation
generatePDF();