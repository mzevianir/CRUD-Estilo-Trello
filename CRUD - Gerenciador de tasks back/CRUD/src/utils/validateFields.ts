// Essa função vai validar se o campo veio vazio ou não
// Ela aceita undefined então precisa validar isso manualmente

export function validateFields(fieldName: string, fieldValue: string) {
    if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
        throw new Error(`O campo ${fieldName} não pode estar vazio`);
    }
    return fieldValue.trim();
}