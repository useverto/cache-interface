import {LookUp} from "./lookup";
import {CommunityContractPeople} from "./community-contract-state";

export interface TokenMetadata {
    contractId: string;
    type: string;
    lister: string;
    id?: string;
}

export interface PaginatedToken {
    id: string,
    ticker: string,
    name: string,
    type:  "art" | "community" | "collection" | "custom",
    logo?: string,
    items?: string[],
    lister: CommunityContractPeople
}

export interface TokenMetadataLookUp extends LookUp<TokenMetadata> {
}
