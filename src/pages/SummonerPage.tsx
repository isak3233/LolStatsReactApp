import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SummonerProfile from "../components/SummonerProfile";
import type { SummonerPuuidDto } from "../dtos/SummonerPuuidDto";
import {
    getSummonerName,
    getSummonerPuuid,
    getSummonerTagline,
    validateSummonerGameTag
} from "../services/SummonerService";

function SummonerPage() {
    const { summonerGameTag } = useParams<{ summonerGameTag: string }>();

    const [summonerPuuid, setSummonerPuuid] = useState<SummonerPuuidDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadSummoner() {
            setLoading(true);
            setError(null);
            setSummonerPuuid(null);

            try {
                if (!summonerGameTag) {
                    throw new Error("Need summoner name!");
                }

                if (!validateSummonerGameTag(summonerGameTag)) {
                    throw new Error("Invalid summoner name!");
                }

                const summonerName = getSummonerName(summonerGameTag);
                const summonerTagline = getSummonerTagline(summonerGameTag);

                if (!summonerName || !summonerTagline) {
                    throw new Error("Need summoner name!");
                }

                const result = await getSummonerPuuid(
                    summonerName,
                    summonerTagline
                );

                if (!cancelled) {
                    setSummonerPuuid(result);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Something went wrong"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadSummoner();

        return () => {
            cancelled = true;
        };
    }, [summonerGameTag]);

    if (loading) {
        return <p>Loading summoner...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!summonerPuuid) {
        return <p>Summoner not found.</p>;
    }

    return (
        <div>
            <SummonerProfile summonerPuuid={summonerPuuid} />
        </div>
        )
}

export default SummonerPage;