import axios from "axios";
import {CacheInterfaceConstants} from "../constants";

/**
 * Executes a GET request to the cache API server
 * @param subUrl
 * @param doThrow throw error if request fails
 * @param post whether it's a post request
 */
export const cacheApiBaseRequest = async<T= any>(subUrl: string, doThrow?: boolean, post?: boolean) => {
    try {
        return await axios[post ? "post" : "get"]<T>(`${CacheInterfaceConstants.CACHE_API}/${subUrl}`);
    } catch (e) {
        if(doThrow) {
            throw e;
        }
        return undefined;
    }
}
