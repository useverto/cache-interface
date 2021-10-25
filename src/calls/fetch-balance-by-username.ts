import {fetchUserMetadataByUsername} from "./fetch-user-metadata-by-username";
import {UserBalance} from "./types/user-balance-model";
import {fetchBalancesForAddress} from "./fetch-balances-for-address";

/**
 * Fetches all the balances given a username.
 * @param username
 * @param tokenType Type contract with balances to be fetched, for example: 'art'
 */
export const fetchBalancesByUsername = async (username: string, tokenType?: string) => {
    const userMetadata = await fetchUserMetadataByUsername(username);
    if(userMetadata) {
        const addresses = userMetadata.addresses || [];
        let response: Array<UserBalance> = [];

        for (const address of addresses) {
            const balancesInAddress = await fetchBalancesForAddress(address, tokenType);
            response = [
                ...response,
                ...balancesInAddress
            ];
        }

        return response;
    }

    return undefined;
}
