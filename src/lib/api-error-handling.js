import { Prisma } from "@prisma/client";

const prismaErrorMap = {
  P2000: (err) => ({
    status: 400,
    message: `Value too long for field ${err.meta?.target}`,
  }),
  P2002: (err) => ({
    status: 409,
    message: `Duplicate record`,
  }),
  P2003: (err) => ({
    status: 400,
    message: `Foreign key constraint failed on field ${err.meta?.field_name}`,
  }),
  P2005: (err) => ({
    status: 400,
    message: `Missing required field: ${err.meta?.target}`,
  }),
  P2025: () => ({
    status: 404,
    message: "Record to update or delete does not exist.",
  }),
  // …etc…
};

export function formatPrismaError(err) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const handler = prismaErrorMap[err.code];
    if (handler) {
      return handler(err);
    }

    // **default for *any* other PrismaClientKnownRequestError**
    return {
      status: 500,
      message: "An unexpected database error occurred.",
    };
  }

  // if it's not even a Prisma error, you can still return a generic fallback
  return {
    status: 500,
    message: "An unknown error occurred.",
  };
}
