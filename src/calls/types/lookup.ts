import {TokenMetadata} from "./token-metadata";

export interface LookUp<T = any> {
    entities: Array<T>;
    resultsStatus: string;
}
