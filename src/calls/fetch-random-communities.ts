import {cacheApiBaseRequest} from "./cache-api-base-request";
import {TokenMetadataLookUp, TokenMetadata} from "./types/token-metadata";

/**
 * Fetches random communities (tokens with type = 'community').
 * @param limit Limit of results to be returned
 */
export const fetchRandomCommunities = async (limit: number = 4) => {
    return (await cacheApiBaseRequest<TokenMetadataLookUp>(`token/communities/random?limit=${limit}`))?.data || {
        entities: [],
        resultsStatus: 'NOT_FOUND'
    } as TokenMetadataLookUp;
}
