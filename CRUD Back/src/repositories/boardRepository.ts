//Repository é o fornecedor de dados, responsável apenas pelo acesso ao banco de dados
//Ele não tem lógica de negócio, apenas faz as operações CRUD no banco de dados
//Responsabilidade: apenas acesso ao banco de dados, não tem lógica de negócio.

import { prisma } from "../database/prisma";

export async function createBoard(name: string, numberResponsibleUserId: number, description: string) {
    try {

        const now = new Date();

        const board = prisma.board.create({
            data: {
                name,
                created_at: now,
                updated_at: now,
                is_deleted: false,
                responsible_user_id: numberResponsibleUserId,
                create_user_id: numberResponsibleUserId,
                description
            },
        })

        return board;

    } catch (error) {
        console.error("Erro ao criar board:", error);
        throw new Error("Erro ao criar board no banco de dados");
    }
}

export async function getAllBoards(isDeleted?: boolean) {
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

        console.log(`Filtro: ${isDeleted}`)

        const board = await prisma.board.findMany(query)

        return {
            count: board.length,
            data: board
        };

    } catch (error) {
        console.error("Erro ao listar board", error);
        throw new Error("Erro ao listar todos os boards do banco de dados");
    }
}

export async function getBoardById(boardId: number) {

    try {

        const board = await prisma.board.findUnique({
            where: {
                id: boardId
            },
        })
        console.log(`board: ${board}`)
        if (!board) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        return board

    } catch (error: any) {

        console.error("Erro ao listar o board", error);
        throw new Error(error?.message ?? "Erro ao listar o board do banco de dados");
    }
}

export async function deleteBoard(boardId: number) {

    try {

        const board = await prisma.board.findUnique({
            where: {
                id: boardId
            }
        })

        if (!board) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        const result = await prisma.board.update({
            where: {
                id: boardId,
            },
            data: {
                is_deleted: true,
            },
        })

        return result;
    } catch (error: any) {
        console.error("Erro ao deletar o board", error);
        throw new Error(error?.message ?? "Erro ao deletar o board do banco de dados");
    }
}

export async function updateBoard(boardId: number, name: string, numberResponsibleUserId: number, isDeleted?: boolean) {

    try {

        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            }
        })

        if (!board) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        const result = await prisma.board.update({
            where: {
                id: boardId,
            },
            data: {
                name: name,
                responsible_user_id: numberResponsibleUserId,
                is_deleted: isDeleted,
            },
        })

        return result;
    } catch (error: any) {
        console.error("Erro ao editar o board", error);
        throw new Error(error?.message ?? "Erro ao editar o board do banco de dados");
    }
}