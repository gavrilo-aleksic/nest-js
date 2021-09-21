import { Request } from 'express';

export type IRequest = Request & { user: IJWT };

export type IJWT = {
  sub: number;
  selectedOrganizationId?: number;
  username: string;
};
