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
        error: `User ${id} is does not exist`,
        code: '10002',
      }),
  },
  organization: {
    NotFoundException: (id: number) =>
      new NotFoundException({
        error: `Organization ${id} is does not exist`,
        code: '20002',
      }),
  },
};
