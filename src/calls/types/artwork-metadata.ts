import {CommunityContractPeople} from "./community-contract-state";

export interface ArtworkMetadata {
    id: string;
    name: string;
    lister: CommunityContractPeople;
}
