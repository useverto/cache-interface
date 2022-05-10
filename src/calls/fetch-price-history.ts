import axios from "axios";
import {CommonUtils} from "../utils";
import {VwapModel} from "./types/vwap-model";

export const fetchPriceHistory = async (pair: [string, string], desc?: boolean): Promise<Array<VwapModel>> => {
    try {
        let vwaps: Array<VwapModel> | undefined = ((await axios.get(CommonUtils.buildVwapCdn(pair))).data) as any;
        if((vwaps || []).length > 0) {
            if(desc) {
                vwaps = vwaps?.sort((a,b) => b.block - a.block);
            }
            return vwaps!;
        }
    } catch(e) {
        console.error(e);
    }
    return [];
}
