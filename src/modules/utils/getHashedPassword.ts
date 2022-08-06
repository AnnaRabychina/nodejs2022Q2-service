import * as bcrypt from 'bcrypt';

export const generatePasswordHash = async (password: string) => {
  const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
