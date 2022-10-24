import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import postsRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import connectDB from './config/dbConn.js';
import corsOptions from './config/corsOptions.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

mongoose.connection.once('open', () => {
  console.log('connected to mongoDb');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
