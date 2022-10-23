import React,{useState, useEffect} from "react";
import axios from 'axios'
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import {useToken} from '../Auth/useToken';

function Signup(){
    const [,setToken] = useToken()
    const history = useHistory()
    const formik = useFormik({
        initialValues:{
            email:'',
            pass:'',
            cpass:''
        },
        onSubmit: async values => {
            const email = values.email;
            const pass = values.pass
            try {
                const response = axios.post(`http://localhost:5000/api/signup`,{email, pass})
                const {token} = (await response).data
                setToken(token);
                console.log((await response).data)
                history.push(`/dashboard/${email}`)
            } catch (error) {
                
            }
        }
    })
    return(
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Email</label><br></br>
                        <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} ></input>
                    </div>
                    <div>
                        <label>Password</label><br></br>
                        <input type="password" id="pass" name="pass" value={formik.values.pass} onChange={formik.handleChange} ></input>
                    </div>
                    <div>
                        <label>Confirm Password</label><br></br>
                        <input type="password" id="cpass" name="cpass" value={formik.values.cpass} onChange={formik.handleChange} ></input>
                    </div>
                    <div>
                        <input type="submit" value="Signup" ></input>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup