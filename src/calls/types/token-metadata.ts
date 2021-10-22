export interface TokenMetadata {
    contractId: string;
    type: string;
    lister: string;
}

export interface RandomArtworkResult {
    entities: Array<TokenMetadata>;
    resultsStatus: string;
}
