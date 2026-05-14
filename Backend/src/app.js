import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';
import config from './config/config.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const app = express();
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));



const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || config.corsOrigins.includes(origin)) {
			return callback(null, true);
		}

		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};



app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);


export default app;