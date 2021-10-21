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
