Moralis.Cloud.define("cleanProductContentMap", async(request) => {
  // get the hisorical data
  const histQuery = new Moralis.Query("ProductContentMap");
  histQuery.equalTo("historical", 1) 

  const hist = await histQuery.find({ useMasterKey: true });
  logger.info(" ------------ " + hist.length + " historical PRODUCT-CONTENT-MAP items to clean-up.");

  /* deal with each in turn */
  for (let i = 0; i < hist.length; i++) {
    const obj = hist[i];
      logger.info('handling: ' + obj.id);
     
      const ProductContentMapHistory = Moralis.Object.extend("ProductContentMapHistory")
      const history = new ProductContentMapHistory();
      history.save({
        contentid: parseInt(obj.get('contentid')),
        productid: parseInt(obj.get('productid')),
        owner: obj.get('owner').toLowerCase(),
        lastupdate: obj.get('lastupdate'),
        archiveddate: obj.get('sethistoricaldate'),
        block_timestamp: obj.get('block_timestamp'),
        block_hash: obj.get('block_hash'),
        block_number: obj.get('block_number'),
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