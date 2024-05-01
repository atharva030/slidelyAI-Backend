import * as bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import indexRoute from '../routes/index.route';

const app = express();
// Parse production origins into an array
const prodOrigins = process.env.PROD_ORIGINS?.split(',') || [];
const FRONTEND_BASE = process.env.FRONTEND_BASE_URL?.split(',') || [];

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const origin = req.get('origin');

        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header(
            'Access-Control-Allow-Methods',
            'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers',
        );

        if (req.method === 'OPTIONS') {
            res.sendStatus(204);
        } else {
            next();
        }
    },
);

// CORS options configuration
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : FRONTEND_BASE;

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
};


app.get('/', (req:Request, res:Response) => {
    return res.status(200).json({
        message: 'Welcome to world of Kabir Kutumb',
    });
});

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(morgan('dev'));

//routes
app.use('/v1', indexRoute);


// export const multerErrorMiddleware = (
//     err: any,
//     req: Request,
//     res: Response,
// ) => {
//     if (err.name === 'FileTypeNotAllowed') {
//       return res.status(400).json({ error: err.message });
//     } else {
//         // Handle other multer errors here
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// app.use(multerErrorMiddleware);

export default app;
