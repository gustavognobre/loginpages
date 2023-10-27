"use client";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";

export default function Home() {

  const{data:session} = useSession();

  return (
   <div>
    <h1>
      {session?.user?.name}
    </h1>
    <h1>A lógica de logout ta aqui</h1>
   <button 
   onClick={() => signOut()}
   className="bg-red-500 text-white font-bold px-6 py-2">Log Out</button>
   </div>
  )
}