import type { SummonerPuuidDto } from "../dtos/SummonerPuuidDto"
import { getRiotBase } from "./RiotApiService"
import secrets from "../../secrets.json"
export function getSummonerName(summonerGameTag: string): string | null {
    if(!validateSummonerGameTag(summonerGameTag)) return null
    const summonerName: string = summonerGameTag.split("#")[0]
    return summonerName
}
export function getSummonerTagline(summonerGameTag: string): string | null {
    if(!validateSummonerGameTag(summonerGameTag)) return null
    const summonerTagline: string = summonerGameTag.split("#")[1]
    return summonerTagline
}
export function validateSummonerGameTag(summonerGameTag: string): boolean {
    const includesHashtag: boolean = summonerGameTag.includes("#")
    if(!includesHashtag) return false
    const splitSummonerGameTag: string[] = summonerGameTag.split("#")
    if(splitSummonerGameTag.length != 2) return false
    if(splitSummonerGameTag[0].length < 3) return false
    if(splitSummonerGameTag[1].length < 3) return false
    return true
}
export async function getSummonerPuuid(summonerName: string, summonerTagline: string): Promise<SummonerPuuidDto> {
    const token = secrets["RIOT-API-KEY"]
    const response = await fetch(getRiotBase() + `/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTagline}`, {
        method: "GET",
        headers: {
            "X-Riot-Token": token
        }
    })
    if (!response.ok) {
        throw new Error("Was not able to get summoner");
    }
    const summonerPuuid: SummonerPuuidDto = await response.json()
    return summonerPuuid
} 