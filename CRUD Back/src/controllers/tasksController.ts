// Controller é o garçom, ele serve apenas para receber a requisição e retornar a resposta
// Responsabilidade: receber HTTP e chamar o Service (Regra de negócio) e devolver a resposta para o front.

import { Request, Response, Router } from "express";
import { createTask, getAllTasks, getTaskById, deleteTask, updateTask } from "../services/taskService";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";
import { stringToNumber } from "../utils/stringToNumber";

const taskRouter = Router();

taskRouter.post('/tasks', async (req: Request, res: Response) => {
  try {
    const taskCreate = await createTask(req.body.title, req.body.description, req.body.status, req.body.ownerUserId, req.body.createdUserId, req.body.boardId, req.body.columnId);

    return res.status(200).send(taskCreate);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Ocorreu um erro ao tentar criar uma task!"
    });
  }
});

taskRouter.get('/tasks', async (req: Request, res: Response) => {
  try {
    const is_deleted = getBooleanFromQueryParam(req.query.is_deleted, "is_deleted");

    const page = stringToNumber(String(req.query?.page));

    const limit = stringToNumber(String(req.query?.limit));

    const taskGet = await getAllTasks(page, limit, is_deleted as boolean | undefined);

    return res.status(200).send({
      page,
      taskGet
    });

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Ocorreu um erro ao consultar todas as tasks!"
    });
  }
});

taskRouter.get('/tasks/:id', async (req: Request, res: Response) => {
  try {

    const taskGetById = await getTaskById(req.params.id as string);

    return res.status(200).send(taskGetById);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Ocorreu um erro ao consultar a task!"
    });
  }
});

taskRouter.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {

    const taskDelete = await deleteTask(String(req.params.id));

    return res.status(200).send(taskDelete);

  } catch (error: any) {

    return res.status(400).send({
      mensagem: error?.message ?? "Erro ao deletar task do banco de dados"
    });
  }
});

taskRouter.put('/tasks/:id', async (req: Request, res: Response) => {
  try {

    const taskUpdate = await updateTask(
      String(req.params.id),
      req.body.title,
      req.body.description,
      req.body.status,
      req.body.dueDate ? new Date(req.body.dueDate) : undefined,
      req.body.isDeleted
    );

    return res.status(200).send(taskUpdate);

  } catch (error: any) {

    return res.status(400).send({
      mensagem: error?.message ?? "Erro ao atualizar task no banco de dados"
    });
  }
});

export default taskRouter;
