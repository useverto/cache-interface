export interface CommunityContractPeople {
    username: string;
    name: string;
    addresses: Array<string>;
    image: string;
    bio: string;
    links: {
        [prop: string]: string;
    }
}

export interface CommunityContractToken {
    id: string;
    type: string;
    lister: string;
}

export interface CommunityContractState {
    people: Array<CommunityContractPeople>
    tokens: Array<CommunityContractToken>;
}

export interface RandomCommunities {
    id: string;
    name: string;
    ticker: string;
    logo: string;
    description: string;
}

export interface CommunityBalancesRaw {
    contractId: string;
    balanceLength: number;
}
