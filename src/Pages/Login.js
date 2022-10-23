import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import {useToken} from '../Auth/useToken'
function Login(){
    const history = useHistory()
    const [,setToken] = useToken()
    const formik = useFormik({
        initialValues:{
            email:'',
            pass:''
        },
        onSubmit: async values =>{
            const email = values.email;
            const pass = values.pass
            try {
                const result = axios.post('http://localhost:5000/api/login',{email, pass})
                console.log((await result).data)
                const {token} = (await result).data
                setToken(token)
                history.push(`/dashboard/${email}`)
            } catch (error) {
                console.log(error)
            }
        }
    })
    return(
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Email</label><br></br>
                        <input type="email" id="email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                    </div>
                    <div>
                        <label>Password</label><br></br>
                        <input type="password" id="pass" name="pass" value={formik.values.pass} onChange={formik.handleChange} ></input>
                    </div>
                    <div>
                        <input type="submit" value="Login"></input>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login