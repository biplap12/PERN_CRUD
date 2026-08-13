import { prisma } from "../config/database.js";

const roleSelect = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  _count: { select: { users: true } }
};

export function listRoles() {
  return prisma.role.findMany({
    select: roleSelect,
    orderBy: { id: "asc" }
  });
}

export function getRole(id) {
  return prisma.role.findUnique({ where: { id }, select: roleSelect });
}

export function createRole(data) {
  return prisma.role.create({ data, select: roleSelect });
}

export function updateRole(id, data) {
  return prisma.role.update({ where: { id }, data, select: roleSelect });
}

export async function deleteRole(id) {
  const role = await prisma.role.findUnique({
    where: { id },
    include: { _count: { select: { users: true } } }
  });

  if (!role) {
    const error = new Error("Role not found.");
    error.statusCode = 404;
    throw error;
  }

  if (role._count.users > 0) {
    const error = new Error(
      "Cannot delete this role because users are assigned to it."
    );
    error.statusCode = 409;
    throw error;
  }

  return prisma.role.delete({ where: { id } });
}
