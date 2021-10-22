import {fetchUserMetadataByUsername} from "./fetch-user-metadata-by-username";
import {fetchContractsInUser} from "./fetch-contracts-in-user";

/**
 * Fetches the ids of all the contracts that an username has an affiliation with.
 * @param username
 */
export const fetchOwnershipByUsername = async (username: string) => {
    const userMetadata = await fetchUserMetadataByUsername(username);
    if(userMetadata) {
        const addresses = userMetadata.addresses || [];
        if(addresses.length > 0) {
            let tokensIdWithOwnership: Array<string> = [];
            for (const address of addresses) {
                const fetchContractsInAddress = await fetchContractsInUser(address) || [];
                if(fetchContractsInAddress.length > 0) {
                    tokensIdWithOwnership = [...tokensIdWithOwnership, ...fetchContractsInAddress];
                }
            }
            return tokensIdWithOwnership;
        }
    }
    return [];
}
