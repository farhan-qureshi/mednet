if(!user) window.location.href = "index.html";
const walletAddress = user.get("walletAddress");

getPublishedNfts = async () => {
    let uniqueItems = new Array();
    const smartContractNfts = await Moralis.Web3API.account.getNFTsForContract(options);
    const metaDataArray = await getLatestOfPublished(smartContractNfts);
    metaDataArray.forEach(data => {
        if(!uniqueItems.includes(data.contentId)) {
            uniqueItems.push(data.contentId);
            $("#published-body").html($("#published-body").html() + 
                "<li class=table-row>"+
                    "<div class='col col-1'>" + data.contentName + "</div>"+
                    "<div class='col col-2'>" + data.contentType + "</div>"+
                    "<div class='col col-3'>" + data.lastUpdated + "</div>"+
                    "<div class='col col-4'><a href=view-content.html?contentid=" + data.contentId + "&tokenid="+ data.tokenId +">View</a></div>"+
                "</li>"
            );
        }
    });
};

getLatestOfPublished = async (smartContractNfts) => {
    let refinedData = new Array();
    smartContractNfts.result.forEach(function(nft) {
        const nftMetadata = JSON.parse(nft.metadata);
        if(nftMetadata.description == 'Content') {
            var object = nftMetadata;
            object.tokenId = nft.token_id;
            refinedData.push(object);
        }
    });

    refinedData.sort((a,b) =>  new Date(b.lastUpdated) - new Date(a.lastUpdated));
    return refinedData;
}

// #from the moralis database
getPendingNfts = async () => {
    var Content = Moralis.Object.extend("Content");
    const query = new Moralis.Query(Content);
    query.equalTo("isDraft", true);
    query.equalTo("ownerWalletAddress", walletAddress);
    const pendingContent = await query.find();
    
    if(pendingContent) {
        for (let i = 0; i < pendingContent.length; i++) {
            const content = pendingContent[i];
            $("#pending-body").html($("#pending-body").html() + 
                "<li class=table-row>"+
                    "<div class='col col-1'>" + content.get('contentName') + "</div>"+
                    "<div class='col col-2'>" + content.get('contentType') + "</div>"+
                    "<div class='col col-3'>" + content.get('createdAt') + "</div>"+
                    "<div class='col col-4'><a href=view-content.html?contentid=" + content.get('contentId') + ">View</a></div>"+
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
