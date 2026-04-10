export function stringToNumber(paramString: string) {

    if(!String(paramString)){
        throw new TypeError("Informe uma string válida!");
    }

    const paramStringToNumber = Number(paramString);

    if (Number.isNaN(paramStringToNumber) || !Number.isInteger(paramStringToNumber) || paramStringToNumber <= 0) {
        throw new TypeError("Informe um tipo number válido!");
    }

    return paramStringToNumber;
}