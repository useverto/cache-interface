import {cacheContract} from "../calls/cache-contract";
import {CacheInterfaceConstants} from "../constants";

type CacheContractHookType = <T>(action: (() => Promise<T>) | (() => T), contractId?: string | string[], refreshCommunityContract?: boolean) => Promise<T>;

/**
 * This functions caches an specific contract id and refreshes the community contract (if asked) after {@param action} has succeeded its execution
 * @param action
 * @param contractId
 * @param refreshCommunityContract
 * @return the result of the call for {@param action}
 */
export const cacheContractHook: CacheContractHookType = async (action, contractId, refreshCommunityContract) => {
    let response = await action();
    if(contractId) {
        let ids: Array<string> = [];

        if(!Array.isArray(contractId)) {
            ids = [contractId];
        } else {
            ids = [...contractId];
        }

        for (let id of ids) {
            await cacheContract(id);
        }
    }
    if(refreshCommunityContract) {
        await cacheContract(CacheInterfaceConstants.COMMUNITY_CONTRACT);
    }

    return response;
}
