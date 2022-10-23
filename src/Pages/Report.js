import React,{useEffect, useState} from "react";
import axios from "axios";
import {useParams, useHistory} from 'react-router-dom';

function Reoport(){
    const [change, setChanges] = useState([])
    const {id} = useParams
    const getValues = async() => {
        try {
            const result = axios.get(`http://localhost:5000/getChanges/${id}`);
            console.log((await result).data)
            const data = (await result).data
            setChanges(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getValues()
    },[])
    return(
        <>
            <div className="cl">
                <span className="v">Data Name</span>
                <span className="v">Default value</span>
                <span className="v">Changed Value</span>
            </div>
            {change.map(c => (
               <div className="cl">
                    <span className="v">{c.col_name}</span>
                    <span className="v">{c.d_value}</span>
                    <span className="v">{c.c_value}</span>
               </div> 
            ) )}
            
        </>
    )
}

export default Reoport
