import {fetchTokens} from "./fetch-tokens";
import {fetchContract} from "./fetch-contract";
import {CollectionResult, CollectionState} from "./types/collection-state";

/**
 * Returns a collection given an id
 * @param collectionId Id of the collection to look up.
 */
export const fetchCollectionById = async (collectionId: string): Promise<CollectionResult | undefined> => {
    const communityTokens = await fetchTokens('collection');
    const collection = communityTokens.find((item) => item.id === collectionId);

    if(collection) {
        const collectionState = await fetchContract<CollectionState>(collectionId, false, true);
        const collectionStateData = collectionState?.state;
        if(collectionStateData) {
            return {
                id: collectionId,
                name: collectionStateData.name,
                description: collectionStateData.description,
                owner: collection.lister,
                collaborators: collectionStateData.collaborators,
                items: collectionStateData.items
            }
        }
    }

    return undefined;
}
