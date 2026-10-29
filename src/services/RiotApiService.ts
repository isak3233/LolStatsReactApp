import config from "../../config.json"
export function getRiotBase(gameRegion: string | null = null): string{
    let region = config["RIOT-API-REGION"]
    if(gameRegion) region = gameRegion
    const riotBase = `https://${region}.api.riotgames.com`
    return riotBase
}