import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, prisma } from "./config/database.js";

async function start() {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
  });

  const shutdown = async () => {
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch(async (error) => {
  console.error("Failed to start server:", error);
  await prisma.$disconnect();
  process.exit(1);
});
