export type BalanceType = { [prop: string]: number };
export interface CommonTokenState {
    contractId: string;
    updated: number;
    ticker: string;
    name: string;
    title: string;
    description: string;
    owner: string;
    allowMinting: boolean;
    balances: BalanceType,
    settings: {
        [prop: string]: any
    }
}
