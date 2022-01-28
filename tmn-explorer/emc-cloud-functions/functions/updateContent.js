Moralis.Cloud.define("updateContent", async(request) => {
  const expectedContentType = "Content";
  const logger = Moralis.Cloud.getLogger(); // establish a logger

  // get the data we need to handle 
  const mintQueryNull = new Moralis.Query("MEDNETMints");
    	mintQueryNull.equalTo("Handled", null) 
      mintQueryNull.equalTo("tokenType", expectedContentType)
  
  const mintQueryEmpty = new Moralis.Query("MEDNETMints");
    	mintQueryEmpty.equalTo("Handled", "") 
      mintQueryEmpty.equalTo("tokenType", expectedContentType)

  const fullQuery = Moralis.Query.or(mintQueryNull,mintQueryEmpty);
  
  const newResults = await fullQuery.find({ useMasterKey: true });
  logger.info(" ------------ new " + expectedContentType + " transactions to process: " + newResults.length + " ------------ ");

  /* deal with each in turn */
  for (let i = 0; i < newResults.length; i++) {
    const obj = newResults[i];
    
      let mintTrackerObjectId = obj.id;
      let tokenUri = obj.get('tokenUri');
      let tokenType = obj.get('tokenType');
      
      logger.info('handling: ' + mintTrackerObjectId);
    
      await Moralis.Cloud.httpRequest( {
          url: tokenUri
      })
      .then(function(httpResponse) {
        // success
        let data = httpResponse.data;
        const Content = Moralis.Object.extend("Content")

        if (tokenType.toLowerCase() != expectedContentType.toLowerCase()) {
          logger.info("Unexpected tokenType: " + tokenType.toLowerCase() + "; skipped.")
        } else {
          
          // does it exist already? if yes we probably need to mark it as historical
          const existsQuery = new Moralis.Query("Content");
          existsQuery.equalTo("owner", obj.get('address').toLowerCase())
          existsQuery.equalTo("contentid", parseInt(data.contentId))
          existsQuery.notEqualTo("historical", 1)
          existsQuery.limit(1)

          let doInsert = true;
          existsQuery.find({ useMasterKey: true }).then(function(results) 
          {
               if (results.length > 0) 
               { // yes it does, if it's older, mark it as historical
                 if (obj.get('block_number') == results[0].get('block_number')) {
                   doInsert = false; //we've seen this one before
                   logger.info("update skipped to avoid duplicate. Existing obj: " + results[0].id)
                 } 
                 
                 if (obj.get('block_number') > results[0].get('block_number'))  {
                   results[0].set("historical", 1);
                   results[0].set("sethistoricaldate", obj.get('block_timestamp'));
                   results[0].save()
                   .then((hist) => {
                      logger.info("set to historical:" + hist.id);
                    })
                 } 
                 
               }
               if (doInsert) {
                  // handle the token
                  const nftCont = new Content();
                  nftCont.save({
                    contentid: parseInt(data.contentId),
                    name: data.contentName,
                    owner: obj.get('address').toLowerCase(),
                    contenttype: data.contentType,
                    lastupdate: Date.parse(data.contentDateOfLastUpdate),
                    language: data.contentLanguage,
                    contenturi: data.document,
                    block_timestamp: obj.get('block_timestamp'),
                    block_hash: obj.get('block_hash'),
                    block_number: obj.get('block_number'),
                    tokenuri: tokenUri
                  }, null, {useMasterKey: true})
                    .then((nft) => {
                    logger.info('nft saved, id: ' + nft.id);
                  }, (error) => {
                    logger.info('nft save failed, event id:' + mintTrackerObjectId + ' - ' + error);
                  });              	
                
                }

                // handle the MEDNETMint Tracker
                obj.set('Handled', new Date().toString())
                obj.save()
                  .then((tracker) => {
                      logger.info("tracker handled:" + tracker.id);
                  })
          })
        }
      }, function(httpResponse) {
        //error
        logger.info("error from IPFS retrieval: " + tokenUri + "; skipped.");          
      });
      
  }

  return "done";

})