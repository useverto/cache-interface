import {fetchContract} from "./fetch-contract";
import {BalanceType, CommonTokenState} from "./types/common-token-state";

export type BalanceAndContract = [BalanceType, Partial<CommonTokenState>]

/**
 * Fetches all the balances for the given contract id
 * @param contractId Contract id to fetch the balances from
 */
export const fetchBalancesInContract = async (contractId: string): Promise<BalanceAndContract> => {
    const contractState = await fetchContract<Partial<CommonTokenState>>(contractId);
    return [contractState?.state?.balances || {}, contractState?.state || {}];
}
