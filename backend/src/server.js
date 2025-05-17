import http from 'node:http';
import app from './app.js';

const PORT = process.env.Port || 3000;

http.createServer(app).listen(PORT, ()=>
  console.log('API ready on gttp://localhost:${PORT}')
)