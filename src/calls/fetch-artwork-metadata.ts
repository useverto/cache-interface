import {fetchTokenMetadata} from "./fetch-token-metadata";
import {fetchUserByUsername} from "./fetch-user-by-username";
import { fetchContract } from "./fetch-contract";
import {CollectionState} from "./types/collection-state";
import {ArtworkMetadata} from "./types/artwork-metadata";

/**
 * Fetches the metadata for a given artwork
 * @param tokenId
 */
export const fetchArtworkMetadata = async (tokenId: string): Promise<ArtworkMetadata | undefined > => {
    const fetchMetadata = await fetchTokenMetadata(tokenId, true);
    if(!fetchMetadata || fetchMetadata.type.toLowerCase() !== "art") { return undefined; }

    const fetchLister = await fetchUserByUsername(fetchMetadata.lister);
    if(!fetchLister) { return undefined; }

    const tokenContract = await fetchContract<CollectionState>(fetchMetadata.id!, false, true);
    if(!tokenContract) { return undefined; }

    return {
        id: tokenId,
        name: tokenContract.state.name,
        lister: fetchLister
    };
}
