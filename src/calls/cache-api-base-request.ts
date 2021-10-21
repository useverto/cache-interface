import axios from "axios";
import {CacheInterfaceConstants} from "../constants";

/**
 * Executes a GET request to the cache API server
 * @param subUrl
 * @param doThrow throw error if request fails
 */
export const cacheApiBaseRequest = async<T= any>(subUrl: string, doThrow?: boolean) => {
    try {
        return await axios.get<T>(`${CacheInterfaceConstants.CACHE_API}/${subUrl}`);
    } catch (e) {
        if(doThrow) {
            throw e;
        }
        return undefined;
    }
}
