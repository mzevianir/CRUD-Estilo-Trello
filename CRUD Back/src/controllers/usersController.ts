// Controller é o garçom, ele serve apenas para receber a requisição e retornar a resposta
// Responsabilidade: receber HTTP e chamar o Service (Regra de negócio) e devolver a resposta para o front.

import { Router, Request, Response } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    authUser,
} from "../services/usersService";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";

const usersRouter = Router();

// Rota que o front vai acessar para criar um usuário
usersRouter.post('/users', async (req: Request, res: Response) => {
    try {

        const userCreate = await createUser(req.body.name, req.body.email, req.body.password);

        return res.status(200).send(userCreate);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao criar o usuário"
        });
    }
});

// // Rota que o front vai acessar para consultar todos os usuários
usersRouter.get('/users', async (req: Request, res: Response) => {

    try {
        const is_deleted = getBooleanFromQueryParam(req.query.is_deleted, "is_deleted");

        const is_active = getBooleanFromQueryParam(req.query.is_active, "is_active");

        const usersGet = await getAllUsers(is_deleted as boolean | undefined, is_active as boolean | undefined);

        return res.status(200).send(usersGet);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao buscar todos os usuários"
        });
    }
});

// Rota que o front vai acessar para consultar um usuário específico
usersRouter.get('/users/:id', async (req: Request, res: Response) => {
    try {

        const userGetById = await getUserById(req.params.id as string);

        return res.status(200).send(userGetById);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao listar o usuário solicitado"
        });
    }
});

// Rota que o front vai acessar para deletar um usuário
usersRouter.delete('/users/:id', async (req: Request, res: Response) => {
    try {

        const userDelete = await deleteUser(req.params.id as string);

        return res.status(200).send(userDelete);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao deletar o usuário solicitado!"
        });
    }
});

// Rota que o front vai acessar para editar um usuário
usersRouter.put('/users/:id', async (req: Request, res: Response) => {
    try {

        const userUpdate = await updateUser(req.params.id as string, req.body);

        return res.status(200).send(userUpdate);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao editar o usuário informado"
        });
    }
});

// Rota que vai ser usado para autenticação do usuário
usersRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const userAuth = await authUser(req.body.email, req.body.password);

        return res.status(200).send(userAuth);
    } catch (error: any) {
        return res.status(401).send({
            message: error?.message ?? "Ocorreu um erro ao validar os dados do usuário"
        })
    }
})

export default usersRouter;
