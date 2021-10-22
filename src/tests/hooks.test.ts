import * as cacheContractsModule from "../calls/cache-contract";
import {cacheContractHook} from "../hooks/cache-contract-hook";
import {CacheInterfaceConstants} from "../constants";

describe('Test hooks', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Cache contract hook', async () => {
        const spy = jest.spyOn(cacheContractsModule, 'cacheContract');
        spy.mockImplementation();
        const fn = jest.fn();
        await cacheContractHook(fn, 'NONE', false);
        expect(fn).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('NONE');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Cache contract hook', async () => {
        const spy = jest.spyOn(cacheContractsModule, 'cacheContract');
        spy.mockImplementation();
        const fn = jest.fn();
        await cacheContractHook(fn, 'ABC', true);
        expect(fn).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('ABC');
        expect(spy).toHaveBeenCalledWith(CacheInterfaceConstants.COMMUNITY_CONTRACT);
        expect(spy).toHaveBeenCalledTimes(2);
    });
})
