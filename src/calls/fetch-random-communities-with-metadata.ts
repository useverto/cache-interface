import {RandomCommunities} from "./types/community-contract-state";
import {fetchRandomCommunities} from "./fetch-random-communities";
import {fetchContract} from "./fetch-contract";

/**
 * Fetches random communities with included metadata such as name, ticker, logo and description.
 * @param limit
 */
export const fetchRandomCommunitiesWithMetadata = async (limit?: number): Promise<Array<RandomCommunities>> => {
    const randomCommunities = await fetchRandomCommunities(limit || 4);
    const lookupEntities = randomCommunities.entities;

    if(randomCommunities.resultsStatus === "NOT_FOUND" || lookupEntities?.length <= 0) {
        return [];
    } else {
        const contractIds = lookupEntities.map((item) => item.contractId);
        return fetchCommunityMetadata(contractIds);
    }
}

export const fetchCommunityMetadata = async (contractIds: Array<string>) => {
    const communities: Array<RandomCommunities> = [];
    for (const communitiesKey of contractIds) {
        const contract = await fetchContract(communitiesKey, false, true);
        if(contract) {
            const contractState = contract.state;
            const settings: Array<string> = (contractState.settings || []).flat();
            const logoIndex = settings.findIndex(item => item === "communityLogo");
            const descriptionIndex = settings.findIndex(item => item === "communityDescription");
            communities.push({
                id: communitiesKey,
                name: contractState.name,
                ticker: contractState.ticker,
                logo: settings[logoIndex + 1],
                description:  settings[descriptionIndex + 1],
            })
        }
    }
    return communities;
}
