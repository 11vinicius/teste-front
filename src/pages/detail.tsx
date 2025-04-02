import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User } from "../interfaces/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

const Detail:React.FC = ()=>{
    const [searchParams] = useSearchParams();
    const [user, setUser] = React.useState<User|null>(null);
    const navigate = useNavigate();


    const id = searchParams.get('id');

    async function findById(id:string){
        const res = await axios.get(`http://localhost:2000/${id}`);

        setUser(res.data);

        console.log(user);
        console.log(res.data);
    }


    useEffect(()=>{
        if(id){
            findById(id!);

        }
    },[id]);


    const schema = z.object({
        name: z.string().min(3,'Campo nome obrigatório'),
        email: z.string().email('Digite um email válido'),
        password: z.string().min(8,'Campo deve conter no minimo 8 caracteres'),
    });


    const { formState: { errors }, handleSubmit, control } = useForm<User>({
        resolver: zodResolver(schema),
    })


    async function onSubmit(data:User){
        const res = await axios.put(`http://localhost:2000/${id}`, data);
    }

    function onCancel(){
        navigate('/');
    }

    if(!user){
        return(
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }


    return (
        <div className="p-4">
            <h1>Criar User</h1>
            <div>
                <Controller
                    name="name"
                    defaultValue={user?.name}
                    control={control}
                    render={({ field:{onChange, value, name} }) => {
                            return(
                                <div>
                                    <input className="border-2 border-black" onChange={onChange} value={value} name={name} />
                                    <p className="text-red-500">{errors.name?.message}</p>
                                </div>
                            )
                        }
                    }
                />
                <Controller
                    name="email"
                    defaultValue={user?.email}
                    control={control}
                    render={({ field:{onChange, value, name} }) => {
                            return(
                                <div>
                                    <input className="border-2 my-4 border-black" onChange={onChange} value={value} name={name} />
                                    <p>{errors.email?.message}</p>
                                </div>
                            )
                        }            
                    }
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue={user?.password}
                    render={({ field:{onChange, value, name} }) => {
                            return(
                                <div>
                                    <input className="border-2 border-black" onChange={onChange} value={value} name={name} />
                                    <p>{errors.password?.message}</p>
                                </div>
                            )
                        }
                    }
                />
            </div>

            <button className="bg-red-800 mr-4 p-2 my-2 text-white rounded-md" onClick={onCancel}>Cancelar</button>
            <button className="bg-blue-500  p-2 my-2 text-white rounded-md" onClick={handleSubmit(onSubmit)}>Salvar</button>        </div>
    )
}

export default Detail;