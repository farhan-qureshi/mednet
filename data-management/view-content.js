if(!user) window.location.href = "index.html";
const walletAddress = user.get("walletAddress");

const url = document.location.href;
const contentId = url.split('?')[1].split('=')[1].split('&tokenid')[0];
const tokenId = url.split('&').length > 1 ? url.split('&')[1].split('=')[1] : "";

pageLoad = async () => {
    document.getElementById("view-content-editable").style.display = "none";

    var Content = Moralis.Object.extend("Content");
    const query = new Moralis.Query(Content);
    query.equalTo("contentId", parseInt(contentId));
    const contentFromDb = await query.first();
    contentUri = contentFromDb.get("contentUri");
    const isDraft = contentFromDb.get("isDraft");

    document.getElementById("ro-contentStatus").outerHTML = isDraft ? "In Progress" : "Published"; 
    document.getElementById("btn-retire-content").style.display = isDraft ? "none" : "block"; 
    
    document.getElementById("ro-contentName").outerHTML = contentFromDb.get("contentName"); 
    document.getElementById("ro-contentType").outerHTML = contentFromDb.get("contentType"); 
    document.getElementById("ro-contentDateOfLastUpdate").outerHTML = contentFromDb.get("contentDateOfLastUpdate");
    document.getElementById("ro-contentLanguage").outerHTML = contentFromDb.get("contentLanguage");
    
    document.getElementById("contentStatus").outerHTML = isDraft ? "In Progress" : "Published"; 
    document.getElementById("contentName").value = contentFromDb.get("contentName"); 
    document.getElementById("contentType").value = contentFromDb.get("contentType"); 
    document.getElementById("contentDateOfLastUpdate").value = contentFromDb.get("contentDateOfLastUpdate");
    document.getElementById("contentLanguage").value = contentFromDb.get("contentLanguage");

    document.getElementById("spnUploadedDocument").outerHTML =
    "<a style='float: right;' target=_blank href=" + contentFromDb.get("contentUri") + "><button>View</button></a>"

    makeUnEditable(isDraft);
}

pageLoad();

makeEditable = () => {
    document.getElementById("btn-edit-content").style.display = "none";
    document.getElementById("view-content-editable").style.display = "block";
    document.getElementById("view-content-readonly").style.display = "none";
    document.getElementById("btn-cancel-content").style.display = "block";
}

makeUnEditable = (isDraftContent) => {
    document.getElementById("btn-edit-content").style.display = "block";
    document.getElementById("view-content-editable").style.display = "none";
    document.getElementById("view-content-readonly").style.display = "block";
    document.getElementById("btn-cancel-content").style.display = "none";
}

removeContent = async () => {
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
        from: ethereum.selectedAddress,
        data: encodedFunction
    };

    await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
    });
}

changeContentFile = () => {
    document.getElementById("btn-change-content-file-cancel").style.display = "block";
}

cancelChangeContentFile = () => {
    document.getElementById("btn-change-content-file").style.display = "block";
}

upload = async () => {
    // document.getElementById("form-inner-fields").style.opacity = 0.2;
    
    // reading the file path
    const fileInput = document.getElementById("file");
    const data = fileInput.files[0];

    // creating and saving the file
    const contentFile = new Moralis.File(data.name, data);
    await contentFile.saveIPFS();
    contentUri = contentFile.ipfs();

    // here we just need to update the moralis database to save the new file,
    var Content = Moralis.Object.extend("Content");
    const query = new Moralis.Query(Content);
    query.equalTo("contentId", parseInt(contentId));
    const contentFromDb = await query.first();
    contentFromDb.set("contentUri", contentUri);
    contentFromDb.save()
        .then(() => {
            console.log(`Content Uri Updated to ${contentUri}`);
            window.location.href = url;
        }, (error) => {
            alert('Failed to update content Uri value in the database for this content. Error code: ' + error.message);
        });
}

approveContent = async () => {
    // document.getElementById("form-inner-fields").style.opacity = 0.2;

    // get the meta data from the page
    const date = new Date();
    const metadata = {
        "contentId": contentId,
        "description": "Content",
        "walletAddress": walletAddress,
        "contentName": document.getElementById("contentName").value,
        "contentType": document.getElementById("contentType").value,
        "contentDateOfLastUpdate": document.getElementById("contentDateOfLastUpdate").value,
        "contentLanguage": document.getElementById("contentLanguage").value,
        "document": contentUri,
        "lastUpdated": date.toUTCString()
    }

    // save the metadata json file with values and the correct description
    await mintToken(metadata, walletAddress);

    var Content = Moralis.Object.extend("Content");
    const query = new Moralis.Query(Content);
    query.equalTo("contentId", parseInt(contentId));
    const contentFromDb = await query.first();

    contentFromDb.set("isDraft", false);
    contentFromDb.set("contentName", document.getElementById("contentName").value); 
    contentFromDb.set("contentType", document.getElementById("contentType").value); 
    contentFromDb.set("contentDateOfLastUpdate", document.getElementById("contentDateOfLastUpdate").value); 
    contentFromDb.set("contentLanguage", document.getElementById("contentLanguage").value); 
    contentFromDb.save()
        .then((content) => {
            window.location.href = url;
        }, (error) => {
            alert('Failed to update content isDraft value in the database. Error code: ' + error.message);
        });
}
