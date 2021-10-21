import {cacheApiBaseRequest} from "./cache-api-base-request";

export const cacheContract = async (contractId: string) => {
    return cacheApiBaseRequest(`contracts/save/${contractId}`);
}
