import {fetchTokenMetadata} from "./fetch-token-metadata";
import {fetchContract} from "./fetch-contract";
import {CommonTokenState} from "./types/common-token-state";

export const fetchArtwork = async (artworkId: string) => {
    const artworkMetadata = await fetchTokenMetadata(artworkId);
    
    if(artworkMetadata) {
        const contractState = await fetchContract<CommonTokenState>(artworkId);
        const contractStateData = contractState?.state;
        if(contractStateData) {
            return {
                id: artworkId,
                name: contractStateData.name,
                owner: artworkMetadata.lister
            }
        }
    }

    return undefined;
}
