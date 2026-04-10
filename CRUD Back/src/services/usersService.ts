//Services é o cozinheiro, ou seja, a regra de negócio/cérebro, onde fica toda a lógica da coisa
//Responsabilidade: validações e regras de negócio. Ex: se o nome está vazio, se o email é válido, etc.

import {
    createUser as createUserRepository,
    getAllUsers as getAllUsersRepository,
    getUserById as getUserByIdRepository,
    deleteUser as deleteUserRepository,
    updateUser as updateUserRepository,
    authUser as authUserRepository,
} from "../repositories/usersRepository";
import { stringToNumber } from "../utils/stringToNumber";
import { validateFields } from "../utils/validateFields";

export async function createUser(name: string, email: string, password: string) {
    try {

        // Valida se name foi enviado
        if (name === null || name === undefined) {
            throw new Error("O nome não pode ser vazio");
        }

        name = validateFields('name', name);

        // Valida se email foi enviado
        if (email === null || email === undefined) {
            throw new Error("O email não pode ser vazio");
        }

        email = validateFields('email', email);

        // Valida se password foi enviado
        if (password === null || password === undefined) {
            throw new Error("A senha não pode ser vazia");
        }

        password = validateFields('password', password);

        const user = await createUserRepository(name, email, password);
        return {
            message: "Usuário criado com sucesso!",
            user: user

        };
    } catch (error: any) {

        console.log("Ocorreu um erro ao criar o usuário", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao criar o usuário");
    }
}

export async function getAllUsers(isDeletedParam?: boolean, isActiveParam?: boolean) {

    try {
        return await getAllUsersRepository(isDeletedParam, isActiveParam);
    } catch (error: any) {
        console.log("Ocorreu um erro ao listar todos os usuários", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao listar os usuários");
    }
}

export async function getUserById(id: string) {
    try {
        const userId = stringToNumber(id)

        const user = await getUserByIdRepository(userId);

        return user;
    } catch (error: any) {
        console.log("Ocorreu um erro ao listar o usuário solicitado!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao listar o usuário solicitado!");
    }
}

export async function deleteUser(id: string) {

    try {
        const userId = stringToNumber(id)

        const user = await deleteUserRepository(userId);

        return user;
    } catch (error: any) {
        console.log("Ocorreu um erro ao deletar o usuário solicitado!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao deletar o usuário solicitado!");
    }
}

export async function updateUser(id: string, data: any) {

    try {
        const userId = stringToNumber(id)

        // Valida que veio pelo menos um campo para atualizar
        const dataToUpdate: any = {};

        // Valida e adiciona name se foi enviado
        if (data.name !== undefined) {
            dataToUpdate.name = validateFields('name', data.name);
        }

        // Valida e adiciona email se foi enviado
        if (data.email !== undefined) {
            dataToUpdate.email = validateFields('email', data.email);
        }

        if (data.password !== undefined) {
            dataToUpdate.password = validateFields('password', data.password)
        }

        if (data.isActive !== undefined) {
            const isBoolean = typeof data.isActive;

            if (isBoolean !== "boolean") {
                throw new Error("O campo 'isActive' precisa ser boolean");
            }

            const booleanIsActive = data.isActive;

            dataToUpdate.isActive = booleanIsActive;
        }

        if (data.isDeleted !== undefined) {
            const isBoolean = typeof data.isDeleted;

            if (isBoolean !== "boolean") {
                throw new Error("O campo 'isDeleted' precisa ser boolean");
            }

            const booleanisDeleted = data.isDeleted;

            dataToUpdate.isDeleted = booleanisDeleted;
        }

        // Verifica se pelo menos um campo foi enviado
        if (!dataToUpdate.name && !dataToUpdate.email && !dataToUpdate.password && !dataToUpdate.isActive && !dataToUpdate.isDeleted) {
            throw new Error("Envie ao menos um campo para atualizar");
        }

        const user = await updateUserRepository(userId, dataToUpdate);

        if (!user) {
            throw new Error("Registro não encontrado");
        }

        return {
            message: "Usuário atualizado com sucesso!",
            user: user
        };
    } catch (error: any) {
        console.log("Ocorreu um erro ao editar o usuário solicitado!", error);
        throw new Error(error?.message ?? "Ocorreu um erro ao editar o usuário solicitado!");
    }
}

export async function authUser(email: string, password: string) {
    // Valida se email foi enviado
    if (email === null || email === undefined) {
        throw new Error("O email não pode ser vazio");
    }

    email = validateFields('email', email);

    // Valida se password foi enviado
    if (password === null || password === undefined) {
        throw new Error("A senha não pode ser vazia");
    }

    password = validateFields('password', password);

    const authUser = await authUserRepository(email);

    if (!authUser) {
        throw new Error("Verifique os dados e tente novamente");
    }

    if (password !== authUser.password) {
        throw new Error("Verifique os dados e tente novamente");
    }

    return {
        userId: authUser.id,
        userName: authUser.name
    }
}
