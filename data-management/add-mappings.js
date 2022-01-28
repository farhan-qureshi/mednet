if(!user) window.location.href = "index.html";

const walletAddress = user.get("walletAddress");
const companyId = user.get('companyId');

const url = document.location.href;
const productId = url.split('?')[1].split('=')[1].split('&tokenid')[0];
const tokenId = url.split('&').length > 1 ? url.split('&')[1].split('=')[1] : "";

let tokenIdArrayForContentId;
let contentIdArrayForThisProductId;

getContentNfts = async () => {
    var Product = Moralis.Object.extend("Product");
    const query = new Moralis.Query(Product);
    query.equalTo("productId", parseInt(productId));
    const productFromDb = await query.first();
    document.getElementById('plhProductName').innerText = productFromDb.get('productName');
    
    $("#contents-body").empty();
    const smartContractNfts = await Moralis.Web3API.account.getNFTsForContract(options);
    if(productId > 0) {
        contentIdArrayForThisProductId = new Array();
        tokenIdArrayForContentId = new Array();
        smartContractNfts.result.forEach(function(nft) {
            const data = JSON.parse(nft.metadata);
            if(data.description == 'ProductContent' && data.productId == productId) {
                contentIdArrayForThisProductId.push(data.contentId);
                tokenIdArrayForContentId[data.contentId] = nft.token_id;
            }
        });
    }
    
    smartContractNfts.result.forEach(function(nft) {
        const data = JSON.parse(nft.metadata);
        if(data.description == 'Content') {
            let isChecked = contentIdArrayForThisProductId && contentIdArrayForThisProductId.includes(data.contentId);
            $("#contents-body").html($("#contents-body").html() + 
                "<table>" +
                    "<tr class='table-row'>" +
                        "<td style='text-align:left; padding: 12px;'>" + 
                            data.contentName + 
                        "</td>"+
                        "<td>" +
                            data.contentType +
                            `<input type=checkbox id=chk_contentid name='contents' contentTitle='${data.contentName}' contentid=${data.contentId} ${isChecked ? "checked" : ""} />` +
                        "</td>" +
                    "</tr>" + 
                "</table>"
            );
        }
    });
}

function fixURL(url) {
    if (url.startsWith("ipfs")) {
        return commonKeyValues.get('ipfs_server_address') + url.split("ipfs://ipfs/").slice(-1)
    } else {
        return url+"?format=json";
    }
}

handleSaveMappings = async() => {
    var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');

    for (var checkbox of markedCheckbox) {
        const contentId = checkbox.attributes.contentid.value;
        const contentName = checkbox.attributes.contentTitle.value;
        if(contentIdArrayForThisProductId.includes(contentId)) {
            contentIdArrayForThisProductId.splice(contentIdArrayForThisProductId.indexOf(contentId), 1);
        }
        else {
            createProductContentMapping(productId, contentId, contentName);
        }
    }

    for (var contentId of contentIdArrayForThisProductId) {
        removeProductContentMapping(tokenIdArrayForContentId[contentId]);
    }
}

createProductContentMapping = async (productId, contentId, contentName) => {
    const date = new Date();
    const metadata = {
        "description": "ProductContent",
        "productId": productId,
        "contentId": contentId,
        "contentName": contentName,
        "walletAddress": walletAddress,
        "lastupdated": date.toUTCString(),
        "companyId": companyId
    }

    await mintToken(metadata, walletAddress);
}

removeProductContentMapping = async (tokenId) => {
    await burnToken(tokenId);
}

getContentNfts(0);
document.getElementById("btn-save-mappings").onclick = () => handleSaveMappings();
