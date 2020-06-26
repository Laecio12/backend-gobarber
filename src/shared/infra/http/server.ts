import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import routes from './routes';
import AppError from '@shared/errors/AppErrors';

import '@shared/infra/typeorm';
import "@shared/container";

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(uploadConfig.uploadFolder));

server.use(routes);

server.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal sever error',
    });
  },
);

server.listen(3333, () => console.log('Server running on port 3333'));
