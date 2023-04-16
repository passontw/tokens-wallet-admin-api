const dotenv = require('dotenv');
dotenv.config();

const paths = require('./paths');
const definitions = require('./definitions');
const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const host = isDev
  ? 'localhost:8888'
  : 'token-admin.tomas.website';
const schemes = isDev
  ? ['http', 'https']
  : ['http', 'https'];
const options = {
  swagger: '2.0',
  info: {
    version: '1.0.0', //version of the OpenAPI Specification
    title: '錢包後台 API',
    description: '錢包後台 API Swagger',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host,
  basePath: '/',
  tags: [
    {
      name: '錢包',
      description: '使用者用 admin',
    },
  ],
  schemes,
  consumes: ['application/json'],
  produces: ['application/json'],
  // securityDefinitions: {
  //   Bearer: {
  //     type: 'apiKey',
  //     name: 'Authorization',
  //     in: 'header',
  //   }
  // },
  paths: {
    ...paths,
  },
  definitions: {
    ...definitions
  },
};

module.exports.specs = options;
