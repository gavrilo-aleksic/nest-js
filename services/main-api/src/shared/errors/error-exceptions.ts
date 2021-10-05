import { BadRequestException, NotFoundException } from '@nestjs/common';

export const Exceptions = {
  auth: {
    NameTakenException: (username: string) =>
      new BadRequestException({
        message: `Username ${username} is already taken`,
        statusCode: '10001',
      }),
    NotFoundException: (id: number) =>
      new NotFoundException({
        message: `User ${id} does not exist`,
        statusCode: '10002',
      }),
    InvalidUserIdParam: (id: any) =>
      new BadRequestException({
        message: `User id provided ->  ${id} is not valid ID`,
        statusCode: '10003',
      }),
  },
  organization: {
    NotFoundException: (id: number) =>
      new NotFoundException({
        message: `Organization ${id} does not exist`,
        statusCode: '20002',
      }),
    NotSelected: () =>
      new BadRequestException({
        message:
          'Organization not provided. Please provide organization as query parameter organizationId or select default organization for user',
        statusCode: '20003',
      }),
    LinkedToUser: (id: number) =>
      new BadRequestException({
        message: `Organization with ID=${id} cannot be deleted because user is linked to it`,
        statusCode: '20004',
      }),
  },
};
