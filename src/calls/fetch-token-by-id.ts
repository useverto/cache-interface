import {fetchTokens} from "./fetch-tokens";
import {CommunityContractToken} from "./types/community-contract-state";

/**
 * Fetch a token given an id an optionally a predicate
 * @param tokenId Id for token to look up
 * @param filter Predicate for token
 */
export const fetchTokenById = async (tokenId: string, filter?: (val: CommunityContractToken) => boolean): Promise<CommunityContractToken | undefined> => {
    const allTokens = await fetchTokens();
    return allTokens.find((token) => token.id === tokenId && (filter ? filter(token) : true));
}
