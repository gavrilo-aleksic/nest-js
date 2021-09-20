import * as crypto from 'crypto';

export const hashPassword = (password: string) => {
  const key = crypto.createCipher('aes-128-cbc', password);
  let hash = key.update(password, 'utf8', 'hex');
  hash += key.final('hex');
  return hash;
};

export const validatePassword = (input: string, originalPassword: string) => {
  try {
    const key = crypto.createDecipher('aes-128-cbc', input);
    let hash = key.update(originalPassword, 'hex', 'utf8');
    hash += key.final('utf8');
    return hash === input;
  } catch (e) {
    console.error(e);
    return false;
  }
};
