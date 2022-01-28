if(!user) window.location.href = "index.html";

const companyId = user.get('companyId');
const walletAddress = user.get("walletAddress");

saveProduct = async () => {
    const date = new Date();
    var productName = document.getElementById("productName").value;
    var productGenerics = productGenerics = document.getElementById("productGenerics").value;
    var productMan = document.getElementById("productMan").value;
    var productDateOfAuth = document.getElementById("productDateOfAuth").value;
    var productMonitoring = document.getElementById("productMonitoring").checked ? 'on' : 'off';
    var productCountries = document.getElementById("productCountries").value;
    var lastUpdated = date.toUTCString();

    if(productName.length == 0) {
        alert("please enter a product name");
        return;
    }

    var ProductIdentifier = Moralis.Object.extend("ProductIdentifier");

    const query = new Moralis.Query(ProductIdentifier);
    query.exists("productId");
    let queryResult = await query.find();

    let productId = 1;

    if(queryResult.length > 0) {
        productId = queryResult[0].get("productId") + 1;
        queryResult[0].increment("productId");
        queryResult[0].save();
    } else {
        const diInstance = new ProductIdentifier();
        diInstance.save({"productId": productId});
    }

    var Product = Moralis.Object.extend("Product");
    const uploadDoc = new Product();

    uploadDoc.set("ownerWalletAddress", walletAddress);
    uploadDoc.set("approverWalletAddress", walletAddress);
    uploadDoc.set("isDraft", true);
    uploadDoc.set("productId", productId);
    uploadDoc.set("productName", productName);
    uploadDoc.set("productGenerics", productGenerics);
    uploadDoc.set("productMan", productMan);
    uploadDoc.set("productDateOfAuth", productDateOfAuth);
    uploadDoc.set("productMonitoring", productMonitoring);
    uploadDoc.set("productCountries", productCountries);
    uploadDoc.set("lastUpdated", lastUpdated);
    uploadDoc.set("companyId", companyId);
    
    uploadDoc.save()
        .then((product) => {
            window.location.href = "view-product.html?productid=" + productId;
        }, (error) => {
            alert('Failed to create new product in the database. Error code: ' + error.message);
        });
}

