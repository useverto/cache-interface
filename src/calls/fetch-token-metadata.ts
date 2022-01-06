import {cacheApiBaseRequest} from "./cache-api-base-request";
import {TokenMetadata} from "./types/token-metadata";
import {fetchTokenById} from "./fetch-token-by-id";

/**
 * Returns the metadata of a token (contractId, type, lister)
 * @param tokenId Contract id of the token
 * @param fromContract Whether it should be fetched directly from the CDN (true) or the cache endpoint (false)
 */
export const fetchTokenMetadata = async (tokenId: string, fromContract?: boolean) => {
    if(fromContract) {
        return fetchTokenById(tokenId);
    } else {
        const getTokenMetadata = await cacheApiBaseRequest<TokenMetadata>(`token/metadata/${tokenId}`);

        if (getTokenMetadata) {
            return {
                ...getTokenMetadata.data,
                id: tokenId
            } as TokenMetadata;
        }

        return undefined;
    }
}
