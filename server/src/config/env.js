import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL
};

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}
