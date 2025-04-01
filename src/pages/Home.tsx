import React from "react";
import { useNavigate } from "react-router-dom";

const Home:React.FC = ()=>{
    const navigate = useNavigate();

    function onSeeDetail(){
        const query = new URLSearchParams();
        query.set('id', '1');
        navigate('/detail');
    }


    return <div>
        <h1>Home</h1>
    </div>
}

export default Home;