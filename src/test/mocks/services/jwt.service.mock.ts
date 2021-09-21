import { JwtService } from '@nestjs/jwt';

export const SIGNED_VALUE = 'JWT SIGNED MOCK';
export const VERIFIED_VALUE = 'JWT SIGNED MOCK';
export const DECODED_VALUE = {
  email: 'test@test.com',
  exp: '00000000',
  iat: 1,
};

export const jwtServiceMockFactory: () => JwtService = () => ({
  sign: () => SIGNED_VALUE,
  //@ts-ignore
  verifyAsync: () => Promise.resolve(VERIFIED_VALUE),
  decode: () => DECODED_VALUE,
});

export const getJwtServiceMock = jest.fn(() => ({
  sign: jest.fn(() => SIGNED_VALUE),
  verifyAsync: jest.fn(() => VERIFIED_VALUE),
  decode: jest.fn(() => DECODED_VALUE),
}));
