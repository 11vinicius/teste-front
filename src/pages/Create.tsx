import { z } from 'zod';
import { Controller, useForm,  } from "react-hook-form";
import { User } from '../interfaces/user';
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Create:React.FC = ()=>{
    const navigate = useNavigate();

    const schema = z.object({
        name: z.string().min(8,'Campo deve conter no minimo 8 caracteres'),
        email: z.string().email('Digite um email válido'),
        password: z.string().min(8,'Campo deve conter no minimo 8 caracteres'),
    });


    const { formState: { errors }, handleSubmit, control } =  useForm<User>({
        resolver: zodResolver(schema),
    })


    async function onSubmit(data:User){
        const res = await axios.post('http://localhost:2000', data);
        navigate('/');
    }

    function onCancel(){
        navigate('/');
    }


    return (
        <div className='p-8'>
            <h1>Criar User</h1>
            <div>
            <Controller
                name="name"
                defaultValue=''
                control={control}
                render={({ field:{onChange, value, name} }) => {
                        return(
                            <div>
                                <input  className="border-2 border-black"  onChange={onChange} value={value} name={name} />
                                <p className='text-red-500'>{errors.name?.message}</p>
                            </div>
                        )
                    }
                }
            />
            <Controller
                name="email"
                defaultValue=''
                control={control}
                render={({ field:{onChange, value, name} }) => {
                        return(
                            <div>
                                <input  className="border-2 my-4 border-black"  onChange={onChange} value={value} name={name} />
                                <p className='text-red-500'>{errors.email?.message}</p>
                            </div>
                        )
                    }            
                }
            />
            <Controller
                name="password"
                control={control}
                defaultValue=''
                render={({ field:{onChange, value, name} }) => {
                        return(
                            <div>
                                <input  className="border-2 border-black"  onChange={onChange} value={value} name={name} />
                                <p className='text-red-500'>{errors.password?.message}</p>
                            </div>
                        )
                    }
                }
            />
            </div>
            <button className="bg-red-800 mr-4 p-2 my-2 text-white rounded-md" onClick={onCancel}>Cancelar</button>
            <button className="bg-blue-500  p-2 my-2 text-white rounded-md" onClick={handleSubmit(onSubmit)}>Salvar</button>
        </div>
    )
}

export default Create;
