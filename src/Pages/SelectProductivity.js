import React,{useEffect, useState} from "react";
import axios from "axios";
import Select from 'react-select'
import {useHistory, useParams} from 'react-router-dom'

function SelectProductivity(params){
    const [option, setOption] = useState([])
    const [defaultValue, setDefaultValue] = useState('')
    const [effort, setEffort] = useState(0)
    const [state, setState] = useState(0)
    const values = useParams()
    const history = useHistory()
    const {id} = useParams()
    const {name} = params
    const {setUpdate, value} = params
  console.log(params)
    const change = async(e) => {
        try {
            const label = e.label
            const response = axios.post(`http://localhost:5000/changeproductivity/${name}/${id}`,{label})
            console.log((await response).data)
            setState(state+1)
            setUpdate(state+1)
            window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }
    const getValues = async() => {
        try {
            console.log("hi")
            const response = axios.get(`http://localhost:5000/productivity/${name}/${id}`)
            const data = (await response).data[0]
            setDefaultValue((await response).data[1])
            setOption([{
                id:1,
                value:data[0]['productivity'],
                label:data[0]['productivity']
            },{
                id:2,
                value:data[1]['productivity'],
                label:data[1]['productivity']
            },{
                id:3,
                value:data[2]['productivity'],
                label:data[2]['productivity']
            }])
            setEffort((await response).data[2])
            console.log((await response).data)
            console.log(defaultValue)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getValues()
    }, [state, value])
    return(
        <>
            <td className="secondrow">{defaultValue === ''?null:<Select options={option} onChange={e => change(e)} defaultValue={{id:0, label: defaultValue, value: defaultValue}} />}</td>
            <td className="thirdrow">{effort}</td>
        </>
    )
}

export default SelectProductivity