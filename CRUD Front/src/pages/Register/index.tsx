// State é um hook do react, ele é uma variavel especial que permite atualizar a tela conforme atualiza a váriavel
import { useEffect, useState, useRef } from 'react';
import styles from "./style.module.css";
import { Logo } from "../../components/Logo"
import api from '../../services/api'
import { Link, useNavigate } from 'react-router-dom';
import { LuUserPlus } from "react-icons/lu";
import { AiOutlineSafety } from "react-icons/ai";
import { IoRocketOutline } from "react-icons/io5";
import { FaRegTrashAlt } from 'react-icons/fa';

export function Register() {
    type User = {
        id: number;
        name: string;
        email: string;
        password: string;
    };


    // Poderia ser qualquer nome de variavel, mas por padrão usa o nome da variavel que quer atualizar
    // E o pre-fixo set antes do nome da variavel
    const [users, setUsers] = useState<User[]>([])

    const inputName = useRef<HTMLInputElement>(null);
    const inputEmail = useRef<HTMLInputElement>(null);
    const inputPassword = useRef<HTMLInputElement>(null);
    const inputConfirmPassword = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function getUsers() {
        const usersFromApi = await api.get('/users?is_deleted=false')
        setUsers(usersFromApi.data.users)
    }

    async function createUsers() {
        try {
            const password = inputPassword.current?.value;
            const confirmPassword = inputConfirmPassword.current?.value;

            console.log(`password: ${password} confirmPassword: ${confirmPassword}`)

            if (password !== confirmPassword) {
                alert('As senhas não conferem');
                return;
            }

            await api.post('/users', {
                name: inputName.current?.value,
                email: inputEmail.current?.value,
                password: inputPassword.current?.value
            })

            // Verifica se são diferentes de null/undefined e limpa eles
            if (inputName.current) {
                inputName.current.value = '';
            }
            if (inputEmail.current) {
                inputEmail.current.value = '';
            }
            if (inputPassword.current) {
                inputPassword.current.value = '';
            }

            if (inputConfirmPassword.current) {
                inputConfirmPassword.current.value = '';
            }

            navigate('/login');
        } catch (error: any) {
            throw new Error("Ocorreu um erro tente novamente em alguns segundos");
        }

        getUsers()
    }

    async function deleteUser(id: number) {
        await api.delete(`/users/${id}`)

        getUsers()
    }

    // Impede de enviar a página se tiver algum erro no form como campos não preenchido
    // Só chama a função de criar o user se tiver tudo certo 
    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        createUsers();
    }

    useEffect(() => {
        getUsers()
        //Se eu colocar algo aqui dentro do [] ele vai ser chamado quando a ação ocorrer só que ele não vai chamar mais quando dar refresh
        //Só que se não tiver nada, ele chama assim que abre
    }, [])

    // A partir daqui é o HTML/Componentes
    return (

        <main className={styles.container}>
            <div className={styles.brandPanel}>
                <div className={styles.brandLogo}>
                    <Logo className={styles.logoCustom} />
                </div>
                <div className={styles.brandContent}>
                    <h2 className={styles.brandTitle}>Crie sua conta e comece a organizar suas tarefas.</h2>
                    <p className={styles.brandDescription}>Registre-se para acessar os boards do seu time e colaborar com sua equipe.</p>
                    <div className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <LuUserPlus />
                            </div>
                            <div>
                                <p className={styles.featureTitle}>Cadastro Rápido</p>
                                <p className={styles.featureDescription}>Crie sua conta em segundos e comece a usar.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <AiOutlineSafety />
                            </div>
                            <div>
                                <p className={styles.featureTitle}>Acesso Controlado</p>
                                <p className={styles.featureDescription}>Escolha os boards que deseja participar.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <IoRocketOutline />
                            </div>
                            <div>
                                <p className={styles.featureTitle}>Pronto para Usar</p>
                                <p className={styles.featureDescription}>Após o registro, faça login e acesse seus boards.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={styles.brandFooter}>TaskBoard — Prototipo de sistema</p>
            </div>
            <div className={styles.formPanel}>
                <div className={styles.logo}>
                    <Logo className={styles.logoCustomRegister} />
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.formHeader}>
                        <h1 className={styles.formTitle}>Criar conta</h1>
                        <p className={styles.formDescription}>Preencha os dados abaixo para registrar seu usuario.</p>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Nome completo</label>
                            <input className={styles.input} placeholder='Informe seu nome completo' name='name' type='text' required ref={inputName} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Email</label>
                            <input className={styles.input} placeholder='Informe seu email' name='email' type='email' required ref={inputEmail} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Senha</label>
                            <input className={styles.input} placeholder='Informe sua senha' name='password' type='password' required ref={inputPassword} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label className={styles.label}>Confirmar senha</label>
                            <input className={styles.input} placeholder='Repita sua senha' name='confirmPassword' type='password' required ref={inputConfirmPassword} />
                        </div>
                        <button name='register' type='submit'>
                            Cadastrar
                        </button>
                    </form>
                    <p className={styles.loginLink}> Ja possui uma conta? <Link to="/login" className={styles.link}> Fazer login </Link></p>
                </div>
                {/* {users.map(user => (
                    <div key={user.id} className={styles.cardUser}>
                        <div>
                            <p>Nome: <span> {user.name}</span></p>
                            <p>Email: <span> {user.email}</span></p>
                        </div>
                        <button onClick={() => deleteUser(user.id)}>
                            <FaRegTrashAlt />
                        </button>
                    </div>
                ))} */}
            </div>
        </main>
    )
}