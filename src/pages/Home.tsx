import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/user";
import axios from "axios";


const Home:React.FC = ()=>{
    const navigate = useNavigate();
    const [data, setData] = React.useState<User[]|null>(null);


    async function findAll(){
        try {
            const res = await axios.get('http://localhost:2000');
            if(res.status = 200) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{ 
        findAll(); 
    },[]);

    function onSeeDetail(id:string){
        const query = new URLSearchParams();
        query.set('id', id);
        navigate(`/detail?${query.toString()}`);
    }


    async function onDelete(id:string){
        await axios.delete(`http://localhost:2000/${id}`);
        await findAll()
    }

    function onCreate(){
        navigate('/create');
    }   


    if(!data){
        return(
            <div className="w-full h-screen flex justify-center items-center">
                <h1>Carregando...</h1>
            </div>
        )
    }


    return(
        <div className="m-4">
            <button className="bg-blue-500 p-2  text-white rounded-md" onClick={onCreate}>Adicionar</button>
            {data.map((user) => (
                <div className="border border-gray-400 p-4 my-2 rounded-md" key={user.id}>
                    <h1 className="text-2xl">{user.name}</h1>
                    <p className="text-lg">{user.email}</p>
                    <button className="bg-blue-500 p-2 mr-2 text-white rounded-md" onClick={() => onSeeDetail(user!.id!)}>Editar</button>
                    <button className="bg-red-500 p-2  text-white rounded-md" onClick={() => onDelete(user!.id!)}>Apagar</button>
                </div>
            ))}
        </div> 
    ) 
}

export default Home;