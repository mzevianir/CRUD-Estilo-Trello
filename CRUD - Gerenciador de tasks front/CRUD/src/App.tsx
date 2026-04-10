import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Board } from './pages/Board'
import { Estudo } from './pages/Login/estudo'

// O main chama o APP e o APP retorna as rotas/pages disponiveis
// Componente do React é assim:
// 1- Função e um return
// 2- Fora do return é código JS/TS
// Dentro do return  é código "HTML"
// Consigo usar código JS/TS dentro do return se usar dentro de { }

function App() {
  // Aqui poderia vir código JS/JS
  return (
    // Aqui começa o código "HTML"
    <Routes>
      <Route path="/estudo" element={<Estudo />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  )
}

export default App