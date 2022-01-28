if(!user) window.location.href = "index.html";

const walletAddress = user.get("walletAddress");

let contentURI;

saveContent = async () => {
    var contentName = document.getElementById("contentName").value;
    var contentType = document.getElementById("contentType").value;
    var contentDateOfLastUpdate = document.getElementById("contentDateOfLastUpdate").value;
    var contentLanguage = document.getElementById("contentLanguage").value;

    if(contentName.length == 0) {
        alert("please enter a content name");
        return;
    }

    var ContentIdentifier = Moralis.Object.extend("ContentIdentifier");
    const query = new Moralis.Query(ContentIdentifier);
    query.exists("contentId");
    let queryResult = await query.find();

    let contentId = 1;

    if(queryResult.length > 0) {
        contentId = queryResult[0].get("contentId") + 1;
        queryResult[0].increment("contentId");
        queryResult[0].save();
    } else {
        const diInstance = new ContentIdentifier();
        diInstance.save({"contentId": contentId});
    }

    var Content = Moralis.Object.extend("Content");
    const uploadDoc = new Content();

    const date = new Date();

    uploadDoc.set("ownerWalletAddress", walletAddress);
    uploadDoc.set("approverWalletAddress", walletAddress);
    uploadDoc.set("isDraft", true);
    uploadDoc.set("contentId", contentId);
    uploadDoc.set("contentName", contentName);
    
    uploadDoc.set("contentUri", contentURI);
    uploadDoc.set("contentType", contentType);
    uploadDoc.set("contentDateOfLastUpdate", contentDateOfLastUpdate);
    uploadDoc.set("contentLanguage", contentLanguage);
    uploadDoc.set("version", 1);
    uploadDoc.set("lastUpdated", date.toUTCString());
    
    uploadDoc.save()
        .then((content) => {
            window.location.href = "view-content.html?contentid=" + contentId;
        }, (error) => {
            alert('Failed to create new content in the database. Error code: ' + error.message);
        });
}

document.getElementById("btn-save-content").style.display = "none";
