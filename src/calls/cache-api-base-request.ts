import axios from "axios";
import {CacheInterfaceConstants} from "../constants";

/**
 * Executes a GET request to the cache API server
 * @param subUrl
 */
export const cacheApiBaseRequest = async<T= any>(subUrl: string) => {
    try {
        return await axios.get<T>(`${CacheInterfaceConstants.CACHE_API}/${subUrl}`);
    } catch (e) {
        return undefined;
    }
}
