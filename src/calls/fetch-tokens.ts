import {fetchContract} from "./fetch-contract";
import {CommunityContractState} from "./types/community-contract-state";
import {CacheInterfaceConstants} from "../constants";

/**
 * Fetch all the tokens
 * @param specificType (not required) an specific type of token to be filtered by.
 */
export const fetchTokens = async (specificType?: string) => {
    const communityContractState = await fetchContract<CommunityContractState>(CacheInterfaceConstants.COMMUNITY_CONTRACT);
    const tokens = communityContractState?.state?.tokens || [];
    return specificType ? tokens.filter((item) => item.type === specificType) : tokens;
}
