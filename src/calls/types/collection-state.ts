export interface CollectionState {
    name: string;
    description: string;
    collaborators: Array<string>;
    items: Array<string>;
}

export interface CollectionResult extends CollectionState {
    id: string;
    owner: string;
}
