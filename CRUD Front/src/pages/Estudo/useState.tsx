import { useState } from "react";

export function Estudo() {

    const [qnt, setQnt] = useState(0)
    const [input, setInput] = useState("")

    // let qnt = 0;

    function incrementar() {
        setQnt(prevQnt => prevQnt +1)
        console.log("Adicionei mais um confia po", qnt);
    }

    return (
        <main>
            <p>Quantidade de qualquer coisa: {qnt} </p>
            <button onClick={incrementar}>Aumentar</button>

            <p>Escreve algo ai po, vai aparecer aqui: {input}</p>
            <input value={input} onChange={event => setInput(event.target.value)}/>
        </main>
    )
}