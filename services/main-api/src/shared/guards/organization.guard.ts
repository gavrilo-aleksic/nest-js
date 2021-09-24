import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequest } from 'src/@types/api';
import { OrganizationService } from 'src/modules/organization/services/organization.service';
import { Exceptions } from '../errors/error-exceptions';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(
    @Inject(OrganizationService)
    private organizationService?: OrganizationService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();
    const queryOrganizationId = Number(request.query.organizationId);
    if (!request.user?.selectedOrganizationId && !queryOrganizationId) {
      throw Exceptions.organization.NotSelected();
    }
    if (!isNaN(queryOrganizationId)) {
      return this.organizationService
        .isUserOnOrganization(request.user, queryOrganizationId)
        .then((res) => {
          if (!res) {
            throw Exceptions.organization.NotFoundException(
              queryOrganizationId,
            );
          }
          return true;
        });
    }
    return true;
  }
}
