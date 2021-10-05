import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequest } from 'src/@types/api';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IRequest> {
    const request = context.switchToHttp().getRequest<IRequest>();
    if (request.query.pageSize && request.query.pageNumber) {
      request.pagination = {
        pageNumber: Number(request.query.pageNumber),
        pageSize: Number(request.query.pageSize),
      };
    }

    return next.handle();
  }
}
