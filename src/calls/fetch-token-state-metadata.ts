import {fetchTokenMetadata} from "./fetch-token-metadata";
import {fetchContract} from "./fetch-contract";
import {CommonTokenState} from "./types/common-token-state";

/**
 * Fetch the state metadata such as name, and ticker. Including the contract id with the owner
 * @param artworkId
 */
export const fetchTokenStateMetadata = async (tokenId: string) => {
    const artworkMetadata = await fetchTokenMetadata(tokenId);
    
    if(artworkMetadata) {
        const contractState = await fetchContract<CommonTokenState>(tokenId);
        const contractStateData = contractState?.state;
        if(contractStateData) {
            return {
                id: tokenId,
                name: contractStateData.name,
                owner: artworkMetadata.lister,
                ticker: contractStateData.ticker
            }
        }
    }

    return undefined;
}
