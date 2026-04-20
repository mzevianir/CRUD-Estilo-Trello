import styles from "./style.module.css"
import { Logo } from "../../components/Logo"
import { Link, useNavigate } from "react-router-dom";
import { TbLayoutGrid } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { CiCircleCheck } from "react-icons/ci";
import api from '../services/api';
import { useRef } from "react";

export function Login() {

    const inputEmail = useRef<HTMLInputElement>(null);
    const inputPassword = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function authUser() {
        try {
            const response = await api.post('/login', {
                email: inputEmail.current?.value,
                password: inputPassword.current?.value,
            })

            localStorage.setItem("user", JSON.stringify(response.data));

            navigate('/home');
        } catch (error: any) {
            throw new Error("Verifique os dados e tente novamente!");
        }
    }

    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        authUser();
    }

    return (
        <main className={styles.container}>
            <div className={styles.brandPanel}>
                <div className={styles.brandLogo}>
                    <Logo className={styles.logoCustom} />
                </div>
                <div className={styles.brandContent}>
                    <h2 className={styles.brandTitle}>Gerencie suas tarefas de forma simples e organizada</h2>
                    <p className={styles.brandDescription}>Acesse seus boards, acompanhe tarefas e mantenha tudo sob controle em um único lugar.</p>
                    <div className={styles.featureList}>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <TbLayoutGrid />
                            </div>
                            <div>
                                <p className={styles.featureTitle}>Múltiplos Boards</p>
                                <p className={styles.featureDescription}>Organize por time, projeto ou departamento.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <LuUsers />
                            </div>
                            <div>
                                <p className={styles.featureTitle}>Acesso por Usuário</p>
                                <p className={styles.featureDescription}>Cada usuário acessa apenas seus boards permitidos.</p>
                            </div>
                        </div>
                        <div className={styles.featureItem}>
                            <div className={styles.featureIcon}>
                                <CiCircleCheck />
                            </div>
                            <div>
                                <p className={styles.featureTitle}>Acompanhamento Completo</p>
                                <p className={styles.featureDescription}>Veja datas de criação e atualizaçãoo de cada tarefa.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p className={styles.brandFooter}>TaskBoard - Feito por Mateus Zeviani Rodrigues</p>
            </div>
            <div className={styles.formPanel}>
                <div className={styles.logo}>
                    <Logo className={styles.logoCustomLogin} />
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.formHeader}>
                        <h1 className={styles.formTitle}>Acessar sistema</h1>
                        <p className={styles.formSubtitle}> Informe suas credenciais para visualizar seus boards.</p>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.input}>
                            <label>Usuário</label>
                            <input className={styles.user} placeholder="Digite seu usuário" type="text" required ref={inputEmail} />
                        </div>
                        <div className={styles.input}>
                            <label> Senha</label>
                            <input className={styles.password} placeholder="Digite sua senha" type="password" required ref={inputPassword} />
                        </div>
                        <button name="login" type="submit">Entrar</button>
                    </form>
                    <p className={styles.p}>Não possui uma conta? <Link to="/register" className={styles.link}>Crie uma agora</Link></p>
                </div>
            </div>
        </main>
    )
}
