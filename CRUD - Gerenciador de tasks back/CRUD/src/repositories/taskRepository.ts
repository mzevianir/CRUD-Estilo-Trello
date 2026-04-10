//Repository é o fornecedor de dados, responsável apenas pelo acesso ao banco de dados
//Ele não tem lógica de negócio, apenas faz as operações CRUD no banco de dados
//Responsabilidade: apenas acesso ao banco de dados, não tem lógica de negócio.

import { prisma } from "../database/prisma";

export async function createTask(
    title: string,
    description: string,
    status: string,
    ownerUserId: number,
    createdUserId: number,
    boardId: number,
    columnId: number) {

    try {

        const now = new Date();

        // Calcula a data de vencimento: 7 dias a partir de agora
        const dueDate = new Date(now.getTime() + (1000 * 60 * 60 * 168));

        // prisma.nomeDoModel.metodo()
        const task = await prisma.task.create({
            //data é usado porque é do próprio prisma
            data: {
                title,
                description: description || "",
                status: status || "OPEN",
                due_date: dueDate,
                created_at: now,
                updated_at: now,
                is_deleted: false,
                owner_user_id: ownerUserId,
                created_user_id: createdUserId,
                board_id: boardId,
                column_id: columnId,
            },
        });

        return task;

    } catch (error: any) {
        console.error("Erro ao criar task:", error);
        throw new Error(
            error?.message ?? "Erro ao criar task no banco de dados"
        );
    }
}

export async function getAllTasks(page: number | undefined, limit: number | undefined, filterDeleted?: boolean) {
    try {

        const query: any = {
            orderBy: {
                id: 'asc',
            },
        }

        const pageLimit = limit;

        const filter: boolean | undefined = filterDeleted

        if (page !== undefined && pageLimit !== undefined) {
            const skip = (page - 1) * pageLimit;

            query.take = pageLimit
            query.skip = skip
        }

        if (filter !== undefined) {
            query.where = { is_deleted: filter };

        }

        const tasks = await prisma.task.findMany(query);

        return {
            total: tasks.length,
            tasks: tasks
        };

    } catch (error: any) {

        console.error("Erro ao buscar tasks:", error);
        throw new Error(error?.message ?? "Erro ao buscar tasks do banco de dados");
    }
}

export async function getTaskById(taskId: number) {

    try {

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            },
        })

        if (!task) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        return task;

    } catch (error: any) {

        console.error("Erro ao listar o task", error);
        throw new Error(error?.message ?? "Erro ao listar o task do banco de dados");
    }
}

export async function deleteTaskById(taskId: number) {

    try {

        const task = await prisma.task.update({
            where: { id: taskId },
            data: { is_deleted: true },
        })

        if (!task) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        return task;

    } catch (error: any) {

        console.error("Erro ao deletar task:", error);
        throw new Error(error?.message ?? "Erro ao deletar task do banco de dados");
    }
}

export async function updateTask(
    taskId: number,
    title: string,
    description: string,
    status: string,
    due_date?: Date,
    is_deleted?: boolean
) {

    try {

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })

        if (!task) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        const result = await prisma.task.update({
            where: { id: taskId },
            data: {
                title,
                description,
                status,
                due_date,
                is_deleted
            },
        })

        return result;

    } catch (error: any) {

        console.error("Erro ao atualizar task:", error);
        throw new Error(error?.message ?? "Erro ao atualizar task no banco de dados");
    }
}
