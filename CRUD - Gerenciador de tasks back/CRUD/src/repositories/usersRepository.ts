//Repository é o fornecedor de dados, responsável apenas pelo acesso ao banco de dados
//Ele não tem lógica de negócio, apenas faz as operações CRUD no banco de dados
//Responsabilidade: apenas acesso ao banco de dados, não tem lógica de negócio.

import { prisma } from "../database/prisma";

export async function createUser(name: string, email: string, password: string) {

    const now = new Date();

    try {
        const verifyEmail = await prisma.users.findFirst({
            where: {
                email: email,
            },
        })

        if (verifyEmail) {
            throw new Error("O email já existe!")
        }

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password,
                created_at: now,
                updated_at: now
            },
        });

        return user;
    } catch (error: any) {
        console.error("Ocorreu um erro ao criar um usuário no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao criar um usuário no banco de dados");
    }
}

export async function getAllUsers(filterDeleted?: boolean, filterActive?: boolean) {
    try {

        const query: any = {
            orderBy: {
                id: 'asc',
            },
            omit: {
                password: true
            },
        }

        const activeFilter: boolean | undefined = filterActive;

        const deletedFilter: boolean | undefined = filterDeleted;

        const filters: any[] = []

        if (deletedFilter !== undefined) {
            filters.push({ is_deleted: deletedFilter })
        }

        if (activeFilter !== undefined) {
            filters.push({ is_active: activeFilter })
        }

        if (filters.length > 0) {
            query.where = {
                AND: filters
            }
        }

        const users = await prisma.users.findMany(query);

        return {
            total: users.length,
            users: users
        };

    } catch (error: any) {
        console.error("Ocorreu um erro ao buscar todos os usuários no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao buscar todos os usuários no banco de dados");
    }
}

export async function getUserById(userId: number) {

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: userId
            },
            omit: {
                password: true
            }
        })

        if (!user) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        return user;
    } catch (error: any) {
        console.error("Ocorreu um erro ao buscar o usuário informado no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao buscar o usuário informado no banco de dados");
    }
}

export async function deleteUser(userId: number) {

    try {

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("Nenhum usuário encontrado com o ID informado");
        }

        const result = await prisma.users.update({
            where: { id: userId },
            data: { is_deleted: true }
        });

        return {
            message: "Usuário deletado com sucesso!",
            user: result
        }
    } catch (error: any) {
        console.error("Ocorreu um erro ao deletar o usuário do banco de dados!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao deletar o usuário do banco de dados")
    }
}

export async function updateUser(userId: number, data: any) {

    try {

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("Esse ID não existe, informe um ID existente!");
        }

        const result = await prisma.users.update({
            where: { id: userId },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                is_active: data.isActive,
                is_deleted: data.isDeleted
            },
        })


        return result;
    } catch (error: any) {
        console.error("Ocorreu um erro ao editar o usuário no banco de dados", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao editar o usuário no banco de dados")
    }
}

export async function authUser(email: string) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
            },
        })

        return user

    } catch (error: any) {
        console.error("Ocorreu um erro ao tentar logar com o usuário", error);
        throw new Error(error?.message ?? "Ocorreu um problema na autenticação do usuário")
    }
}