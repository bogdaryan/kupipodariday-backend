import * as bcrypt from 'bcrypt';

export async function hashValue(value: string) {
  return bcrypt.hash(value, await bcrypt.genSalt());
}

export async function verifyHash(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}
