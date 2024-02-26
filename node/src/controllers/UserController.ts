import { Request, Response } from "express";
import * as UserService from "../services/UserService";

export async function signup(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  await UserService.signup(username, password);
  res
    .status(201)
    .json({ statusCode: 201, message: "User created successfully" });
}

export async function signin(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  const token = await UserService.signin(username, password);
  res.status(200).json({ token });
}
