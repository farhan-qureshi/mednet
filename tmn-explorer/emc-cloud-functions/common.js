let commonKeyValues = new Map();

// moralis server address (configure accordingly)
commonKeyValues.set('serverUrl', 'https://bwgr6dvbhyek.usemoralis.com:2053/server');

// moralis dapp Id (configure accordingly)
commonKeyValues.set('appId', 'uddvYvixM1KTRu1631y39aYgZLKYvKb9ECxhPd9F');

// block chain for avalanche fuji testnet
commonKeyValues.set('blockChain', '0xa869');

/* Moralis init code */
init = () => {
    const serverUrl = commonKeyValues.get('serverUrl');
    const appId = commonKeyValues.get('appId');
    Moralis.start({ serverUrl, appId });
}

updateCompanies = async () => {
    const result = await Moralis.Cloud.run("updateCompanies")
    console.log(result)
}

cleanCompanies = async () => {
    const result = await Moralis.Cloud.run("cleanCompanies")
    console.log(result)
}

updateMaps = async () => {
    const result = await Moralis.Cloud.run("updateProductContentMap")
    console.log(result)
}

cleanMaps = async () => {
    const result = await Moralis.Cloud.run("cleanProductContentMap")
    console.log(result)
}

cleanContent = async () => {
    const result = await Moralis.Cloud.run("cleanContent")
    console.log(result)
}

cleanProducts = async () => {
    const result = await Moralis.Cloud.run("cleanProducts")
    console.log(result)
}

updateContent = async () => {
    const result = await Moralis.Cloud.run("updateContent")
    console.log(result)
}

updateProducts = async () => {
    const result = await Moralis.Cloud.run("updateProducts")
    console.log(result)
}

init();


