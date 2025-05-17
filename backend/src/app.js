import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => res.send('ok'));

app.get('/tasks', (_req, res) => res.json([]));

app.use((_req, res) => res.status(404).json({ message: "not found"}));

export default app;


