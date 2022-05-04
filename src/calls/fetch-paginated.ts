import {cacheApiBaseRequest} from "./cache-api-base-request";
import {PaginationResult} from "verto-internals/services/miscellaneous";
import {CommunityPeople} from "verto-internals/interfaces/contracts";
import {PaginatedToken} from "./types/token-metadata";
import {PaginatedData} from "verto-internals/services/miscellaneous/models";

export const fetchPaginated = async<T extends PaginatedToken | CommunityPeople>(type: "people" | "tokens", pageSize: number = 50, page: number = 1, sort = false): Promise<PaginatedData<T>> => {
    const data = (await cacheApiBaseRequest<PaginationResult>(`token/paginate?type=${type}&size=${pageSize}&page=${page}${sort ? '&sort=true' : ''}`))?.data;
    const paginationInfo = data?.paginationInfo || {
        page: 0,
        pageSize: 0,
        maxPages: 0,
        found: 0,
        count: 0
    };

    let results: Array<T> = data?.items || [];

    return {
        items: results,
        hasNextPage: () => paginationInfo.maxPages >  paginationInfo.page,
        nextPage: () => {
            return fetchPaginated(type, pageSize, page + 1, sort)
        },
        isEmpty: () => paginationInfo.found === 0,
        getPaginationInfo: () => paginationInfo
    };
}
