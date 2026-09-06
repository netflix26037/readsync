// Vercel treats an exported Express app as a request handler directly.
// vercel.json routes every request to this function.
module.exports = require('../app');
