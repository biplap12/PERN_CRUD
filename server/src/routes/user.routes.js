import { Router } from "express";
import { z } from "zod";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const idSchema = z.string().cuid();
const userBody = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
  email: z.string().trim().email("A valid email is required."),
  roleId: z.string().min(1, "Role ID is required."),
});

const createSchema = z.object({ body: userBody });
const updateSchema = z.object({
  body: userBody
    .partial()
    .refine(
      (v) => Object.keys(v).length > 0,
      "At least one field is required.",
    ),
});
const idParam = z.object({ params: z.object({ id: idSchema }) });
const listSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().default(""),
    roleId: z.string().cuid().optional(),
  }),
});

const router = Router();

router.get("/", validate(listSchema), asyncHandler(getUsers));
router.get("/:id", validate(idParam), asyncHandler(getUser));
router.post("/", validate(createSchema), asyncHandler(createUser));
router.put(
  "/:id",
  validate(z.object({ ...idParam.shape, ...updateSchema.shape })),
  asyncHandler(updateUser),
);
router.delete("/:id", validate(idParam), asyncHandler(deleteUser));

export default router;
