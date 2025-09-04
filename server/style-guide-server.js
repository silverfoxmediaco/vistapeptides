import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for style guide
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/style-guide.html'));
});

// Route for Vista RX MD style guide
app.get('/vista', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/style-guide.html'));
});

// Route for peptides style guide  
app.get('/peptides', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/peptides-brand-guide.html'));
});

// Route for both guides in one page
app.get('/both', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vista Brand Guides - Client Review</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .guide-links { display: flex; gap: 20px; margin-bottom: 30px; justify-content: center; }
        .guide-link { background: white; padding: 20px 30px; border-radius: 12px; text-decoration: none; color: #333; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .guide-link:hover { transform: translateY(-2px); }
        .guide-link h2 { margin: 0 0 10px 0; color: #4DACF2; }
        .guide-link p { margin: 0; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 style="text-align: center; color: #333; margin-bottom: 40px;">Vista Brand Style Guides</h1>
        <div class="guide-links">
          <a href="/vista" class="guide-link">
            <h2>Vista RX MD</h2>
            <p>Main platform brand guide</p>
          </a>
          <a href="/peptides" class="guide-link">
            <h2>Vista Peptides</h2>
            <p>Peptides division brand guide</p>
          </a>
        </div>
        <p style="text-align: center; color: #666; margin-top: 40px;">
          Click either guide above to review the complete brand and design system.
        </p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Style guide server running on port ${PORT}`);
  console.log(`Vista RX MD Guide: http://localhost:${PORT}/vista`);
  console.log(`Vista Peptides Guide: http://localhost:${PORT}/peptides`);
  console.log(`Both Guides: http://localhost:${PORT}/both`);
});