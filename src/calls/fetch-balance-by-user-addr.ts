import {fetchBalancesInContract} from "./fetch-balances-in-contract";
import {UserBalance} from "./types/user-balance-model";
import {fetchTokenMetadata} from "./fetch-token-metadata";

/**
 * Fetch a balance for a given user inside a given contract
 *
 * @param contractId Contract id to fetch the balance from
 * @param userAddress User address to fetch the balance for
 */
export const fetchBalanceByUserAddress = async (contractId: string, userAddress: string): Promise<UserBalance | undefined> => {
    const [balances, contractMetadata] = await fetchBalancesInContract(contractId);
    const tokenMetadata = await fetchTokenMetadata(contractId);
    const stateKeys = Object.keys(contractMetadata);

    if(stateKeys.length <= 0) {
        return undefined;
    }

    console.warn(`fetchBalanceByUserAddress does not return 'username'`);

    // @ts-ignore
    return {
        name: contractMetadata.name,
        ticker: contractMetadata.ticker,
        logo: contractMetadata?.settings?.communityLogo,
        balance: balances[userAddress] || 0,
        contractId,
        userAddress,
        type: tokenMetadata?.type
    };
}
