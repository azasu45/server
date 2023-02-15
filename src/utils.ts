import { User } from './users/entities/user.entity';

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
