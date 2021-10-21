import {UserBalance} from "./types/user-balance-model";
import {fetchBalanceByUserAddress} from "./fetch-balance-by-user-addr";
import {fetchContractsInUser} from "./fetch-contracts-in-user";

/**
 * Fetches all the balances for a given address.
 * This code execute a look-up in all the contracts that are known to the user.
 * @param userAddress
 */
export const fetchBalancesForAddress = async (userAddress: string): Promise<Array<UserBalance>> => {
    const contracts = await fetchContractsInUser(userAddress) || [];
    
    const response: Array<UserBalance> = [];
    for (let contractId of contracts) {
        const balance = await fetchBalanceByUserAddress(contractId, userAddress);
        if(balance) {
            response.push(balance);
        }
    }

    return response;
}
