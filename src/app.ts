import express from 'express';
import routes from './routes';
import cors from 'cors';
import { errorHandler } from '@core/middleware';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression())


routes(app);
app.use(errorHandler);

export default app;

