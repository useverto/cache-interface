import {fetchTokens} from "./fetch-tokens";
import {cacheApiBaseRequest} from "./cache-api-base-request";
import {CommunityBalancesRaw} from "./types/community-contract-state";
import {LookUp} from "./types/lookup";
import {fetchCommunityMetadata} from "./fetch-random-communities-with-metadata";

/**
 * Fetches the communities with the top balance amount per contract.
 * Returns metadata containing: (id, name, ticker, logo, description)
 * @param limit: Max to fetch
 */
export const fetchTopCommunities = async (limit?: number) => {
    const cacheRequest = (await (cacheApiBaseRequest<LookUp<CommunityBalancesRaw>>(`token/communities/top?limit=${limit || 4}`)))?.data?.entities || [];
    const contractIds = cacheRequest.map((item) => item.contractId);
    return (await fetchCommunityMetadata(contractIds));
}
