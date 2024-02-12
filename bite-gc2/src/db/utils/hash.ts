import { compareSync, hashSync } from "bcryptjs";

export const hashing = (password: string): string => hashSync(password);
export const comparePassword = (password: string, hash: string): boolean =>
  compareSync(password, hash);
