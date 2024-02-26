import { ConflictError } from "../error/ConflictError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { createUser, findByUsername } from "../repository/UserRepository";
import jwt from "jsonwebtoken";

export async function signup(username: string, password: string) {
  const existingUser = await findByUsername(username);
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

   return await createUser(username, password);
}

export async function signin(username: string, password: string) {
  const user = await findByUsername(username);
  if (!user || !(await user.verifyPassword(password))) {
    throw new UnauthorizedError("Invalid Username or Password");
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    "secret-key",
    { expiresIn: "1h" }
  );

  return token;
}
