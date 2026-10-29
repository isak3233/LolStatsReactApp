import type { SummonerPuuidDto } from "../dtos/SummonerPuuidDto";

type SummonerProfileProps = {
    summonerPuuid: SummonerPuuidDto;
};

function SummonerProfile({ summonerPuuid }: SummonerProfileProps) {
    return (
        <div>
            <h2>
                {summonerPuuid.gameName}#{summonerPuuid.tagLine}
            </h2>

            <p>{summonerPuuid.puuid}</p>
        </div>
    );
}

export default SummonerProfile;