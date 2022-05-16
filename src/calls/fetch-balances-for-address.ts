import {UserBalance} from "./types/user-balance-model";
import {fetchBalanceByUserAddress} from "./fetch-balance-by-user-addr";
import {fetchContractsInUser} from "./fetch-contracts-in-user";
import {cacheApiBaseRequest} from "./cache-api-base-request";

/**
 * Fetches all the balances for a given address.
 * This code execute a look-up in all the contracts that are known to the user.
 * @param userAddress
 * @param tokenType Whether to filter by an specific token type.
 * @param manual Whether it should fetch by each or by cache
 */
export const fetchBalancesForAddress = async (userAddress: string, tokenType?: string, manual?: boolean): Promise<Array<UserBalance>> => {
    let response: Array<UserBalance> = [];
    if(manual) {
        const contracts = await fetchContractsInUser(userAddress) || [];
        for (let contractId of contracts) {
            const balance = await fetchBalanceByUserAddress(contractId, userAddress);
            if (balance) {
                response.push(balance);
            }
        }
    } else {
        const data = (await cacheApiBaseRequest<{ entities: Array<UserBalance>}>(`users/balances/${userAddress}`))?.data;
        response = [...(data?.entities || [])];
    }


    if(tokenType) {
        response = response.filter((item) => item.type?.toLowerCase() === tokenType.toLowerCase());
    }

    return response;
}
