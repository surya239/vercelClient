import axios from "axios";
import React,{useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";

function Dashboard(){
    const {email} = useParams()
    const history = useHistory()
    const [games, setGames] = useState([])
    let i = 1;
    const createGame = async() => {
        
        try {
            const result = axios.post("http://localhost:5000/api/creategame",{email})
            const {id} = (await result).data
            console.log((await result).data)
            history.push(`/game/dashboard/${email}/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
    const getValues = async() => {
        try {
            const result = axios.get(`http://localhost:5000/api/getgames/${email}`)
            const data = (await result).data
            setGames(data)
        } catch (error) {
            console.log(error)
        }
    }
const g = (id)=>{
    console.log(id)
    history.push(`/game/dashboard/${email}/${id}`)
}

const change = (id) => {
    history.push(`/report/dashboard/${email}/${id}`)
}
    useEffect(() =>{
        getValues()
    },[])
    return(
        <>
            <div>
                hi {email}
            </div>
            <div>
                <button onClick={createGame}>Start new game</button>
            </div>
            <div>
                <h1>Game History</h1>
                <div className="map">
                   {games.map(game => (
                    <div key={game.gameid}>
                        <span>game {i++}</span>
                        <button onClick={() => g(game.gameid)} >Restart</button>
                        <button onClick ={() =>change(game.gameid) } >Report</button>
                    </div>
                   ))}
                </div>
            </div>
        </>
    )
}

export default Dashboard;