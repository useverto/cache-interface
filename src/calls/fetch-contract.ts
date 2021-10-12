import {CommonUtils} from "../utils/common-utils";
import axios from "axios";
import {StateResult} from "../model";
import {CacheInterfaceException} from "../errors/cache-interface-exception";

export const fetchContract = async <T = any>(contractId: string, withValidity?: boolean): Promise<StateResult<T>> => {
    try {
        const stateCdn = CommonUtils.buildStateCdn(contractId);
        const state = (await axios.get(stateCdn)).data as any;
        const validity = withValidity ? (await axios.get(CommonUtils.buildValidityCdn(contractId))).data : undefined;
        return {
            state,
            validity
        }
    } catch (e) {
        throw new CacheInterfaceException(`Contract ${contractId} could not be fetched at this time.`, e);
    }
}
