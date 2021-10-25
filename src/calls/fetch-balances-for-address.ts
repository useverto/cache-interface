import {UserBalance} from "./types/user-balance-model";
import {fetchBalanceByUserAddress} from "./fetch-balance-by-user-addr";
import {fetchContractsInUser} from "./fetch-contracts-in-user";

/**
 * Fetches all the balances for a given address.
 * This code execute a look-up in all the contracts that are known to the user.
 * @param userAddress
 * @param tokenType Whether to filter by an specific token type.
 */
export const fetchBalancesForAddress = async (userAddress: string, tokenType?: string): Promise<Array<UserBalance>> => {
    const contracts = await fetchContractsInUser(userAddress) || [];
    
    let response: Array<UserBalance> = [];
    for (let contractId of contracts) {
        const balance = await fetchBalanceByUserAddress(contractId, userAddress);
        if(balance) {
            response.push(balance);
        }
    }

    if(tokenType) {
        response = response.filter((item) => item.type?.toLowerCase() === tokenType.toLowerCase());
    }

    return response;
}
