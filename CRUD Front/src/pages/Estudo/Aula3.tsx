import { useState } from "react"

export function Estudo() {

    const [counter, setCounter] = useState(0);


    function incrementar() {
        if (counter >= 10) {
            return alert("Contador não pode ser maior que 10!");
        }

        setCounter(prev => prev + 1);
    }

    function decrementar() {
        if (counter <= 0) {
            return alert("Contador não pode ser menor que 0!");
        }

        setCounter(prev => prev - 1);
    }

    function resetar() {
        setCounter(0);
    }

    return (
        <main>
            <p>Incremente ou decremente o contador, lembrando que o minimo é 0 e o máximo é 10</p>
            <div>{counter}</div>
            <button disabled={counter === 0} onClick={decrementar}>-1</button>
            <button disabled={counter === 0} onClick={resetar}>Resetar</button>
            <button disabled={counter === 10} onClick={incrementar}>+1</button>
        </main>
    )
}