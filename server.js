import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'output')));

// Progress tracking for multiple requests
const progressTrackers = new Map();

// SSE endpoint for progress updates
app.get('/api/pdf-progress/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  // Store the response object for this session
  progressTrackers.set(sessionId, res);

  // Clean up when client disconnects
  req.on('close', () => {
    progressTrackers.delete(sessionId);
  });
});

function sendProgress(sessionId, progress, message) {
  const res = progressTrackers.get(sessionId);
  if (res) {
    res.write(`data: ${JSON.stringify({ progress, message })}\n\n`);
  }
}

// API endpoint for PDF generation
app.post('/api/generate-pdf', async (req, res) => {
  console.log('PDF generation request received');
  const sessionId = req.body.sessionId || 'default';

  try {
    sendProgress(sessionId, 5, 'Starting browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--force-color-profile=srgb',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    });

    sendProgress(sessionId, 15, 'Browser started, creating page...');
    const page = await browser.newPage();

    sendProgress(sessionId, 25, 'Setting up page viewport...');
    // Set viewport to match content better - use A4 size for more space
    await page.setViewport({
      width: 1240, // A4 width in pixels at 150 DPI (better fit)
      height: 1754, // A4 height in pixels at 150 DPI
      deviceScaleFactor: 2, // Good quality without being too large
    });

    sendProgress(sessionId, 35, 'Navigating to print preview...');
    // Navigate to the print preview page
    await page.goto('http://localhost:5173/print-preview', {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    sendProgress(sessionId, 55, 'Waiting for planner content to load...');
    // Wait for the planner to fully load
    await page
      .waitForSelector('.planner-container', {
        timeout: 30000,
      })
      .catch(() => {
        // Fallback: wait for any content to load
        return page.waitForSelector('body', { timeout: 10000 });
      });

    sendProgress(
      sessionId,
      65,
      'Content loaded, waiting for layout to stabilize...'
    );
    // Additional delay to allow pages to organize properly
    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 second delay

    // Add print-specific styles

    sendProgress(sessionId, 75, 'Layout stabilized, applying print styles...');

    // Generate high-quality PDF with A5 format
    sendProgress(sessionId, 85, 'Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: false,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      quality: 100, // Maximum quality for images
      optimizeForSpeed: false, // Prioritize quality over speed
      tagged: true, // Enable PDF accessibility
      outline: false,
    });

    sendProgress(sessionId, 95, 'PDF generated, cleaning up...');
    await browser.close();

    sendProgress(sessionId, 100, 'PDF ready for download!');

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="planner.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send the PDF buffer
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message,
      stack: error.stack,
    });
  }
});

app.listen(PORT, () => {
  console.log(`PDF API server running on http://localhost:${PORT}`);
});
