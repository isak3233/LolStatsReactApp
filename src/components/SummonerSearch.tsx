import { useState } from "react";
import { validateSummonerGameTag } from "../services/SummonerService";
import { useNavigate } from "react-router";
function SummonerSearch() {
    const [summonerGameTag, setSummonerGameTag] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    function handleSubmit():void {
        if(!validateSummonerGameTag(summonerGameTag)) {
            setError("Input need to include a summoner name and tagline, both need to include 3 or more characters!")
            return
        }
        navigate("/summoner/" + encodeURIComponent(summonerGameTag))

    }
    function handleOnChange(value: string): void {
        setSummonerGameTag(value)
        setError(null)
    }
    return (
        <div>
            <input 
                placeholder="Summoner#Euw"
                type="text"
                value={summonerGameTag}
                onChange={(e) => handleOnChange(e.target.value)}
            />
            <button onClick={handleSubmit} >Sök</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default SummonerSearch;