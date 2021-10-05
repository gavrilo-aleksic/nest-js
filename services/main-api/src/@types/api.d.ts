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
