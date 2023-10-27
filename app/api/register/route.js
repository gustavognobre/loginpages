import User from "../../../models/user";
import { connectMongoDB } from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req) {
    try{
        const {name, email, password, gender, date} = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await connectMongoDB();
        await User.create({ name, email,gender,date, password: hashedPassword });


        return NextResponse.json({message: "Usuário registrado com sucesso"}, {status: 201});
    }catch(error){
        return NextResponse.json({message: "Houve um erro no cadastro de um novo usuário"}, {status: 500});
    }
}