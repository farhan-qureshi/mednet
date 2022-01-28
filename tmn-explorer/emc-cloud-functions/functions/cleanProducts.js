Moralis.Cloud.define("cleanProducts", async(request) => {
  // get the hisorical data
  const histQuery = new Moralis.Query("Product");
  histQuery.equalTo("historical", 1) 

  const hist = await histQuery.find({ useMasterKey: true });
  logger.info(" ------------ " + hist.length + " historical PRODUCT items to clean-up.");

  /* deal with each in turn */
  for (let i = 0; i < hist.length; i++) {
    const obj = hist[i];
      logger.info('handling: ' + obj.id);
     
      const ProductHistory = Moralis.Object.extend("ProductHistory")
      const history = new ProductHistory();
      history.save({
        productid: parseInt(obj.get('productid')),
        companyid: parseInt(obj.get('companyid')),
        name: obj.get('name'),
        owner: obj.get('owner').toLowerCase(),
        subjecttoadditionalmon: obj.get('subjecttoadditionalmon'),
        authorisedincountries: obj.get('authorisedincountries'),
        generics: obj.get('generics'),
        dateofauthorisation: obj.get('dateofauthorisation'),
        archiveddate: obj.get('sethistoricaldate'),
        block_timestamp: obj.get('block_timestamp'),
        block_hash: obj.get('block_hash'),
        block_number: obj.get('block_number'),
        lastupdated:  obj.get('lastupdated'),
        tokenuri: obj.get('tokenuri')        
      }, null, {useMasterKey: true})
        .then((nft) => {
        logger.info('nft history saved, id: ' + nft.id);

        // now destroy the original
        obj.destroy(),then((destroyedObj) => {
          logger.info('deleted historical item; object id:' + obj.id + ' - ' + error);
        }, (error) => {
          logger.info('failed to delete record marked as historical; object id:' + obj.id + ' - ' + error);
        });
      }, (error) => {
        logger.info('nft history save failed, event id:' + mintTrackerObjectId + ' - ' + error);
      });  
  }

  return "done";

})