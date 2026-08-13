import * as roleService from "../services/role.service.js";

export async function getRoles(req, res) {
  res.json({ success: true, data: await roleService.listRoles() });
}

export async function getRole(req, res) {
  const role = await roleService.getRole(req.validated.params.id);
  if (!role) {
    return res.status(404).json({ success: false, message: "Role not found." });
  }
  res.json({ success: true, data: role });
}

export async function createRole(req, res) {
  const role = await roleService.createRole(req.validated.body);
  res
    .status(201)
    .json({ success: true, data: role, message: "Role created Successfully." });
}

export async function updateRole(req, res) {
  const role = await roleService.updateRole(
    req.validated.params.id,
    req.validated.body,
  );
  res.json({
    success: true,
    data: role,
    message: "Role updated successfully.",
  });
}

export async function deleteRole(req, res) {
  await roleService.deleteRole(req.validated.params.id);
  res.json({ success: true, message: "Role deleted successfully." });
}
