// Simple server startup script for GitHub deployment

// Set production environment
process.env.NODE_ENV = 'production';

// Start the server
require('./server/index.js');