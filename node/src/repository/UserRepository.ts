import { User } from "../entities/User";

export async function findByUsername(username: string):Promise<User|null> {
  return await User.findOne({ where: { username } });
}

export async function createUser(username: string, password: string):Promise<User> {
  return await User.create({
    username,
    password,
  }).save();
}
