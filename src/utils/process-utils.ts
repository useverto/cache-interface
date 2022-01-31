export const getNameAndTickerAndLogoAndDescription = (contractId: string, state: any) => {
    if(!state) {
        throw new Error("State must not be empty in order to be processed");
    }
    const settings: Array<string> = (state.settings || []).flat();
    const logoIndex = settings.findIndex(item => item === "communityLogo");
    const descriptionIndex = settings.findIndex(item => item === "communityDescription");
    return {
        id: contractId,
        name: state.name,
        ticker: state.ticker,
        logo: settings[logoIndex + 1],
        description:  settings[descriptionIndex + 1],
    };
}

export const getItemsFromCollection = (contractId: string, state: any) => {
    return {
        contractId,
        items: state['items']
    };
}
