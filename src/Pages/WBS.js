import React,{useState, useEffect} from "react"
import axios from "axios"
import BidPrice from "./BidPrice"
import wbs from '../Images/Doc1.jpg'
import {useParams} from 'react-router-dom'
function WBS(){
    const [changeState, SetChangeState] = useState(0)
    const [state, setState] = useState({
        complexScreen:0,
        simpleScreen:120,
        complexDatabase:80,
        simpleDatabase:40,
        complexApi:120,
        simpleApi:60,
        complexReport:70,
        simpleReport:30,
        total: 570
    })

function handleChange(e){
 const name = e.target.name
 const value = e.target.value
 setState({
    ...state,
    [name]:value
 })
 
}
const {id} = useParams()
const handleBlur = async e => {
    const coloumn = e.target.name
    const value = e.target.value
    console.log(coloumn, value)
    try {
        const response = axios.post("http://localhost:5000/wbs",{coloumn, value,id})
        const data = (await response).data
        setState({
            ...state,
            ['total']:parseInt(data)
        })
        SetChangeState(changeState + 1)
    } catch (error) {
        console.log(error)
    }
}
const defalut = async() =>{
    try {
    const response = axios.post('/wbsdefault')
    const data = (await response).data
    setValues(data)
    SetChangeState(changeState + 1)
    } catch (error) {
        console.log(error)
    }
}

const setValues = (data) => {
    setState({
        ...state,
        ['complexScreen']: parseInt(data.complexscreen),
        ['simpleScreen']: parseInt(data.simplescreen),
        ['complexDatabase']:parseInt(data.complexdatabase),
        ['simpleDatabase']: parseInt(data.simpledatabase),
        ['complexApi']: parseInt(data.complexapi),
        ['simpleApi']:parseInt(data.simpleapi),
        ['complexReport']: parseInt(data.complexreport),
        ['simpleReport']:parseInt(data.simplereport),
        ['total']:parseInt(data.total)
    })
}
const getValues = async() => {
    try {
        const response = axios.get(`http://localhost:5000/tablevalues/${'WBS'}/${id}`)
        console.log((await response).data)
        const data = (await response).data
        setValues(data)
    } catch (error) {
        console.log(error)
    }
}



useEffect(() => {
getValues()
},[])
return(
    <>
        <div className="Dash">
            <div className="n">
                <h1>WBS</h1>
            </div>
            <div>
        <BidPrice name={changeState} />

            </div>
        </div>
       
        <div className="wbs">
            <div>
            <img src={wbs} width='400px' height='500px' />

            </div>
            
        <form>
                        <div className="divider" >
                            <h3 className="l">Quantity</h3>
                            <h3 >Adjust</h3>
                        </div>

                        <div className="divider" >
                            <h3 className="l">Deliverable Type</h3>
                            <h3 >Estimate Quantity</h3>
                        </div>
                        <div className="divider" >
                            <label className="l" >Complex Screen</label>
                            <input type="number" id="complexScreen" value={state.complexScreen} onChange={handleChange} name="complexScreen" onBlur={handleBlur} ></input><br />
                        </div>
                        <div className="divider">
                            <label className="l">Simple Screen</label>
                            <input type="number" id="simpleScreen" value={state.simpleScreen} name="simpleScreen" onChange={handleChange} onBlur={handleBlur}  ></input><br />
                        </div>
                        <div className="divider">
                            <label className="l">Complex database</label>
                            <input type="number" id="complexDatabase" value={state.complexDatabase} name="complexDatabase" onChange={handleChange} onBlur={handleBlur}  ></input><br />  
                        </div>
                        <div className="divider">
                            <label className="l">Simple database</label>
                            <input type="number" id="simpleDatabase" value={state.simpleDatabase} name="simpleDatabase" onChange={handleChange} onBlur={handleBlur}  /><br />
                        </div>
                        <div className="divider">
                            <label className="l">Complex API</label>
                            <input type="number" id="complexApi" value={state.complexApi} name="complexApi" onChange={handleChange} onBlur={handleBlur}  /><br />
                        </div>
                        <div className="divider" >
                            <label className="l">Simple API</label>
                            <input type="number" id="simpleApi" value={state.simpleApi} name="simpleApi" onChange={handleChange} onBlur={handleBlur}  /><br />
                        </div>
                        <div className="divider">
                            <label className="l">Complex Report</label>
                            <input type="number" id="complexReport" name="complexReport" value={state.complexReport} onChange={handleChange} onBlur={handleBlur}  /><br />
                        </div>
                        <div className="divider">
                            <label className="l">Simple Report</label>
                            <input type="number" id="simpleReport" name="simpleReport" value={state.simpleReport} onChange={handleChange} onBlur={handleBlur}  /><br />
                        </div>
                        <div className="divider">
                            <label className="l">Total</label>
                            <input type="number" id="total" name="total" value={state.total} disabled  />
                        </div>
                    </form>
                    <div>
                        <button className="sumbit" onClick={() => defalut()}>Reset to Default</button>
                    </div>
                    </div>
                    
    </>
)
}

export default WBS