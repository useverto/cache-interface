import {cacheApiBaseRequest} from "./cache-api-base-request";
import {TokenMetadataLookUp, TokenMetadata} from "./types/token-metadata";

/**
 * Fetches random art work (tokens with type = 'collection' or 'art').
 * @param limit Limit of results to be returned
 */
export const fetchRandomArtwork = async (limit: number = 4) => {
    return (await cacheApiBaseRequest<TokenMetadataLookUp>(`token/artwork/random?limit=${limit}`))?.data || {
        entities: [],
        resultsStatus: 'NOT_FOUND'
    } as TokenMetadataLookUp;
}
