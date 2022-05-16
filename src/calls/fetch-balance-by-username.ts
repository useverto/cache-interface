import {fetchUserMetadataByUsername} from "./fetch-user-metadata-by-username";
import {UserBalance} from "./types/user-balance-model";
import {fetchBalancesForAddress} from "./fetch-balances-for-address";
import {cacheApiBaseRequest} from "./cache-api-base-request";

/**
 * Fetches all the balances given a username.
 * @param username
 * @param tokenType Type contract with balances to be fetched, for example: 'art'
 * @param manual Whether it should fetch by each or by cache
 */
export const fetchBalancesByUsername = async (username: string, tokenType?: string, manual?: boolean) => {
    let response: Array<UserBalance> = [];
    if(manual) {
        const userMetadata = await fetchUserMetadataByUsername(username);
        if (userMetadata) {
            const addresses = userMetadata.addresses || [];

            for (const address of addresses) {
                const balancesInAddress = await fetchBalancesForAddress(address, tokenType, manual);
                response = [
                    ...response,
                    ...balancesInAddress
                ];
            }

            return response;
        }
    } else {
        const data = (await cacheApiBaseRequest<{ entities: Array<UserBalance>}>(`users/balances/${username}?username=true`))?.data;
        response = [...(data?.entities || [])];
        return response;
    }

    return undefined;
}
