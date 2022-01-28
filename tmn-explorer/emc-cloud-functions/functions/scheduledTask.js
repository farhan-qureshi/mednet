Moralis.Cloud.job("updateDatabase", async(request) =>  {
   await Moralis.Cloud.run("updateCompanies");
   await Moralis.Cloud.run("cleanCompanies");
   await Moralis.Cloud.run("updateProducts");
   await Moralis.Cloud.run("cleanProducts");
   await Moralis.Cloud.run("updateContent");  
   await Moralis.Cloud.run("cleanContent");  
   await Moralis.Cloud.run("updateProductContentMap");
   await Moralis.Cloud.run("cleanProductContentMap");
   return "done"
});