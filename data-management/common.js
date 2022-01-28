const web3 = new Web3(window.ethereum);

let commonKeyValues = new Map();
// moralis server address (configure accordingly)
commonKeyValues.set('serverUrl', 'https://z2et8zjterwa.usemoralis.com:2053/server');
// moralis ipfs server address (configure accordingly)
commonKeyValues.set('ipfs_server_address', 'https://ipfs.moralis.io:2053/ipfs/');
// moralis dapp Id (configure accordingly)
commonKeyValues.set('appId', 'suPKrJmwcp3kq4Fv2ZyjqOpf6BqcksAUUBEJCPmn');
// block chain for avalanche fuji testnet
commonKeyValues.set('blockChain', '0xa869');
// ethereum contract address [created with remix] (configure accordingly)
commonKeyValues.set('nft_contract_address', '0x5063C7bF16C6fE9969d6167546b0E9DCB04E0029');

let loggedInCompany = "";

/* Moralis init code */
init = () => {
    const serverUrl = commonKeyValues.get('serverUrl');
    const appId = commonKeyValues.get('appId');
    Moralis.start({ serverUrl, appId });
}

let options;
const btnLogout = document.getElementById("btn-logout");
const lblLoggedinuser = document.getElementById("lbl-loggedinuser");
const divLogin = document.getElementById("div-login");
const divLoggedin = document.getElementById("div-loggedin");
const lblloggedincompany = document.getElementById("lbl-loggedincompany");
const siteHeaderEnd = document.getElementById("site-header-end");
const imgCompanyLogoUri = document.getElementById("img-companyLogoUri");

logout = async () => {
    // Moralis logout
    await Moralis.User.logOut();
    if (btnLogout) btnLogout.style.display = "none";
    window.location.href = "index.html";
}

getLoggedInCompanyDetails = async (companyId) => {
    var Company = Moralis.Object.extend("Company");
    const query = new Moralis.Query(Company);
    query.equalTo("companyId", parseInt(companyId));
    const companyFromDb = await query.first();

    if(companyFromDb) {
        return companyFromDb;
    }
}

loginClassic = async (email, password) => {
    const user = await Moralis.User.logIn(email, password);
    if(user) {
        if (lblLoggedinuser) lblLoggedinuser.innerHTML = user.get('email');
        if (btnLogout) btnLogout.style.display = "block";
        if (divLogin) divLogin.style.display = "none";
        if (divLoggedin) divLoggedin.style.display = "block";
        if (siteHeaderEnd) siteHeaderEnd.style.display = "block";
    }
}

init();

const user = Moralis.User.current();

if(user) {
    if(lblLoggedinuser) lblLoggedinuser.innerHTML = user.get('email');
    if(divLogin) divLogin.style.display = "none";
    if(divLoggedin) divLoggedin.style.display = "block";
    if(btnLogout) btnLogout.style.display = "block";
    if(siteHeaderEnd) siteHeaderEnd.style.display = "block";
    options = { chain: commonKeyValues.get('blockChain'), address: user.get('walletAddress'), token_address: commonKeyValues.get('nft_contract_address') };

    if (lblloggedincompany) {
        // access the name and the logo url for the company belonging to this user
        const companyId = user.get('companyId');

        getLoggedInCompanyDetails(companyId)
            .then(data => {
                lblloggedincompany.innerText = data.get('name');
                imgCompanyLogoUri.src = data.get('companyLogoUri');
            });
    }
} 
else {
    if(divLoggedin) divLoggedin.style.display = "none";
    if(divLogin) divLogin.style.display = "block";
    if(btnLogout) btnLogout.style.display = "none";
    if(siteHeaderEnd) siteHeaderEnd.style.display = "none";

    if(!window.location.href.includes('index.html')) {
        window.location.href = "index.html";
    }
}

if(btnLogout) btnLogout.onclick = () => logout();

mintToken = async (metadata, walletAddress) => {
    if(!user) {
        alert("please login first");
        window.location.href = "index.html";
    }

    console.log("mint token ", metadata);
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();

    // call the mint function on the smart contract to mint the company token
    await Moralis.enableWeb3();
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "mint",
        type: "function",
        inputs: 
        [
            { type: 'string', name: 'tokenUri' },
            { type: 'address', name: 'to' },
            { type: 'string', name: 'tokenType' }
        ]
    }, [metadataURI, walletAddress, metadata.description]
    );

    const transactionParameters = {
        to: commonKeyValues.get('nft_contract_address'),
        from: ethereum.selectedAddress,     // we should be able to provide any address here and it should work
        data: encodedFunction
    };

    const txt = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
    });
}

burnToken = async (tokenId) => {
    const encodedFunction = web3.eth.abi.encodeFunctionCall({
        name: "burn",
        type: "function",
        inputs: 
        [
            { type: 'uint256', name: 'tokenId' }
        ]
    }, [tokenId]);

    const transactionParameters = {
        to: commonKeyValues.get('nft_contract_address'),
        from: ethereum.selectedAddress,     // we should be able to provide any address here and it should work
        data: encodedFunction
    };

    await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
    });
}


