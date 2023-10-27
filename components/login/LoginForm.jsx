"use client";

import { useState } from "react";
import styles from "./LoginForm.module.css"
import Link from "next/link"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handlerSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await signIn("credentials",{
                email, 
                password, 
                redirect:false,
            });

            if(res.error){
                setError("Senha ou Usuário incorreto");
                return;
            }

            router.replace("endocare/segura");
        }catch{
            console.log(error);
        }
    };




    return <>
        <div className={styles.container_login}>
            <div className={styles.img_box}>

                <img src="/bg-login.png" style={{ width: 'auto', height: 'auto' }} alt="Descrição da imagem" />

            </div>

            <div className={styles.content_box}>
                <div className={styles.form_box}>
                    <div>
                        <Link href={"/register"}><button className={styles.loginbtn }>Cadastro</button></Link>
                        <Link href={"/login"}><button className={styles.cadastrobtn}>Login</button></Link>
                    </div>
                    <h2 className={styles.h2}>Login</h2>
                    <form onSubmit={handlerSubmit}>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>E-mail</span>
                            <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder="@mail.com" 
                            className={styles.inputholder}/>
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>Senha</span>
                            <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            placeholder="insira sua senha" 
                            className={styles.inputholder}/>
                        </div>
                        <Link href={"/"}> 
                        <div className="text-right justify-end flex"><span className={styles.campos}> Esqueceu a senha?</span></div>
                        </Link>
                        <button className={styles.submitbtn}>Acessar</button>
                        { error &&(
                            <div className="bg-red-500 text-white w-fit text-cm py-1 px-3 rounded-md mt-2"> {error}</div>
                        )}
                    </form>
                </div>

            </div>

        </div>

    </>
}