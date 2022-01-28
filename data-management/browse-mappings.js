if(!user) window.location.href = "index.html";
const walletAddress = user.get("walletAddress");

getPublishedProductNfts = async () => {
    const smartContractNfts = await Moralis.Web3API.account.getNFTsForContract(options);    
    const smartContractNftsResult = smartContractNfts.result; 
    smartContractNftsResult.forEach(function(nft) {
        let url = fixURL(nft.token_uri);
        fetch(url)
        .then(response => response.json())
        .then(data => 
        {
            if(data.description == 'Product') {
                fetchContentForProduct(smartContractNftsResult, data.productId);
                $("#published-body").html($("#published-body").html() + 
                    "<li class=table-row>"+
                        "<div class='col col-1'>" + data.productId + "</div>"+
                        "<div class='col col-2'>" + data.productName + "</div>"+
                        "<div class='col col-3'>" + 
                            `<table id=tblContent_${data.productId}>` + "</table>" +
                        "</div>" +
                    "</li>"
                );
            }
        });
    });
}

function fetchContentForProduct(smartContractNftsResult, productId) {
    smartContractNftsResult.forEach(function(nft) {
        let url = fixURL(nft.token_uri);
        fetch(url)
        .then(response => response.json())
        .then(data => 
        {
            if(data.description == 'ProductContent' && data.productId == productId) {
                $("#tblContent_" + productId).html($("#tblContent_" + productId).html() + "<tr><td>" + data.contentName + "</td></tr>")
            }
        });
    });
}

function fixURL(url) {
    if (url.startsWith("ipfs")) {
        return commonKeyValues.get('ipfs_server_address') + url.split("ipfs://ipfs/").slice(-1)
    } else {
        return url+"?format=json";
    }
}

getPublishedProductNfts();