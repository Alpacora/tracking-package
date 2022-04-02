import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from "type-graphql";

interface IRequest {
  req: Request,
  res: Response,
}

export const verifyAuth: MiddlewareFn<IRequest> = ({ context }, next) => {
  const { token } = context.req.headers;

  if (!token) {
    throw new Error('The token is missing');
  }

  try {
    verify(token as string, process.env.JWT_SECRET);

    return next();

  } catch (error) {
    throw new Error(`Token invalid ${error}`);
  }
}
