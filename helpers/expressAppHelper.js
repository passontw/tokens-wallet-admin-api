const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const { specs } = require('../constants/swaggerOptions');
const { jwtAuthorizationMiddleware } = require('../helpers/passportManager');
const indexRouter = require('../controller/index');
const authRouter = require('../controller/authRouter');
const userRouter = require('../controller/userRouter');
const backenduserRouter = require('../controller/backenduserRouter');
const backendactorRouter = require('../controller/backendactorRouter');
const pendingOrderRouter = require('../controller/pendingOrderRouter');
const bankcardRouter = require('../controller/bankcardRouter');
const orderRouter = require('../controller/orderRouter');
const bankRouter = require('../controller/bankRouter');

const ENVIRONMENT = process.env.ENV || 'dev';

let expressApp = express();
if (ENVIRONMENT === 'dev') {
  // Log every HTTP request. See https://github.com/expressjs/morgan for other
  // available formats.
  expressApp.use(morgan('dev'));
}

expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));
expressApp.use(cookieParser());

expressApp.use(passport.initialize());

expressApp.use('/', indexRouter);
expressApp.use('/auth', authRouter);
expressApp.use('/banks', jwtAuthorizationMiddleware, bankRouter);
expressApp.use('/bankcards', jwtAuthorizationMiddleware, bankcardRouter);
expressApp.use('/backendusers', jwtAuthorizationMiddleware, backenduserRouter);
expressApp.use('/backendactors', jwtAuthorizationMiddleware, backendactorRouter);
expressApp.use('/users', jwtAuthorizationMiddleware, userRouter);
expressApp.use('/orders', jwtAuthorizationMiddleware, orderRouter);
expressApp.use('/pending/orders', jwtAuthorizationMiddleware, pendingOrderRouter);

// Add GET /health-check express route
expressApp.get('/health-check', (req, res) => {
  res.json({
    success: true,
    data: { status: 'WORKING' }
  });
});

expressApp.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

module.exports = expressApp;