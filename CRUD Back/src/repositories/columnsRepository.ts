import { prisma } from "../database/prisma";

export async function createColumns(name: string, positionId: number, numberBoardId: number) {

    try {

        const columns = prisma.columns.create({
            data: {
                name: name,
                position: positionId,
                board_id: numberBoardId
            },
        });

        return columns

    } catch (error: any) {
        console.error("Erro ao criar uma coluna no banco de dados!", error);
        throw new Error("Erro ao criar uma coluna no banco de dados")
    }
}

export async function getColumns(isDeleted?: boolean) {
    try {

        const query: any = {
            orderBy: {
                id: 'asc',
            },
        }

        const filter = isDeleted;

        if (filter !== undefined) {
            query.where = {
                is_deleted: filter,
            }
        }

        const columns = await prisma.columns.findMany(query)

        return {
            total: columns.length,
            columns: columns
        };

    } catch (error: any) {
        console.error("Erro ao buscar todas as colunas no banco de dados", error);
        throw new Error("Erro ao buscar coluna no banco de dados")
    }
}

export async function getColumnsById(columnId: number) {

    try {

        const columns = await prisma.columns.findUnique({
            where: {
                id: columnId,
            },
        })

        if (!columns) {
            throw new Error("Esse ID não existe, informe outro");
        }

        return columns;

    } catch (error: any) {
        console.error("Ocorreu um erro ao buscar o ID no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao buscar o ID no banco de dados")
    }
}

export async function deleteColumn(columnId: number) {

    try {

        const columns = await prisma.columns.findUnique({
            where: {
                id: columnId,
            },
        })

        if (!columns) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        const result = await prisma.columns.update({
            where: {
                id: columnId,
            },
            data: {
                is_deleted: true,
            },
        })

        return result;

    } catch (error: any) {
        console.error("Ocorreu um erro ao deletar uma coluna no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao deletar a coluna do banco de dados");
    }
}

export async function updateColumn(columnId: number, name: string, position: number, boardId: number, filter?: boolean) {

    try {

        const column = await prisma.columns.update({
            where: {
                id: columnId,
            },
            data: {
                name: name,
                position: position,
                board_id: boardId,
                is_deleted: filter,
            },
        })

        if (!column) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        return column;
    } catch (error: any) {
        console.error("Ocorreu um erro ao editar a coluna no banco de dados!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao editar a coluna no banco de dados");
    }
}
