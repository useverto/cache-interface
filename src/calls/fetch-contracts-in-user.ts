import {cacheApiBaseRequest} from "./cache-api-base-request";

/**
 * Fetches all the contracts that a certain address has a relation with
 * @param addressId
 */
export const fetchContractsInUser = async (addressId: string) => {
    return (await cacheApiBaseRequest<Array<string>>(`users/contracts/${addressId}`))?.data || [];
}
