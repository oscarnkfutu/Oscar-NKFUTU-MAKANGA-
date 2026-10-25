import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact form API route
app.post(['/api/contact', '/forms/contact.php'], (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('[Contact Message Received]:', { name, email, subject, message, date: new Date().toISOString() });
  
  // Return OK
  res.json({
    status: 'success',
    message: 'Votre message a bien été envoyé avec succès ! Oscar NKFUTU MAKANGA vous répondra très prochainement.'
  });
});

// Serve static files
app.use(express.static(__dirname));

// Single-page fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Portfolio server running at http://${HOST}:${PORT}`);
});
