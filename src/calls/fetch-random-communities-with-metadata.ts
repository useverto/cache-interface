import {RandomCommunities} from "./types/community-contract-state";
import {fetchRandomCommunities} from "./fetch-random-communities";
import {fetchContract} from "./fetch-contract";
import {getNameAndTickerAndLogoAndDescription} from "../utils/process-utils";

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
            const processedInfo = getNameAndTickerAndLogoAndDescription(communitiesKey, contract.state);
            communities.push(processedInfo);
        }
    }
    return communities;
}
