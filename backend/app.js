const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // ✅ Allow frontend URL
    credentials: true, // if you need to send cookies, otherwise optional
  }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feeds', feedRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));