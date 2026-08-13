import { Prisma } from "@prisma/client";

export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A record with that unique value already exists."
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        success: false,
        message: "This operation violates a relationship constraint."
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Record not found."
      });
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Something went wrong"
  });
}
