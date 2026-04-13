import { prisma } from "../database/prisma";

export async function addUserToBoard(boardId: number, userId: number) {

    try {

        const result = await prisma.boarduser.create({
            data: {
                board_id: boardId,
                user_id: userId,
            },
        })

        return result;
    } catch (error: any) {

        console.error("Ocorreu um erro ao adicionar usuário ao board no banco de dados", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao adicionar usuário ao board no banco de dados");
    }
}

export async function getBoardByUsers(userId: number) {

    try {

        const result = await prisma.boarduser.findMany({
            where: {
                user_id: userId,
            },
            orderBy: {
                id: 'asc',
            },
            include:{
                board: true,
            }
        })

        return {
            total: result.length,
            boards: result
        };

    } catch (error: any) {

        console.error("Ocorreu um erro ao buscar usuários do board no banco de dados", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao buscar usuários do board no banco de dados");
    }
}

export async function getUsersByBoard(boardId: number) {

    try {

        const result = await prisma.boarduser.findMany({
            where: {
                board_id: boardId,
            },
            orderBy: {
                id: 'asc',
            },
        })

        return {
            total: result.length,
            users: result
        };

    } catch (error: any) {

        console.error("Ocorreu um erro ao buscar usuários do board no banco de dados", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao buscar usuários do board no banco de dados");
    }
}

export async function removeUserFromBoard(boardId: number, userId: number) {
    try {
        const result = await prisma.boarduser.deleteMany({
            where: {
                board_id: boardId,
                user_id: userId,
            }
        })

        // Se não removeu nada, significa que a relação não existia
        if (result.count === 0) {
            return null;
        }

        return result;
    } catch (error: any) {
        console.error("Ocorreu um erro ao remover usuário do board no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao remover usuário do board no banco de dados");
    }
}

export async function updateUsersFromBoard(boardId: number, usersId: number[]) {
    try {
        // Remove usuários duplicados que possam vir do front
        const uniqueUserIds = [...new Set(usersId)];

        // Apaga todas as relações atuais desse board (limpa tudo)
        await prisma.boarduser.deleteMany({
            where: { board_id: boardId },
        });

        // Se não veio nenhum usuário, o board fica sem usuários
        if (uniqueUserIds.length === 0) {
            return [];
        }

        // Cria novamente as relações (board_id + user_id)
        for (const userId of uniqueUserIds) {
            await prisma.boarduser.create({
                data: {
                    board_id: boardId,
                    user_id: userId,
                },
            });
        }

        // Retorna como ficou no banco
        return await prisma.boarduser.findMany({
            where: { board_id: boardId },
            orderBy: { id: "asc" },
        });
    } catch (error: any) {
        console.error("Erro ao atualizar os usuários do board!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao atualizar os usuários do board!");
    }
}