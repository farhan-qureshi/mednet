if(!user) window.location.href = "index.html";
const walletAddress = user.get("walletAddress");

getPublishedNfts = async () => {
    let uniqueProducts = new Array();
    const smartContractNfts = await Moralis.Web3API.account.getNFTsForContract(options);
    const metaDataArray = await getLatestOfPublished(smartContractNfts);
    metaDataArray.forEach(refinedMetaData => {
        if(!uniqueProducts.includes(refinedMetaData.productId)) {
            uniqueProducts.push(refinedMetaData.productId);
            $("#published-body").html($("#published-body").html() + 
            "<li class=table-row>"+
                "<div class='col col-1'>" + refinedMetaData.productName + "</div>"+
                "<div class='col col-2'>" + refinedMetaData.productGenerics + "</div>"+
                "<div class='col col-3'>" + refinedMetaData.lastUpdated + "</div>"+
                "<div class='col col-4'><a href=view-product.html?productid=" + refinedMetaData.productId + "&tokenid="+ refinedMetaData.tokenId +">View</a></div>"+
            "</li>");
        }
    });
};

getLatestOfPublished = async (smartContractNfts) => {
    let refinedData = new Array();
    smartContractNfts.result.forEach(function(nft) {
        const nftMetadata = JSON.parse(nft.metadata);
        if(nftMetadata.description == 'Product') {
            var object = nftMetadata;
            object.tokenId = nft.token_id;
            refinedData.push(object);
        }
    });

    refinedData.sort((a,b) =>  new Date(b.lastUpdated) - new Date(a.lastUpdated));
    return refinedData;
}

getPendingNfts = async () => {

    var Product = Moralis.Object.extend("Product");
    const query = new Moralis.Query(Product);
    query.equalTo("isDraft", true);
    query.equalTo("ownerWalletAddress", walletAddress);
    const pendingProducts = await query.find();
    
    if(pendingProducts) {
        for (let i = 0; i < pendingProducts.length; i++) {
            const product = pendingProducts[i];
            $("#pending-body").html($("#pending-body").html() + 
                "<li class=table-row>"+
                    "<div class='col col-1'>" + product.get('productName') + "</div>"+
                    "<div class='col col-2'>" + product.get('productGenerics') + "</div>"+
                    "<div class='col col-3'>" + product.get('lastUpdated') + "</div>"+
                    "<div class='col col-4'><a href=view-product.html?productid=" + product.get('productId') + ">View</a></div>"+
                "</li>"
            );
        }
    }
}

function fixURL(url) {
    if (url.startsWith("ipfs")) {
        return commonKeyValues.get('ipfs_server_address') + url.split("ipfs://ipfs/").slice(-1)
    } else {
        return url+"?format=json";
    }
}

getPublishedNfts();
getPendingNfts();
