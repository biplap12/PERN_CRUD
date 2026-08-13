import * as userService from "../services/user.service.js";

export async function getUsers(req, res) {
  const result = await userService.listUsers(req.validated.query);
  res.json({ success: true, ...result });
}

export async function getUser(req, res) {
  const user = await userService.getUser(req.validated.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }
  res.json({ success: true, data: user });
}

export async function createUser(req, res) {
  const user = await userService.createUser(req.validated.body);
  res.status(201).json({ success: true, data: user, message: "User created Successfully." });
}

export async function updateUser(req, res) {
  const user = await userService.updateUser(
    req.validated.params.id,
    req.validated.body,
  );
  res.json({ success: true, data: user, message: "User updated successfully." });
}

export async function deleteUser(req, res) {
  await userService.deleteUser(req.validated.params.id);
  res.json({ success: true, message: "User deleted successfully." });
}
