import {
    createColumns as createColumnsRepository,
    getColumns as getColumnsRepository,
    getColumnsById as getColumnsByIdRepository,
    deleteColumn as deleteColumnRepository,
    updateColumn as updateColumnRepository
} from "../repositories/columnsRepository";
import { getBooleanFromQueryParam } from "../utils/getBooleanFromQueryParam";
import { stringToNumber } from "../utils/stringToNumber";

export async function createColumns(name: string, position: string, boardId: string) {
    try {

        const positionId = stringToNumber(position);

        const numberBoardId = stringToNumber(boardId);

        const columns = await createColumnsRepository(name, positionId, numberBoardId);

        return {
            message: "Coluna criada com sucesso!",
            columns: columns
        }

    } catch (error: any) {

        console.log("Erro ao criar a coluna!", error);

        throw new Error(error?.message ?? "Erro ao criar a coluna no banco de dados")
    }
}

export async function getColumns(isDeleted?: boolean) {

    try {

        const columns = await getColumnsRepository(isDeleted);

        return columns;

    } catch (error: any) {

        console.log("Erro ao buscar todas as colunas!", error);

        throw new Error(error?.message ?? "Erro ao buscar todas as colunas no banco de dados");
    }
}

export async function getColumnsById(id: string) {
    try {

        const columnId = stringToNumber(id)

        const columns = await getColumnsByIdRepository(columnId);

        return columns;

    } catch (error: any) {

        console.log("Ocorreu um erro ao buscar o ID da coluna solicitada!", error);

        throw new Error(error?.message ?? "Ocorreu um ao buscar o ID no banco de dados")
    }
}

export async function deleteColumn(id: string) {
    try {

        const columnId = stringToNumber(id)

        const columns = await deleteColumnRepository(columnId);

        return columns;

    } catch (error: any) {

        console.log("Ocorreu um erro ao deletar a coluna", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao dletar a coluna");
    }
}

export async function updateColumn(id: string, name?: string, position?: string, boardId?: string, isDeleted?: boolean) {

    try {

        const data: any = {};

        const filter: boolean | undefined = getBooleanFromQueryParam(String(isDeleted), 'is_deleted');

        const columnId = stringToNumber(id);

        if (name !== undefined) {
            const trimmedName = name.trim();
            if (!trimmedName) {
                throw new Error("Nome não pode ser vazio");
            }
            // Adiciona ou edita o parametro name
            data.name = trimmedName;
        }

        if (position !== undefined) {

            const numberPosition = stringToNumber(position)

            data.position = numberPosition;
        }

        if (boardId !== undefined) {

            const numberBoardId = stringToNumber(boardId)

            data.boardId = numberBoardId;
        }

        if (data.name === undefined && data.position === undefined && data.boardId === undefined) {
            throw new Error("Envie ao menos um campo para atualizar")
        }

        const columns = await updateColumnRepository(columnId, data.name, data.position, data.boardId, filter);

        return columns;

    } catch (error: any) {

        console.log("Ocorreu um erro ao atualizar a coluna", error);

        throw new Error(error?.message ?? "Ocorreu um erro ao atualizar a coluna");
    }
}