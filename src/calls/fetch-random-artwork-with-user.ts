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

export const fetchRandomArtworkWithUser = async (amount?: number): Promise<ArtworkOwner | undefined> => {
    const artwork = (await fetchRandomArtwork(amount || 1))?.entities?.[0];

    if (artwork) {
        const artworkId = artwork.contractId;
        const artworkState = (await fetchContract(artworkId))?.state;
        if(artworkState) {
            const owner = await fetchUserByUsername(artwork.lister);
            if(owner) {
                return {
                    id: artworkId,
                    name: artworkState.name,
                    type: artwork.type,
                    images: (artwork.type === "collection" && artworkState.items.slice(0, 3)) || [],
                    owner
                }
            }
        }
    }

}
