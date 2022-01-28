
initialiseAndGenerate = async () => {
    // Authenticate with a wallet
    await Moralis.authenticate().then(function (user) {
        console.log(user.get('ethAddress'))
    });

    const date = new Date();

//  PRODUCTS UNDER THIS WALLET 

    let ownerAddress = '0x294D3F63559Fb020BF9775693cff6AbF748e90DF'  // a wallet address
    let 
    metaData = {"companyId": 1, "name": 'Ame Farma Internazionale', "description": "Company", "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 14, "productName": 'Eflex 225 mg prolonged-release capsules', "description": "Product", "companyId": 1, "productGenerics": 'ketoconazole', "productMAN": 'EU121/13/326', "productDateofAuth": '43992', "productMonitoring": 'no', "productCountries": 'France', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 113, "contentName": 'Eflex 225 mg prolonged-release capsules', "description": "Content", "contentType": 'SmPC', "contentDateOfLastUpdate": '43992', "contentLanguage": 'German', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 14, "contentId": 113, "description": "ProductContent", "companyId": 1, "contentName": '14', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()}; 
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 213, "contentName": 'Eflex 225 mg prolonged-release capsules', "description": "Content", "contentType": 'PIL', "contentDateOfLastUpdate": '43992', "contentLanguage": 'German', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 14, "contentId": 213, "description": "ProductContent", "companyId": 1, "contentName": '14', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 


    ownerAddress = '0x3D2aBC551A8804E052bd24924A13eca7bddcF2e4'  // a wallet address
    metaData = {"companyId": 3, "name": 'Accorded Healthcare', "description": "Company", "lastUpdated": date.toUTCString()};      
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 25, "productName": 'Iclud 30mg film-coated tablets ', "description": "Product", "companyId": 3, "productGenerics": 'posaconazole', "productMAN": 'EU123/12/329', "productDateofAuth": '44223', "productMonitoring": 'no', "productCountries": 'United Kingdom', "lastUpdated": date.toUTCString()};
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 124, "contentName": 'Iclud 30mg film-coated tablets ', "description": "Content", "contentType": 'SmPC', "contentDateOfLastUpdate": '44223', "contentLanguage": 'English', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 25, "contentId": 124, "description": "ProductContent", "companyId": 3, "contentName": '25', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 224, "contentName": 'Iclud 30mg film-coated tablets ', "description": "Content", "contentType": 'PIL', "contentDateOfLastUpdate": '44223', "contentLanguage": 'English', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 25, "contentId": 224, "description": "ProductContent", "companyId": 3, "contentName": '25', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    
    metaData = {"productId": 29, "productName": 'Labotrigine 50 mg tablets', "description": "Product", "companyId": 3, "productGenerics": 'paraffin', "productMAN": 'EU121/13/331', "productDateofAuth": '43185', "productMonitoring": 'yes', "productCountries": 'United Kingdom', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 128, "contentName": 'Labotrigine 50 mg tablets', "description": "Content", "contentType": 'SmPC', "contentDateOfLastUpdate": '43185', "contentLanguage": 'English', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 29, "contentId": 128, "description": "ProductContent", "companyId": 3, "lastUpdated": date.toUTCString()};
    await generateTokenFromMetadata(metaData, ownerAddress); 


    metaData = {"productId": 31, "productName": 'Laboxin 125 Tablets', "description": "Product", "companyId": 3, "productGenerics": 'parecoxib sodium', "productMAN": 'EU123/12/331', "productDateofAuth": '42756', "productMonitoring": 'no', "productCountries": 'United Kingdom', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 130, "contentName": 'Laboxin 125 Tablets', "description": "Content", "contentType": 'SmPC', "contentDateOfLastUpdate": '42756', "contentLanguage": 'English', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 31, "contentId": 130, "description": "ProductContent", "companyId": 3, "contentName": '31', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};  
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"contentId": 230, "contentName": 'Laboxin 125 Tablets', "description": "Content", "contentType": 'PIL', "contentDateOfLastUpdate": '42756', "contentLanguage": 'English', "document": 'https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf', "lastUpdated": date.toUTCString()};
    await generateTokenFromMetadata(metaData, ownerAddress); 
    metaData = {"productId": 31, "contentId": 230, "description": "ProductContent", "companyId": 3, "lastUpdated": date.toUTCString()};
    await generateTokenFromMetadata(metaData, ownerAddress); 

    console.log("THIS IS THE END");
}

generateTokenFromMetadata = async (metadata, ownerAddress) => {
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
    }, [metadataURI, ownerAddress, metadata.description]
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

document.getElementById('btn-generate-tokens').onclick = () => initialiseAndGenerate();


