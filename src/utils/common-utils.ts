import {CacheInterfaceConstants} from "../constants";

export class CommonUtils {

    static buildStateCdn(contractId: string): string {
        return `${CacheInterfaceConstants.CONTRACT_CDN}/${contractId}/${contractId}_state.json`;
    }

    static buildValidityCdn(contractId: string): string {
        return `${CacheInterfaceConstants.CONTRACT_CDN}/${contractId}/${contractId}_validity.json`;
    }
}
