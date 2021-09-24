import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequest } from 'src/@types/api';

@Injectable()
export class OrganizationInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IRequest> {
    const request = context.switchToHttp().getRequest<IRequest>();
    request.organizationId =
      Number(request.query.organizationId) ||
      request.user.selectedOrganizationId;

    return next.handle();
  }
}
