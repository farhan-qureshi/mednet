Moralis.Cloud.define("cleanContent", async(request) => {
  // get the hisorical data
  const histQuery = new Moralis.Query("Content");
  histQuery.equalTo("historical", 1) 

  const hist = await histQuery.find({ useMasterKey: true });
  logger.info(" ------------ " + hist.length + " historical CONTENT items to clean-up.");

  /* deal with each in turn */
  for (let i = 0; i < hist.length; i++) {
    const obj = hist[i];
      logger.info('handling: ' + obj.id);
     
      const ContentHistory = Moralis.Object.extend("ContentHistory")
      const history = new ContentHistory();
      history.save({
        contentid: parseInt(obj.get('contentid')),
        contenturi: obj.get('contenturi'),
        contenttype: obj.get('contenttype'),
        name: obj.get('name'),
        language: obj.get('language'),
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