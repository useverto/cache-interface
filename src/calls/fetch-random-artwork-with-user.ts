import {fetchRandomArtwork} from "./fetch-random-artwork";
import {fetchContract} from "./fetch-contract";
import {fetchUserByUsername} from "./fetch-user-by-username";
import {CommunityContractPeople} from "./types/community-contract-state";

interface ArtworkOwner {
    id: string,
    name: string,
    type: string,
    images: Array<any>,
    owner: CommunityContractPeople
}

export const fetchRandomArtworkWithUser = async (amount?: number): Promise<Array<ArtworkOwner>> => {
    const artwork = (await fetchRandomArtwork(amount || 4))?.entities || [];
    const result: Array<ArtworkOwner> = [];

    for (let artworkElement of artwork) {
        const artworkId = artworkElement.contractId;
        const artworkState = (await fetchContract(artworkId))?.state;
        if(artworkState) {
            const owner = await fetchUserByUsername(artworkElement.lister);
            if(owner) {
                result.push({
                    id: artworkId,
                    name: artworkState.name,
                    type: artworkElement.type,
                    images: (artworkElement.type === "collection" && artworkState?.items?.slice(0, 3)) || [],
                    owner
                });
            }
        }
    }

    return result;
}
