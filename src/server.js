import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

app.listen(process.env.APP_PORT);
