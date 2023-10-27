"use client";

import { useState } from "react";
import styles from "./RegisterForm.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation";


export default function RegisterForm() {
    
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[password2, setPassword2] = useState("");
    const[gender, setGender] = useState("");
    const[date, setDate] = useState("");
    const[error, setError] =useState("");

    const router =  useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( password != password2){
            setError("Senhas diferentes");
            return;
        }
        if(!name || !email || !password){
            setError("Todos os campos são necessários.");
            return;
        }

        try{

            const resUserExists = await fetch('api/userExists',{
                method:"POST",
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserExists.json();

            if (user){
                setError("E-mail já cadastrado!");
                return;
            }

            const res = await fetch('api/register', {
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, gender,date
                })
            });

            if (res.ok){
                const form = e.target;
                form.reset();
                router.push("/login")
            } else{
                console.log("Falha no registro de usuário: ", name)
            }
        }catch(error){
            console.log("Erro durante o registro: ", error)
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
                        <Link href={"/register"} ><button className={styles.cadastrobtn}>Cadastro</button></Link>
                        <Link href={"/login"}><button className={styles.loginbtn}>Login</button> </Link>

                    </div>
                    <h2 className={styles.h2}>Cadastro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>Nome</span>
                            <input 
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            placeholder="Insira seu nome" 
                            className={styles.inputholder} />
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>E-mail</span>
                            <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="@mail.com"
                            className={styles.inputholder} />
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>Senha</span>
                            <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            placeholder="insira sua senha" 
                            className={styles.inputholder} />
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>Repita sua senha</span>
                            <input 
                            onChange={(e) => setPassword2(e.target.value)}
                            type="password" 
                            placeholder="repita sua senha" 
                            className={styles.inputholder} />
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>Genero</span>
                            <select 
                            onChange={(e) => setGender(e.target.value)}
                            name="gender" 
                            id="gender" 
                            placeholder=""
                            className={styles.inputholder}>
                                <option value="">
                                    -
                                </option>
                                <option value="masculino">
                                    Masculino
                                </option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                        <div className={styles.input_box}>
                            <span className={styles.campos}>Data de Nascimento</span>
                            <input
                            onChange={(e) => setDate(e.target.value)} 
                            type="date" 
                            placeholder="DD/MM/AAAA" 
                            className={styles.inputholder} />
                        </div>
                        <button className={styles.submitbtn}>Prosseguir</button>
                        { error &&(
                            <div className="bg-red-500 text-white w-fit text-cm py-1 px-3 rounded-md mt-2"> {error}</div>
                        )}
                        
                    </form>
                </div>

            </div>

        </div>

    </>
}