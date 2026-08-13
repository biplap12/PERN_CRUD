import { Router } from "express";
import { z } from "zod";
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const idSchema = z.string().cuid();
const idParam = z.object({ params: z.object({ id: idSchema }) });

const roleBody = z.object({
  name: z.string().trim().min(1, "Role name is required.").max(100),
  description: z.string().trim().max(500).optional().nullable(),
});

const router = Router();

router.get("/", asyncHandler(getRoles));
router.get("/:id", validate(idParam), asyncHandler(getRole));
router.post(
  "/",
  validate(z.object({ body: roleBody })),
  asyncHandler(createRole),
);
router.put(
  "/:id",
  validate(
    z.object({
      params: z.object({ id: idSchema }),
      body: roleBody
        .partial()
        .refine(
          (v) => Object.keys(v).length > 0,
          "At least one field is required.",
        ),
    }),
  ),
  asyncHandler(updateRole),
);
router.delete("/:id", validate(idParam), asyncHandler(deleteRole));

export default router;
