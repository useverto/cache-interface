import {cacheApiBaseRequest} from "./cache-api-base-request";

/**
 * Fetches all the creations (art) of a given user
 * @param username String username of the user to look up creations for
 */
export const fetchUserCreations = async (username: string) => {
    return (await cacheApiBaseRequest<Array<string>>(`users/creations/${username}`))?.data || [];
}
