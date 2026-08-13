import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = [
  { name: "Admin", description: "Full system administration access." },
  { name: "Editor", description: "Can create and edit application content." },
  { name: "Viewer", description: "Read-only application access." }
];

async function main() {
  const roleMap = {};

  for (const role of roles) {
    const saved = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: role
    });
    roleMap[role.name] = saved;
  }

  const users = [
    { name: "Admin User", email: "admin@example.com", role: "Admin" },
    { name: "Editor User", email: "editor@example.com", role: "Editor" },
    { name: "Viewer User", email: "viewer@example.com", role: "Viewer" }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, roleId: roleMap[user.role].id },
      create: {
        name: user.name,
        email: user.email,
        roleId: roleMap[user.role].id
      }
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
