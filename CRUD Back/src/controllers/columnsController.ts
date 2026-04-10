import { Request, Response, Router } from "express";
import {
    createColumns,
    getColumns,
    getColumnsById,
    deleteColumn,
    updateColumn
} from "../services/columnsService";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";

const columnsRouter = Router();

columnsRouter.post('/columns', async (req: Request, res: Response) => {
    try {

        const columnsCreate = await createColumns(req.body.name, req.body.position, req.body.boardId)

        return res.status(200).send(columnsCreate)

    } catch (error: any) {
        
        return res.status(400).send({
            message: error?.message ?? "Erro ao criar nova coluna!"
        });
    }
});

columnsRouter.get('/columns', async (req: Request, res: Response) => {
    try {

        const isDeleted = getBooleanFromQueryParam(req.query.is_deleted, 'is_deleted')

        const columnsGet = await getColumns(isDeleted);

        return res.status(200).send(columnsGet);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao buscar todas as colunas!"
        })
    }
});

columnsRouter.get('/columns/:id', async (req: Request, res: Response) => {
    try {

        const columnsGetById = await getColumnsById(req.params.id as string);

        return res.status(200).send(columnsGetById);

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao buscar o ID da coluna!"
        })
    }
});

columnsRouter.delete('/columns/:id', async (req: Request, res: Response) => {
    try {

        const columnDelete = await deleteColumn(req.params.id as string);

        return res.status(200).send(columnDelete)

    } catch (error: any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao delatar a coluna solicitada"
        })
    }
});

columnsRouter.put('/columns/:id', async (req: Request, res: Response)=>{
    try {

        const columnUpdate = await updateColumn(req.params.id as string, req.body.name, req.body.position, req.body.boardId, req.body.isDeleted);

        return res.status(200).send(columnUpdate);

    } catch (error:any) {

        return res.status(400).send({
            message: error?.message ?? "Ocorreu um erro ao editar a coluna solicitada"
        })
    }
});

export default columnsRouter;
