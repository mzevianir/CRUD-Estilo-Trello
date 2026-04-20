import { useState } from "react"

export function Estudo() {

    const [input, setInput] = useState("");

    const haveName: string = input ? `Olá ${input}` : "Digite o seu nome"


    return (
        <main>
            <p>{haveName}</p>
            <input value={input} onChange={e => setInput(e.target.value)} />
        </main>
    )
}