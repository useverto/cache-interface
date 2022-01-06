import {LookUp} from "./lookup";

export interface TokenMetadata {
    contractId: string;
    type: string;
    lister: string;
    id?: string;
}

export interface TokenMetadataLookUp extends LookUp<TokenMetadata> {
}
