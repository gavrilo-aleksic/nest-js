import { BadRequestException } from '@nestjs/common';

export const Exceptions = {
  auth: {
    NameTakenException: (username: string) =>
      new BadRequestException({
        error: `Username ${username} is already taken`,
        code: '10001',
      }),
  },
};
