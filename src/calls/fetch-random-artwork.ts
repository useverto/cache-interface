import {cacheApiBaseRequest} from "./cache-api-base-request";
import {TokenMetadata} from "./types/token-metadata";

/**
 * Fetches random art work (tokens with type = 'collection' or 'art').
 * @param limit Limit of results to be returned
 */
export const fetchRandomArtwork = async (limit: number = 4) => {
    return (await cacheApiBaseRequest<Array<TokenMetadata>>(`token/artwork/random?limit=${limit}`))?.data;
}
