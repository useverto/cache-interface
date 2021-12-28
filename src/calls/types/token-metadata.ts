export interface TokenMetadata {
    contractId: string;
    type: string;
    lister: string;
    id?: string;
}

export interface TokenMetadataLookUp {
    entities: Array<TokenMetadata>;
    resultsStatus: string;
}
