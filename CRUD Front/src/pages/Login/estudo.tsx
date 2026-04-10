import { useState } from "react";

export function Estudo() {

    const [qnt, setQnt] = []

    function incrementar() {
        qnt++;
        console.log("Adicionei mais um confia po");
        console.log(qnt);
    }

    return (
        <main>
            <p>Quantidade de qualquer coisa: {qnt} </p>
            <button onClick={incrementar}>Aumentar</button>
        </main>
    )
}