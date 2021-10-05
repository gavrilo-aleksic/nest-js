import { Request } from 'express';

export type IPagination = {
  pageSize: number;
  pageNumber: number;
};
export type IRequest = Request & {
  user: IJWT;
  organizationId?: number;
  pagination?: IPagination;
};

export type ILogError = {
  error: {
    raw?: string;
    code: string;
    message: string;
  };
  url: errorDetails.url;
  user: errorDetails.user;
  stack?: any;
};
