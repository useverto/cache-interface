import {fetchCommunityMetadata} from "./fetch-random-communities-with-metadata";

/**
 * Fetches the metadata for one (string) or more (array) communities.
 * This returns an array with (id, name, ticker, logo, description)
 * @param communityContractIds Single string or array of string containing the ids of the community as listed in the community contract
 */
export const fetchCommunitiesMetadata = async (communityContractIds: Array<string> | string) => {
    const contractIds = Array.isArray(communityContractIds) ? [...communityContractIds] : [communityContractIds];
    return (await fetchCommunityMetadata(contractIds));
}
