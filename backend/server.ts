import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/auth.routes';
import sequelize from './config/db';
import User from './models/User.model';
import OTP from './models/OTP.model';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());

// ✅ Correct CORS configuration (do NOT use cors() twice)
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true               // allows cookies or credentials
}));

// app.use(helmet());
// app.use(morgan('dev'));

// ✅ Routes
app.use('/api/auth', router);

// ✅ Sync DB and Start Server
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true }); // ⚠️ Remove `alter` in production
    console.log('✅ Database synced successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();
