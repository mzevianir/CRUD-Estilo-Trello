export function isDeleted(isDeletedParam: boolean | undefined) {

    if (isDeletedParam === undefined || isDeletedParam === null) {
        return "ALL";
    }

    if (isDeletedParam === true) {
        return "ONLY_DELETED";
    }

    if (isDeletedParam === false) {
        return "ONLY_ACTIVE";
    }

    throw new Error("Filtro is_deleted inválido. Use true ou false.");
}

export function isActive(isActiveParam: boolean | undefined) {
    if (isActiveParam === undefined || isActiveParam === null) {
        return "ALL";
    }

    if (isActiveParam === true) {
        return "ONLY_INACTIVE";
    }

    if (isActiveParam === false) {
        return "ONLY_ACTIVE";
    }

    throw new Error("Filtro is_deleted inválido. Use true ou false.");
}