import { prisma } from "../config/database.js";

const userSelect = {
  id: true,
  name: true,
  email: true,
  roleId: true,
  createdAt: true,
  updatedAt: true,
  role: { select: { id: true, name: true } }
};

export async function listUsers({ page = 1, limit = 10, search = "", roleId }) {
  const skip = (page - 1) * limit;
  const where = {
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { role: { name: { contains: search, mode: "insensitive" } } }
          ]
        }
      : {}),
    ...(roleId ? { roleId } : {})
  };

  const [data, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: userSelect,
      orderBy: { id: "desc" },
      skip,
      take: limit
    }),
    prisma.user.count({ where })
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export function getUser(id) {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect
  });
}

export async function createUser(data) {
  const role = await prisma.role.findUnique({ where: { id: data.roleId } });
  if (!role) {
    const error = new Error("Role does not exist.");
    error.statusCode = 400;
    throw error;
  }

  return prisma.user.create({
    data,
    select: userSelect
  });
}

export async function updateUser(id, data) {
  if (data.roleId !== undefined) {
    const role = await prisma.role.findUnique({ where: { id: data.roleId } });
    if (!role) {
      const error = new Error("Role does not exist.");
      error.statusCode = 400;
      throw error;
    }
  }

  return prisma.user.update({
    where: { id },
    data,
    select: userSelect
  });
}

export function deleteUser(id) {
  return prisma.user.delete({ where: { id } });
}
