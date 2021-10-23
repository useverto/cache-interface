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
$ npm install verto-cace-interface
```

## Usage

### Fetching a contract

**Signature**:  
`fetchContract<T = any>(contractId: string, 
                        withValidity?: boolean, 
                        dontThrow?: boolean): Promise<StateResult<T> | undefined>`

**Parameters**:  
*T*: Interface of the contract state to be returned  
*contractId*: Contract to be fetched  
*withValidity*: Whether validity should be fetched (Default: false)  
*dontThrow*: Whether it should not throw an error if contract is not found (Default: false)

**Usage**:
```typescript
import { fetchContract } from 'verto-cace-interface';

fetchContract('t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE').then((result) => {
    const state = result.state;
    const validity = result.validity;
})
```

### Fetching a balance of address in contract

**Signature**:  
`fetchBalanceByUserAddress = async (contractId: string, userAddress: string): Promise<UserBalance | undefined>`

**Parameters**:
*contractId*: Contract to be fetched
*userAddress*: Address to obtain balance from

**Usage**:
```typescript
import { fetchBalanceByUserAddress } from 'verto-cace-interface';

fetchBalanceByUserAddress('vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU').then((result) => {
    const contractId = result.contractId;
    const contractName = result.name;
    const contractTicker = result.ticker;
    const contractLogo = result.logo;
    const userBalance = result.balance;
    const userAddress = result.userAddress;
})
```

### Fetching all the balances available for a given address

**Signature**:  
`fetchBalancesForAddress = async (userAddress: string): Promise<Array<UserBalance>>`

**Parameters**:
*userAddress*: Address to obtain balance from

**Usage**:
```typescript

import { fetchBalancesForAddress } from 'verto-cace-interface';

fetchBalancesForAddress('vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU').then((result) => {
    const balances: Array<UserBalance> = result;
})
```

### Fetching all the balances inside a contract

**Signature**:  
`fetchBalancesInContract = async (contractId: string): Promise<BalanceAndContract>`

**Parameters**:
*contractId*: Contract to be fetched

**Usage**:
```typescript
import { fetchBalancesInContract } from 'verto-cace-interface';

fetchBalancesInContract('bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY').then((result) => {
    const balances: BalanceAndContract = result;
    const [balancesObject, contractMetadata] = balances;
    
    const balanceForAddress = balancesObject['vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU'];
    const contractTicker = contractMetadata.ticker;
})
```

### Fetching a single collection by collection id

**Signature**:  
`fetchCollectionById = async (collectionId: string): Promise<CollectionResult | undefined>`

**Parameters**:
*collectionId*: Collection (contract) to be fetched

**Usage**:
```typescript
import { fetchCollectionById } from 'verto-cace-interface';

fetchCollectionById('GirFtyB_PI4oQXhEFrHZLpFUqincHrDdDxPaQ1M8r00').then((result) => {
    const id = result.id;
    const collectionName = result.name;
    const description = result.description;
    const owner = result.owner;
    const collaborators = result.collaborators;
    const items = result.items;
})
```

### Fetching all contracts an address is part of

**Signature**:  
`fetchContractsInUser = async (addressId: string): Promise<Array<string>>`

**Parameters**:
*addressId*: Address to obtain related-contracts from

**Usage**:
```typescript
import { fetchContractsInUser } from 'verto-cace-interface';

fetchContractsInUser('vxUdiv2fGHMiIoek5E4l3M5qSuKCZtSaOBYjMRc94JU').then((result) => {
    // Contract Ids
    const relatedContractsToUser: Array<string> = result;
})
```

### Fetching all tokens created by a user given a username

**Signature**:  
`fetchOwnershipByUsername = async (username: string): Promise<Array<string>>`

**Parameters**:
*username*: Username to fetch ownership from

**Usage**:
```typescript
import { fetchOwnershipByUsername } from 'verto-cace-interface';

fetchOwnershipByUsername('t8').then((result) => {
    // Contract Ids
    const tokensCreatedByUser: Array<string> = result;
})
```

### Fetching Token Metadata

**Signature**:  
`fetchTokenMetadata = async (tokenId: string, fromContract?: boolean): Promise<TokenMetadata | undefined>`

**Parameters**:
*tokenId*: Token (contract) id to fetch metadata from
*fromContract*: Whether it should be fetched from the Google CDN or Verto Database (Default: False)

**Usage**:
```typescript
import { fetchTokenMetadata } from 'verto-cace-interface';

fetchTokenMetadata('bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY').then((result) => {
    const id = result.id;
    const type = result.type;
    const listerUsername = result.lister;
})
```

### Fetching Token State Metadata

**Signature**:  
`fetchTokenStateMetadata = async (tokenId: string): Promise<TokenStateMetadata | undefined>`

**Parameters**:
*tokenId*: Token (contract) id to fetch metadata from

**Usage**:
```typescript
import { fetchTokenStateMetadata } from 'verto-cace-interface';

fetchTokenStateMetadata('bQGRi3eO4p7S583mYYXDeVn5EvGPFMiMWd5WBWatteY').then((result) => {
    const id = result.id;
    const tokenName = result.name;
    const owner = result.owner;
    const ticker = result.ticker;
})
```

### Fetching all registered tokens

**Signature**:  
`fetchTokens = async (specificType?: string): Promise<Array<TokenMetadata>>`

**Parameters**:
*specificType*: Whether to filter tokens with a specific type

**Usage**:

```typescript
import { fetchTokens } from 'verto-cace-interface';

fetchTokens().then((result) => {
    const allTokens: Array<TokenMetadata> = result;
    allTokens.forEach((item) => {
        console.log('Id ', item.id);
        console.log('Type ', item.type);
        console.log('Lister ', item.lister);
    });
})
```

### Fetching random artwork

**Signature**:  
`fetchRandomArtwork = async (limit: number = 4): Promise<RandomArtworkResult>`

**Parameters**:
*limit*: Maximum number of artwork to be fetched (Default: 4)

**Usage**:
```typescript
import { fetchRandomArtwork } from 'verto-cace-interface';

fetchRandomArtwork().then((result) => {
    const artwork: Array<TokenMetadata> = result.entities;
    
    artwork.forEach((item) => {
        console.log('Lister', item.lister);
        console.log('Type', item.type);
        console.log('Contract ID', item.contractId);
    });
})
```

### Fetching all creations (art) given a username

**Signature**:  
`fetchUserCreations = async (username: string): Promise<Array<string>>`

**Parameters**:
*username*: Username to fetch creations from

**Usage**:
```typescript
import { fetchUserCreations } from 'verto-cace-interface';

fetchUserCreations('t8').then((result) => {
    // Contract Ids
    const creations: Array<string> = result;
})
```

### Fetching user metadata given a username

**Signature**:  
`fetchUserMetadataByUsername = async (username: string): Promise<UserMetadata | undefined>`

**Parameters**:
*username*: Username to fetch metadata from

**Usage**:
```typescript
import { fetchUserMetadataByUsername } from 'verto-cace-interface';

fetchUserMetadataByUsername('t8').then((result) => {
    const username = result.username;
    const addresses: Array<string> = result.addresses;
})
```

### Fetching all registered users

**Signature**:  
`fetchUsers = async (): Promise<Array<CommunityContractPeople>>`

**Usage**:
```typescript
import { fetchUsers } from 'verto-cace-interface';

fetchUsers().then((result) => {
    result.forEach((user) => {
        console.log('Username ', user.username);
        console.log('Name ', user.name);
        console.log('Addresses ', user.addresses);
        console.log('Image ', user.image);
        console.log('Bio ', user.bio);
        console.log('Links ', user.links);
    })
})
```


## Hooks
Hooks are a way to invoke functions and then invoke certain behaviors inside the cache system.


### `cacheContractHook`

**Signature**:  
`cacheContractHook = async (action: () => Promise<any> | any,
contractId?: string,
refreshCommunityContract?: boolean)`

**Parameters**:  
*action*: Action to be called inside before executing the hook  
*contractId*: Contract to be cached right after `action` has finished its execution  
*refreshCommunityContract*: Whether the community contract should be updated after `action` has finished its execution  

**Usage**:

```typescript
import { cacheContractHook } from 'verto-cace-interface';

const currentContract: string = 'ABCD1234'

const executeOrder = await cacheContractHook(async () => {
    // Execute an order inside the exchange
    // Or do something different, maybe buy a car.
    return 'ORDER_SENT';
}, currentContract, true);

assert(executeOrder === 'ORDER_SENT');
```

**Lifecycle**:
1) Execute `action` (if asynchronous, it will be awaited)
2) Call Cache API to invoke caching of `contractId`
3) if `refreshCommunityContract` is `true`, call Cache API to invoke caching of community contract
