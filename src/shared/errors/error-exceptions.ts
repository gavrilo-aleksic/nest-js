import { BadRequestException, NotFoundException } from '@nestjs/common';

export const Exceptions = {
  auth: {
    NameTakenException: (username: string) =>
      new BadRequestException({
        error: `Username ${username} is already taken`,
        code: '10001',
      }),
    NotFoundException: (id: number) =>
      new NotFoundException({
        error: `User ${id} does not exist`,
        code: '10002',
      }),
    InvalidUserIdParam: (id: any) =>
      new BadRequestException({
        error: `User id provided ->  ${id} is not valid ID`,
        code: '10003',
      }),
  },
  organization: {
    NotFoundException: (id: number) =>
      new NotFoundException({
        error: `Organization ${id} does not exist`,
        code: '20002',
      }),
  },
};
