import { useState } from "react"

export function Estudo() {

    const [qnt, setQnt] = useState(0);

    function diminuiQnt() {
        setQnt(prev => prev - 1);
    }

    function reseta(){
        setQnt(0);
    }

    function aumentaQnt() {
        setQnt(prev => prev + 1);
    }

    return (
        <main>
            <p> Esse numero aqui que vai ser alterado {qnt} </p>
            <button onClick={diminuiQnt}>-1</button>
            <button onClick={reseta}>Resetar</button>
            <button onClick={aumentaQnt}>+1</button>
        </main>
    )
}