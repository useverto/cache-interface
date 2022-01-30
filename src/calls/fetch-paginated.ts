import {cacheApiBaseRequest} from "./cache-api-base-request";
import {PaginationResult} from "verto-internals/services/miscellaneous";
import {CommunityPeople} from "verto-internals/interfaces/contracts";
import {PaginatedToken} from "./types/token-metadata";

export const fetchPaginated = async (type: "people" | "tokens", pageSize: number = 50, page: number = 1) => {
    const data = (await cacheApiBaseRequest<PaginationResult>(`token/paginate?type=${type}&size=${pageSize}&page=${page}`))?.data;
    const paginationInfo = data?.paginationInfo || {
        page: 0,
        pageSize: 0,
        maxPages: 0,
        found: 0,
        count: 0
    };

    let results: Array<PaginatedToken | CommunityPeople> = data?.items || [];

    return {
        items: results,
        hasNextPage: () => paginationInfo.maxPages >  paginationInfo.page,
        nextPage: () => {
            return fetchPaginated(type, pageSize, page + 1)
        },
        isEmpty: () => paginationInfo.found === 0,
        getPaginationInfo: () => paginationInfo
    };
}
