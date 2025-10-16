import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db";

const router = Router();
const TodoCreate = z.object({ title: z.string().min(1) });
const TodoUpdate = z.object({ title: z.string().min(1).optional(), done: z.boolean().optional() });

router.get("/", async (_req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { id: "desc" } });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const parsed = TodoCreate.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const todo = await prisma.todo.create({ data: { title: parsed.data.title } });
  res.status(201).json(todo);
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const parsed = TodoUpdate.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const todo = await prisma.todo.update({ where: { id }, data: parsed.data });
  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.todo.delete({ where: { id } });
  res.status(204).end();
});

export default router;
