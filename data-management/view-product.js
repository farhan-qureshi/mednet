if(!user) window.location.href = "index.html";
const walletAddress = user.get('walletAddress');
const companyId = user.get('companyId');

const url = document.location.href;
const productId = url.split('?')[1].split('=')[1].split('&tokenid')[0];
const tokenId = url.split('&').length > 1 ? url.split('&')[1].split('=')[1] : "";

pageLoad = async () => {
    document.getElementById("view-product-editable").style.display = "none";
    document.getElementById("btn-approve-product").style.display = "none";
    document.getElementById("btn-retire-product").style.display = "none";
    
    var Product = Moralis.Object.extend("Product");
    const query = new Moralis.Query(Product);
    query.equalTo("productId", parseInt(productId));
    const productFromDb = await query.first();
    const isDraft = productFromDb.get("isDraft");
    
    document.getElementById("ro-productStatus").outerHTML = isDraft ? "In Progress" : "Published"; 
    document.getElementById("content-section").style.display = isDraft ? "none" : "block";
    document.getElementById("ro-productName").outerHTML = productFromDb.get("productName"); 
    document.getElementById("ro-productGenerics").outerHTML = productFromDb.get("productGenerics");
    document.getElementById("ro-productMan").outerHTML = productFromDb.get("productMan");
    document.getElementById("ro-productDateOfAuth").outerHTML = productFromDb.get("productDateOfAuth");
    document.getElementById("ro-productMonitoring").outerHTML = productFromDb.get("productMonitoring");
    document.getElementById("ro-productCountries").outerHTML = productFromDb.get("productCountries");

    document.getElementById("productStatus").outerHTML = isDraft ? "In Progress" : "Published"; 
    document.getElementById("productName").value = productFromDb.get("productName"); 
    document.getElementById("productGenerics").value = productFromDb.get("productGenerics");
    document.getElementById("productMan").value = productFromDb.get("productMan");
    document.getElementById("productDateOfAuth").value = productFromDb.get("productDateOfAuth");
    document.getElementById("productMonitoring").value = productFromDb.get("productMonitoring");
    document.getElementById("productCountries").value = productFromDb.get("productCountries");

    makeUnEditable(isDraft);
}

pageLoad();

handleEditMappingsClick = () => {
    window.location.href = `add-mappings.html?productid=${productId}&tokenid=${tokenId}`;
}

makeEditable = () => {
    document.getElementById("btn-approve-product").style.display = "block";
    document.getElementById("btn-retire-product").style.display = "none";
    document.getElementById("btn-edit-product").style.display = "none";
    document.getElementById("view-product-editable").style.display = "block";
    document.getElementById("view-product-readonly").style.display = "none";
    document.getElementById("btn-cancel-product").style.display = "block";
}

makeUnEditable = (isDraftProduct) => {
    if(isDraftProduct) {
        document.getElementById("btn-approve-product").style.display = "block";
        document.getElementById("btn-retire-product").style.display = "none";
    } 
    else {
        document.getElementById("btn-approve-product").style.display = "none";
        document.getElementById("btn-retire-product").style.display = "block";
    }

    document.getElementById("btn-edit-product").style.display = "block";
    document.getElementById("view-product-editable").style.display = "none";
    document.getElementById("view-product-readonly").style.display = "block";
    document.getElementById("btn-cancel-product").style.display = "none";
}

removeProduct = async () => {
    burnToken(tokenId);
}

approveProduct = async () => {
    const date = new Date();
    const metadata = {
        "productId": productId,
        "description": "Product",
        "walletAddress": walletAddress,
        "productName": document.getElementById("productName").value,
        "productGenerics": document.getElementById("productGenerics").value,
        "productMan": document.getElementById("productMan").value,
        "productDateOfAuth": document.getElementById("productDateOfAuth").value,
        "productMonitoring": document.getElementById("productMonitoring").checked ? 'on' : 'off',
        "productCountries": document.getElementById("productCountries").value,
        "lastUpdated": date.toUTCString(),
        "companyId": companyId
    }

    await mintToken(metadata, walletAddress);

    var Product = Moralis.Object.extend("Product");
    const query = new Moralis.Query(Product);
    query.equalTo("productId", parseInt(productId));
    const productFromDb = await query.first();

    productFromDb.set("isDraft", false);
    productFromDb.set("productName", document.getElementById("productName").value); 
    productFromDb.set("productGenerics", document.getElementById("productGenerics").value); 
    productFromDb.set("productMan", document.getElementById("productMan").value); 
    productFromDb.set("productDateOfAuth", document.getElementById("productDateOfAuth").value); 
    productFromDb.set("productMonitoring", document.getElementById("productMonitoring").value); 
    productFromDb.set("productCountries", document.getElementById("productCountries").value); 
    productFromDb.save()
        .then((product) => {
            window.location.href = url;
        }, (error) => {
            alert('Failed to update products isDraft value in the database. Error code: ' + error.message);
        });
}

getContentsForProduct = async () => {
    let uniqueContents = new Array();
    const options = { chain: commonKeyValues.get('blockChain'), address: walletAddress, token_address: commonKeyValues.get('nft_contract_address') };
    const smartContractNfts = await Moralis.Web3API.account.getNFTsForContract(options);
    const metaDataArray = await getRefinedMetaDataForPublishedProducts(smartContractNfts);
    
    document.getElementById("view-product-contents").style.display = metaDataArray.length > 0 ? "none" : "block";
    
    metaDataArray.forEach(refinedMetaData => {
        if(!uniqueContents.includes(refinedMetaData.contentId)) {
            uniqueContents.push(refinedMetaData.contentId);

            getContentType(refinedMetaData.contentId)
            .then((contentType) => { 

                $("#product-contents-body").html($("#product-contents-body").html() + 
                "<li>"+
                    "<div style='margin-left: 20px; font-size: 14px;'>" + refinedMetaData.contentName + "</div>"+
                    "<div style='margin-left: 20px; font-size: 14px;'>" + contentType + "</div>"+
                "</li>");
                    
            });
        }
    });
};

getRefinedMetaDataForPublishedProducts = async (smartContractNfts) => {
    let refinedData = new Array();
    smartContractNfts.result.forEach(function(nft) {
        const nftMetadata = JSON.parse(nft.metadata);
        if(nftMetadata.description == 'ProductContent' && nftMetadata.productId == productId) {
            refinedData.push(nftMetadata);
        }
    });

    refinedData.sort((a,b) =>  new Date(b.lastUpdated) - new Date(a.lastUpdated));
    return refinedData;
}

getContentType = async(myContentId) => {
    var Content = Moralis.Object.extend("Content");
    const query = new Moralis.Query(Content);
    query.equalTo("contentId", parseInt(myContentId));
    const contentIdFromDb = await query.first();
    const contentType = contentIdFromDb.get("contentType");
    return contentType;
}

getContentsForProduct();    
