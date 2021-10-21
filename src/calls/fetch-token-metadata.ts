import {cacheApiBaseRequest} from "./cache-api-base-request";
import {TokenMetadata} from "./types/token-metadata";
import {fetchTokens} from "./fetch-tokens";

/**
 * Returns the metadata of a token (contractId, type, lister)
 * @param tokenId Contract id of the token
 * @param fromContract Whether it should be fetched directly from the CDN (true) or the cache endpoint (false)
 */
export const fetchTokenMetadata = async (tokenId: string, fromContract?: boolean) => {
    if(fromContract) {
        const allTokens = await fetchTokens();
        return allTokens.find((token) => token.id === tokenId);
    } else {
        const getTokenMetadata = await cacheApiBaseRequest<TokenMetadata>(`token/metadata/${tokenId}`);

        if (getTokenMetadata) {
            return {
                ...getTokenMetadata.data,
                id: tokenId
            };
        }

        return undefined;
    }
}
