import {VwapModel} from "./types/vwap-model";
import {cacheApiBaseRequest} from "./cache-api-base-request";

export const fetchLatestPrice = async (pair: [string, string]): Promise<VwapModel | undefined> => {
    return (await cacheApiBaseRequest<VwapModel>(`token/price/${pair.join(",")}`))?.data || undefined;
}
