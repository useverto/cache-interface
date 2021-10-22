import {CommonUtils} from "../utils/common-utils";
import axios from "axios";
import {StateResult} from "../model";
import {CacheInterfaceException} from "../errors/cache-interface-exception";

/**
 * Fetchs a contract based on a contract id.
 * @param contractId Contract ID to be fetched
 * @param withValidity Whether Validity should be fetched
 * @param dontThrow Whether an exception should be thrown if contract is not found
 */
export const fetchContract = async <T = any>(contractId: string, withValidity?: boolean, dontThrow?: boolean): Promise<StateResult<T> | undefined> => {
    try {
        const stateCdn = CommonUtils.buildStateCdn(contractId);
        const state = (await axios.get(stateCdn)).data as any;
        const validity = withValidity ? (await axios.get(CommonUtils.buildValidityCdn(contractId))).data : undefined;
        return {
            state,
            validity
        }
    } catch (e) {

        if(dontThrow) {
            return undefined;
        }

        throw new CacheInterfaceException(`Contract ${contractId} could not be fetched at this time.`, e);
    }
}
