import {fetchContract} from "./fetch-contract";
import {CacheInterfaceConstants} from "../constants";
import {CommunityContractPeople, CommunityContractState} from "./types/community-contract-state";

/**
 * Fetches users from the community contract.
 */
export const fetchUsers = async (): Promise<Array<CommunityContractPeople>> => {
    const communityContractState = await fetchContract<CommunityContractState>(CacheInterfaceConstants.COMMUNITY_CONTRACT);
    return (communityContractState?.state?.people || []).filter(({ username }) => username && username.length > 0);
}
