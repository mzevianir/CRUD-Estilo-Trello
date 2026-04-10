import { Request, Response, Router } from "express";
import {
  addUserToBoard,
  getBoardByUsers,
  getUsersByBoard,
  removeUserFromBoard,
  updateUsersFromBoard
} from "../services/boardUserService";

const boardUserRouter = Router();

boardUserRouter.post("/board/:boardId/user/:userId", async (req: Request, res: Response) => {
  try {

    const result = await addUserToBoard(req.params.boardId as string, req.params.userId as string);

    return res.status(200).send(result);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Erro ao adicionar usuário no board"
    });
  }
});

boardUserRouter.get("/board/:boardId/users", async (req: Request, res: Response) => {

  try {

    const result = await getUsersByBoard(req.params.boardId as string);

    return res.status(200).send(result);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Erro ao listar usuários do board"
    });
  }
});

boardUserRouter.get("/user/:userId/boards", async (req: Request, res: Response) => {

  try {

    const result = await getBoardByUsers(req.params.userId as string);

    return res.status(200).send(result);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Erro ao listar boards do usuário"
    });
  }
});

boardUserRouter.delete("/board/:boardId/user/:userId", async (req: Request, res: Response) => {

  try {

    const result = await removeUserFromBoard(req.params.boardId as string, req.params.userId as string);

    return res.status(200).send(result);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Erro ao remover usuário do board"
    });
  }
});

boardUserRouter.put("/board/:boardId/users", async (req: Request, res: Response) => {

  try {

    const result = await updateUsersFromBoard(req.params.boardId as string, req.body.usersId);

    return res.status(200).send(result);

  } catch (error: any) {

    return res.status(400).send({
      message: error?.message ?? "Erro ao atualizar usuários do board"
    });
  }
});

export default boardUserRouter;