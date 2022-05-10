<p align="center">
  <a href="https://verto.exchange">
    <img src="https://www.verto.exchange/logo_light.svg" alt="Verto logo (dark version)" width="110">
  </a>

<h3 align="center">Verto Cache Interface</h3>

  <p align="center">
    A communication package with Verto Cache System
  </p>
</p>

## Install

Install with [npm](https://npmjs.com):

```
$ npm install verto-cache-interface
```

## Usage

### Fetching a contract

**Signature**:  
`fetchContract<T = any>(contractId: string, withValidity?: boolean, dontThrow?: boolean): Promise<StateResult<T> | undefined>`

**Parameters**:  
_T_: Interface of the contract state to be returned  
_contractId_: Contract to be fetched  
_withValidity_: Whether validity should be fetched (Default: false)  
_dontThrow_: Whether it should not throw an error if contract is not found (Default: false)

**Usage**:

```typescript
import { fetchContract } from "verto-cache-interface";

fetchContract("t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE").then((result) => {
  const state = result.state;
  const validity = result.validity;
});
```

### Fetching a balance of address in contract

**Signature**:  
`fetchBalanceByUserAddress = async (contractId: string, userAddress: string): Promise<UserBalance | undefined>`

**Parameters**:
_contractId_: Contract to be fetched
_userAddress_: Address to obtain balance from

**Usage**:

```typescript
import { fetchBalanceByUserAddress } from "verto-cache-interface";

fetchBalanceByUserAddress(
  "bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY",
  "vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU"
).then((result) => {
  const contractId = result.contractId;
  const contractName = result.name;
  const contractTicker = result.ticker;
  const contractLogo = result.logo;
  const userBalance = result.balance;
  const userAddress = result.userAddress;
  const contractType = result.type;
});
```

### Fetching all the balances available for a given address

**Signature**:  
`fetchBalancesForAddress = async (userAddress: string, tokenType?: string): Promise<Array<UserBalance>>`

**Parameters**:
_userAddress_: Address to obtain balance from
_tokenType_: Type to filter balances from, for example: 'art'.

**Usage**:

```typescript
import { fetchBalancesForAddress } from "verto-cache-interface";

fetchBalancesForAddress("vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU").then(
  (result) => {
    const balances: Array<UserBalance> = result;
  }
);
```

### Fetching all the balances for a given username

**Signature**:  
`fetchBalancesByUsername = async (username: string, tokenType?: string): Promise<Array<UserBalance> | undefined>`

**Parameters**:
_username_: Username to fetch balances from.
_tokenType_: Type to filter balances from, for example: 'art'.

**Usage**:

```typescript
import { fetchBalancesByUsername } from "verto-cache-interface";

fetchBalancesByUsername("t8").then((result) => {
  const balances: Array<UserBalance> = result;
  balances.forEach((balance) => {
    console.log("Contract Id ", balance.contractId);
    console.log("Balance ", balance.balance);
  });
});
```

### Fetching all the balances inside a contract

**Signature**:  
`fetchBalancesInContract = async (contractId: string): Promise<BalanceAndContract>`

**Parameters**:
_contractId_: Contract to be fetched

**Usage**:

```typescript
import { fetchBalancesInContract } from "verto-cache-interface";

fetchBalancesInContract("bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY").then(
  (result) => {
    const balances: BalanceAndContract = result;
    const [balancesObject, contractMetadata] = balances;

    const balanceForAddress =
      balancesObject["vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU"];
    const contractTicker = contractMetadata.ticker;
  }
);
```

### Fetching a single collection by collection id

**Signature**:  
`fetchCollectionById = async (collectionId: string): Promise<CollectionResult | undefined>`

**Parameters**:
_collectionId_: Collection (contract) to be fetched

**Usage**:

```typescript
import { fetchCollectionById } from "verto-cache-interface";

fetchCollectionById("GirFtyB_PI4oQXhEFrHZLpFUqincHrDdDxPaQ1M8r00").then(
  (result) => {
    const id = result.id;
    const collectionName = result.name;
    const description = result.description;
    const owner = result.owner;
    const collaborators = result.collaborators;
    const items = result.items;
  }
);
```

### Fetching all contracts an address is part of

**Signature**:  
`fetchContractsInUser = async (addressId: string): Promise<Array<string>>`

**Parameters**:
_addressId_: Address to obtain related-contracts from

**Usage**:

```typescript
import { fetchContractsInUser } from "verto-cache-interface";

fetchContractsInUser("vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU").then(
  (result) => {
    // Contract Ids
    const relatedContractsToUser: Array<string> = result;
  }
);
```

### Fetching all tokens created by a user given a username

**Signature**:  
`fetchOwnershipByUsername = async (username: string): Promise<Array<string>>`

**Parameters**:
_username_: Username to fetch ownership from

**Usage**:

```typescript
import { fetchOwnershipByUsername } from "verto-cache-interface";

fetchOwnershipByUsername("t8").then((result) => {
  // Contract Ids
  const tokensCreatedByUser: Array<string> = result;
});
```

### Fetching Token Metadata

**Signature**:  
`fetchTokenMetadata = async (tokenId: string, fromContract?: boolean): Promise<TokenMetadata | undefined>`

**Parameters**:
_tokenId_: Token (contract) id to fetch metadata from
_fromContract_: Whether it should be fetched from the Google CDN or Verto Database (Default: False)

**Usage**:

```typescript
import { fetchTokenMetadata } from "verto-cache-interface";

fetchTokenMetadata("bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY").then(
  (result) => {
    const id = result.id;
    const type = result.type;
    const listerUsername = result.lister;
  }
);
```

### Fetching Token State Metadata

**Signature**:  
`fetchTokenStateMetadata = async (tokenId: string): Promise<TokenStateMetadata | undefined>`

**Parameters**:
_tokenId_: Token (contract) id to fetch metadata from

**Usage**:

```typescript
import { fetchTokenStateMetadata } from "verto-cache-interface";

fetchTokenStateMetadata("bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY").then(
  (result) => {
    const id = result.id;
    const tokenName = result.name;
    const owner = result.owner;
    const ticker = result.ticker;
  }
);
```

### Fetching all registered tokens

**Signature**:  
`fetchTokens = async (specificType?: string): Promise<Array<TokenMetadata>>`

**Parameters**:
_specificType_: Whether to filter tokens with a specific type

**Usage**:

```typescript
import { fetchTokens } from "verto-cache-interface";

fetchTokens().then((result) => {
  const allTokens: Array<TokenMetadata> = result;
  allTokens.forEach((item) => {
    console.log("Id ", item.id);
    console.log("Type ", item.type);
    console.log("Lister ", item.lister);
  });
});
```

### Fetching random artwork

**Signature**:  
`fetchRandomArtwork = async (limit: number = 4): Promise<RandomArtworkResult>`

**Parameters**:
_limit_: Maximum number of artwork to be fetched (Default: 4)

**Usage**:

```typescript
import { fetchRandomArtwork } from "verto-cache-interface";

fetchRandomArtwork().then((result) => {
  const artwork: Array<TokenMetadata> = result.entities;

  artwork.forEach((item) => {
    console.log("Lister", item.lister);
    console.log("Type", item.type);
    console.log("Contract ID", item.contractId);
  });
});
```

### Fetching all creations (art) given a username

**Signature**:  
`fetchUserCreations = async (username: string): Promise<Array<string>>`

**Parameters**:
_username_: Username to fetch creations from

**Usage**:

```typescript
import { fetchUserCreations } from "verto-cache-interface";

fetchUserCreations("t8").then((result) => {
  // Contract Ids
  const creations: Array<string> = result;
});
```

### Fetching user metadata given a username

**Signature**:  
`fetchUserMetadataByUsername = async (username: string): Promise<UserMetadata | undefined>`

**Parameters**:
_username_: Username to fetch metadata from

**Usage**:

```typescript
import { fetchUserMetadataByUsername } from "verto-cache-interface";

fetchUserMetadataByUsername("t8").then((result) => {
  const username = result.username;
  const addresses: Array<string> = result.addresses;
});
```

### Fetching all registered users

**Signature**:  
`fetchUsers = async (): Promise<Array<CommunityContractPeople>>`

**Usage**:

```typescript
import { fetchUsers } from "verto-cache-interface";

fetchUsers().then((result) => {
  result.forEach((user) => {
    console.log("Username ", user.username);
    console.log("Name ", user.name);
    console.log("Addresses ", user.addresses);
    console.log("Image ", user.image);
    console.log("Bio ", user.bio);
    console.log("Links ", user.links);
  });
});
```

### Fetching user by username

**Signature**:  
`fetchUserByUsername = async (): Promise<CommunityContractPeople | undefined>`

**Usage**:

```typescript
import { fetchUserByUsername } from "verto-cache-interface";

fetchUserByUsername("t8").then((result) => {
  console.log("Username ", user.username);
  console.log("Name ", user.name);
  console.log("Addresses ", user.addresses);
  console.log("Image ", user.image);
  console.log("Bio ", user.bio);
  console.log("Links ", user.links);
});
```

### Fetching random artwork with owner information

**Signature**:  
`fetchRandomArtworkWithUser = async (amount?: number): Promise<Array<ArtworkOwner>>`

**Usage**:

```typescript
import { fetchRandomArtworkWithUser } from "verto-cache-interface";

fetchRandomArtworkWithUser().then((arts) => {
  arts.forEach((result) => {
    console.log("Artwork ID ", result.id);
    console.log("Name ", result.name);
    console.log("Type ", result.type);
    console.log("Images ", result.images);
    console.log("Owner username ", result.owner.username);
  });
});
```

### Fetching random communities without full metadata

**Signature**:  
`fetchRandomCommunities = async (): Promise<TokenMetadataLookUp>`

**Usage**:

```typescript
import { fetchRandomCommunities } from "verto-cache-interface";

fetchRandomCommunities().then((result) => {
  const communities = result.entities;
  communities.forEach((com) => {
    console.log(com.contractId);
    console.log(com.type);
    console.log(com.lister);
    console.log(com.id);
  });
});
```

### Fetching random communities with full metadata

**Signature**:  
`fetchRandomCommunitiesWithMetadata = async (): Promise<Array<RandomCommunities>>`

**Usage**:

```typescript
import { fetchRandomCommunitiesWithMetadata } from "verto-cache-interface";

fetchRandomCommunitiesWithMetadata().then((result) => {
  result.forEach((com) => {
    console.log(com.id);
    console.log(com.name);
    console.log(com.ticker);
    console.log(com.logo);
    console.log(com.description);
  });
});
```

### Fetching top communities with full metadata

**Signature**:  
`fetchTopCommunities = async (): Promise<Array<RandomCommunities>>`

**Usage**:

```typescript
import { fetchTopCommunities } from "verto-cache-interface";

fetchTopCommunities().then((result) => {
  result.forEach((com) => {
    console.log(com.id);
    console.log(com.name);
    console.log(com.ticker);
    console.log(com.logo);
    console.log(com.description);
  });
});
```

### Fetching full metadata for given communities

**Signature**:  
`fetchCommunitiesMetadata = async (communityContractIds: Array<string> | string): Promise<Array<RandomCommunities>>`

**Usage**:

```typescript
import { fetchCommunitiesMetadata } from "verto-cache-interface";

fetchCommunitiesMetadata(["MY-community-id1", "MY-community-id2"]).then(
  (result) => {
    result.forEach((com) => {
      console.log(com.id);
      console.log(com.name);
      console.log(com.ticker);
      console.log(com.logo);
      console.log(com.description);
    });
  }
);
```

### Fetching artwork metadata

**Signature**:  
`fetchArtworkMetadata = async (): Promise<ArtworkMetadata | undefined>`

**Usage**:

```typescript
import { fetchArtworkMetadata } from "verto-cache-interface";

fetchArtworkMetadata().then((result) => {
  console.log(result.id);
  console.log(result.name);
  console.log(result.lister); // Object (username, name, addresses, bio, links, image)
  console.log(result.lister.addresses);
  console.log(result.lister.bio);
  console.log(result.lister.links);
});
```

### Fetching token by id and optional filtering

**Signature**:  
`fetchTokenById = async (tokenId: string, filter?: (val: CommunityContractToken) => boolean): Promise<CommunityContractToken | undefined>`

**Usage**:

```typescript
import { fetchTokenById } from "verto-cache-interface";

fetchTokenById("ABC").then((result) => {
  console.log(result.id);
  console.log(result.type);
  console.log(result.lister);
});

fetchTokenById("ABC", (filterData) => filterData.type === "community").then(
  (result) => {
    console.log(result.id);
    console.log(result.type);
    console.log(result.lister);
  }
);
```

### Fetching Paginated Items (Tokens | People)

**Signature**:  
`fetchPaginated = async<T extends PaginatedToken | CommunityPeople>(type: "people" | "tokens", pageSize: number = 10, page: number = 1, sort: boolean = false): Promise<PaginatedData<T>>`

**Usage**:

```typescript
import { fetchPaginated } from "verto-cache-interface";

fetchPaginated<PaginatedToken>("tokens").then(async (result) => {
  console.log(result.items); // [token1, token2, ...]
  console.log(result.hasNextPage()); // true
  console.log(await result.nextPage()); // CALL next page: fetchPaginated("tokens", 10, 2)
  console.log(result.isEmpty()); // False
  console.log(result.getPaginationInfo()); // Information about paginated results
});
```

### Fetching price history
**Signature**
`fetchPriceHistory = async (pair: [string, string], desc?: boolean): Promise<Array<VwapModel>>`

**Usage**

```typescript
import { fetchPriceHistory } from "verto-cache-interface"

fetchPriceHistory(["A", "B"]).then((result) => {
    result.forEach((vwap) => {
        console.log(vwap.block);
        console.log(vwap.vwap);
        console.log(vwap.dominantToken);
    });
})
```

### Fetching latest price
**Signature**
`fetchLatestPrice = async (pair: [string, string]): Promise<VwapModel | undefined>`

**Usage**

```typescript
import { fetchLatestPrice } from "verto-cache-interface"

fetchLatestPrice(["A", "B"]).then((result) => {
    console.log(vwap.block);
    console.log(vwap.vwap);
    console.log(vwap.dominantToken);
})
```

## Hooks

Hooks are a way to invoke functions and then invoke certain behaviors inside the cache system.

### `cacheContractHook`

**Signature**:  
`cacheContractHook = async (action: () => Promise<any> | any, contractId?: string | string[], refreshCommunityContract?: boolean)`

**Parameters**:  
_action_: Action to be called inside before executing the hook  
_contractId_: Contract to be cached right after `action` has finished its execution. If an array, it'll cache all the ids provided in the array.  
_refreshCommunityContract_: Whether the community contract should be updated after `action` has finished its execution

**Usage**:

```typescript
import { cacheContractHook } from "verto-cache-interface";

const currentContract: string = "ABCD1234";
// const currentContracts: string[] = ['ABCD1234', '12903LLLEP'];

const executeOrder = await cacheContractHook(
  async () => {
    // Execute an order inside the exchange
    // Or do something different, maybe buy a car.
    return "ORDER_SENT";
  },
  currentContract,
  true
);

assert(executeOrder === "ORDER_SENT");
```

**Lifecycle**:

1. Execute `action` (if asynchronous, it will be awaited)
2. Call Cache API to invoke caching of `contractId`
3. if `refreshCommunityContract` is `true`, call Cache API to invoke caching of community contract

## Pointing to different cache URLS

```typescript
import { CacheInterfaceConstants } from "verto-cache-interface";

CacheInterfaceConstants.CACHE_API = "http://localhost";
CacheInterfaceConstants.COMMUNITY_CONTRACT = "[id]";
CacheInterfaceConstants.CONTRACT_CDN = "https://storage.googleapis.com/contracts";

render();
```
