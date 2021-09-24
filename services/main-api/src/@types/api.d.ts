import { Request } from 'express';

export type IRequest = Request & { user: IJWT; organizationId?: number };
