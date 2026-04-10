// Value é unknow porque pode ser string, string [] ou undefined, então aceito todos e valido depois
// E a função é do tipo boolean ou undefined, ou seja, o retorno que vai me dar
export function getBooleanFromQueryParam(value: unknown, paramName: string): boolean | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`Parâmetro '${paramName}' inválido. Use 'true' ou 'false'.`);
  }

  const normalized = value.toLowerCase();

  if (normalized === "true") return true;
  if (normalized === "false") return false;

  throw new Error(`Parâmetro '${paramName}' inválido. Use 'true' ou 'false'.`);
}