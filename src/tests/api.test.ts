import {fetchContract} from "../calls/fetch-contract";
import {fetchUsers} from "../calls/fetch-users";
import {fetchUserMetadataByUsername} from "../calls/fetch-user-metadata-by-username";
import {fetchUserCreations} from "../calls/fetch-user-creations";
import {fetchTokens} from "../calls/fetch-tokens";
import {fetchTokenMetadata} from "../calls/fetch-token-metadata";
import {fetchRandomArtwork} from "../calls/fetch-random-artwork";
import {fetchOwnershipByUsername} from "../calls/fetch-ownership-by-username";
import {fetchContractsInUser} from "../calls/fetch-contracts-in-user";
import {fetchCollectionById} from "../calls/fetch-collection-by-id";
import {fetchBalancesInContract} from "../calls/fetch-balances-in-contract";
import {fetchBalancesForAddress} from "../calls/fetch-balances-for-address";
import {fetchTokenStateMetadata} from "../calls/fetch-token-state-metadata";
import {fetchBalancesByUsername} from "../calls/fetch-balance-by-username";
import {fetchRandomArtworkWithUser} from "../calls/fetch-random-artwork-with-user";
import {fetchArtworkMetadata} from "../calls/fetch-artwork-metadata";
import {fetchRandomCommunitiesWithMetadata} from "../calls/fetch-random-communities-with-metadata";
import {fetchTopCommunities} from "../calls/fetch-top-communities";
import {fetchPaginated} from "../calls/fetch-paginated";

describe("API test", () => {
    test("Fetch Contract", async () => {
        const state = await fetchContract("t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE");
        expect(state?.state).toBeDefined();
        const people = state?.state?.people;
        const tokens = state?.state?.tokens;
        expect(people).toBeDefined();
        expect(tokens).toBeDefined();
        expect(people?.length).toBeGreaterThan(0);
        expect(tokens?.length).toBeGreaterThan(0);
    });

    test("Fetch Contract With Validity", async () => {
        const state = await fetchContract("t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE", true);
        const validity = state?.validity && Object.keys(state?.validity);
        expect(validity).toBeDefined();
        expect(validity?.length).toBeGreaterThan(1);
    });

    test("throw if invalid contract id", async () => {
        (await expect(async () => await fetchContract("x", false, false)).rejects).toThrow();
    });

    test("do not throw if invalid contract id", async () => {
        const data = await fetchContract("x", false, true);
        expect(data).toBe(undefined);
    });

    test("Fetch users", async () => {
        const users = await fetchUsers();
        const allUsers = users.every((item) => item.username != undefined && item.addresses.length > 0)
        expect(allUsers).toBeTruthy();
    });

    test("Fetch user metadata by username", async () => {
        const metadata = await fetchUserMetadataByUsername('px');
        expect(metadata).toStrictEqual({
            "addresses": [
                "STdoQcDVftwCrUN_oTsOSClFgG-PoQCRkYmHVgrGkBA"
            ],
            "username": "px"
        });
    });

    test("Fetch user creations", async () => {
        const creations = await fetchUserCreations('px');
        expect(creations?.length).toBeGreaterThanOrEqual(19)
    });

    test("Fetch all tokens", async () => {
        const tokens = await fetchTokens();
        expect(tokens?.length).toBeGreaterThanOrEqual(164)
    });

    test("Fetch art tokens", async () => {
        const tokens = await fetchTokens('art');
        const allTokens = await fetchTokens();
        expect(tokens?.length).toBeGreaterThanOrEqual(141)
        expect(tokens?.length).toBeLessThan(allTokens?.length)
    });

    test("Fetch token metadata", async () => {
        const token = await fetchTokenMetadata('bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY');
        expect(token?.lister).toBe('t8');
    });

    test("Fetch random artwork", async () => {
        const tokens = await fetchRandomArtwork();
        const allUsername = tokens?.entities?.every((item) => item.lister != undefined);
        expect(allUsername).toBeTruthy();
        expect(tokens?.entities?.length).toBe(4);
    });

    test("Fetch ownership by username", async () => {
        const tokens = await fetchOwnershipByUsername('shen');
        expect(tokens.some((item) => item === "tgDclUrJ-GN9kx7fTBVKXG7tCAhB2ZkS0Uc4nGsLMLY")).toBeTruthy();
    });

    test("Fetch ownership by address", async () => {
        const tokens = await fetchContractsInUser('6LL7EU-CIVLSIYajnFelAQi6Uefv4lqrZBcv9bNwxFI');
        expect(tokens?.some((item) => item === "bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY")).toBeTruthy();
    });

    test("Fetch collection by id", async () => {
        const collection = await fetchCollectionById('GirFtyB_PI4oQXhEFrHZLpFUqincHrDdDxPaQ1M8r00');
        expect(collection?.name).toBe('Bark Blocks Series 1: Paperbark');
    });

    test("Fetch balances in contract", async () => {
        const balances = await fetchBalancesInContract('bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY');
        expect(balances?.length).toBeGreaterThanOrEqual(2);
    });

    test("Fetch balances for user address", async () => {
        const balances = await fetchBalancesForAddress('6LL7EU-CIVLSIYajnFelAQi6Uefv4lqrZBcv9bNwxFI');
        const hasArconf = balances.some((item) => item.name === 'ArCoNFT-01 Edition 100' && item.balance >= 1);
        expect(hasArconf).toBeTruthy();
    });

    test("Fetch balances for user address with filter type", async () => {
        const balances = await fetchBalancesForAddress('6LL7EU-CIVLSIYajnFelAQi6Uefv4lqrZBcv9bNwxFI', 'art');
        const hasArconf = balances.some((item) => item.name === 'ArCoNFT-01 Edition 100' && item.balance >= 1);
        expect(hasArconf).toBeTruthy();
    });

    test("Fetch balances given a username", async () => {
       const balances = await fetchBalancesByUsername('t8')
       const hasArVerify = balances?.some((item) => item.contractId === 'f6lW-sKxsc340p8eBBL2i_fnmSI_fRSFmkqvzqyUsRs');
       expect(hasArVerify).toBeTruthy();
    });

    test("Fetch artwork", async () => {
        const tokenArtwork = await fetchTokenStateMetadata('bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY');
        expect(tokenArtwork).toStrictEqual({
            id: 'bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY',
            name: 'ArCoNFT-01 Edition 100',
            ticker: 'ARCONFT100',
            owner: 't8'
        });
    });

    test("Fetch random artwork with user", async () => {
        const tokenArtwork = await fetchRandomArtworkWithUser();
        expect(tokenArtwork.length).toBeGreaterThanOrEqual(4);
        expect(tokenArtwork[0]!.id).not.toBeUndefined();
        expect(tokenArtwork[0]!.name).not.toBeUndefined();
        if(tokenArtwork[0]!.type === "collection") {
            expect(tokenArtwork[0]!.images).not.toBeUndefined();
            expect(tokenArtwork[0]!.images.length).toBeGreaterThanOrEqual(1);
        }
        expect(tokenArtwork[0]!.owner.username).not.toBeUndefined();
    });

    test("Fetch artwork metadata", async () => {
        const artworkMetadata = await fetchArtworkMetadata("oanaZYYB7DmWFPb2fFOxSJA1Xy7ffu1msId2Ii7olqM");
        expect(artworkMetadata).toStrictEqual({"id":"oanaZYYB7DmWFPb2fFOxSJA1Xy7ffu1msId2Ii7olqM","name":"ArCoNFT-01 Edition 43","lister":{"username":"t8","name":"Tate Berenbaum","addresses":["pvPWBZ8A5HLpGSEfhEmK1A3PfMgB_an8vVS6L14Hsls"],"bio":"Founder of Verto","links":{"twitter":"TateBerenbaum","github":"t8"},"image":"UGu1pI3ObS3wzdQ_GZwOr0DoWShTj4EPFgyHfDaHFgI"}});
    })

    test("Fetch community metadata", async () => {
        const communities = await fetchRandomCommunitiesWithMetadata();
        expect(communities.length).toBeGreaterThanOrEqual(4);
        expect(communities[0].id).not.toBeUndefined();
        expect(communities[0].name).not.toBeUndefined();
        expect(communities[0].ticker).not.toBeUndefined();
    })

    test("Fetch top communities", async () => {
        const topComs = await fetchTopCommunities();
        expect(topComs.length).toBeGreaterThanOrEqual(4);
        expect(topComs[0].id).not.toBeUndefined();
        expect(topComs[0].name).not.toBeUndefined();
        expect(topComs[0].ticker).not.toBeUndefined();
    });

    jest.setTimeout(10000);
    test("Fetch paginated tokens", async () => {
       const tokens = await fetchPaginated("tokens", 2, 1);
       expect(tokens.items).toEqual([
               {
                   id: 'bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY',
                   ticker: 'ARCONFT100',
                   name: 'ArCoNFT-01 Edition 100',
                   type: 'art',
                   lister: {
                       "username": "t8",
                       "name": "Tate Berenbaum",
                       "addresses": [
                           "pvPWBZ8A5HLpGSEfhEmK1A3PfMgB_an8vVS6L14Hsls"
                       ],
                       "bio": "Founder of Verto",
                       "links": {
                           "twitter": "TateBerenbaum",
                           "github": "t8"
                       },
                       "image": "UGu1pI3ObS3wzdQ_GZwOr0DoWShTj4EPFgyHfDaHFgI"
                   }
               },
               {
                   id: 'I_aAD4xbx2L_DUlC6mp_WOJ8buASDxbg3_9MMTyKTro',
                   ticker: 'ARCONFT97',
                   name: 'ArCoNFT-01 Edition 97',
                   type: 'art',
                   lister: {
                       "username": "t8",
                       "name": "Tate Berenbaum",
                       "addresses": [
                           "pvPWBZ8A5HLpGSEfhEmK1A3PfMgB_an8vVS6L14Hsls"
                       ],
                       "bio": "Founder of Verto",
                       "links": {
                           "twitter": "TateBerenbaum",
                           "github": "t8"
                       },
                       "image": "UGu1pI3ObS3wzdQ_GZwOr0DoWShTj4EPFgyHfDaHFgI"
                   }
               }
           ]);
       expect(tokens.hasNextPage()).toBeTruthy();
       expect(tokens.isEmpty()).toBeFalsy();
       expect((await tokens.nextPage()).items).toEqual([
           {
               "id": "PMakDnBkOM538HrpL4mgx66cau__-LqN-yWYEyfbQVo",
               "ticker": "ARCONFT99",
               "name": "ArCoNFT-01 Edition 99",
               "type": "art",
               "lister": {
                   "username": "t8",
                   "name": "Tate Berenbaum",
                   "addresses": [
                       "pvPWBZ8A5HLpGSEfhEmK1A3PfMgB_an8vVS6L14Hsls"
                   ],
                   "bio": "Founder of Verto",
                   "links": {
                       "twitter": "TateBerenbaum",
                       "github": "t8"
                   },
                   "image": "UGu1pI3ObS3wzdQ_GZwOr0DoWShTj4EPFgyHfDaHFgI"
               }
           },
           {
               "id": "U0zMScFjmVWwc-KRZbGNhUo5ZtkIq2fM6zTQT_6PtsI",
               "ticker": "ARCONFT98",
               "name": "ArCoNFT-01 Edition 98",
               "type": "art",
               "lister": {
                   "username": "t8",
                   "name": "Tate Berenbaum",
                   "addresses": [
                       "pvPWBZ8A5HLpGSEfhEmK1A3PfMgB_an8vVS6L14Hsls"
                   ],
                   "bio": "Founder of Verto",
                   "links": {
                       "twitter": "TateBerenbaum",
                       "github": "t8"
                   },
                   "image": "UGu1pI3ObS3wzdQ_GZwOr0DoWShTj4EPFgyHfDaHFgI"
               }
           }
       ]);
    });
});


