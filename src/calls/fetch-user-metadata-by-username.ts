import {cacheApiBaseRequest} from "./cache-api-base-request";
import {UserMetadata} from "./types/user-metadata";

export const fetchUserMetadataByUsername = async (username: string) => {
    return (await cacheApiBaseRequest<UserMetadata>(`users/metadata/${username}`))?.data;
}
