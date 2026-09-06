// Local development entry point. On Vercel, api/index.js is used instead
// (Vercel calls the exported Express app directly — no listen() needed).
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ReadSync running at http://0.0.0.0:${PORT}  (open http://localhost:${PORT})`);
});
