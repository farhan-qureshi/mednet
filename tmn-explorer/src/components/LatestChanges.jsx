import React, { useState, useEffect } from 'react'
import { Typography, Table, Divider } from 'antd';
import { Moralis } from "moralis";

const {Title} = Typography;
const { Column } = Table;

const LatestChanges = () => {
  
  const [ changeResults, setChangeResults ] = useState([]);

  useEffect(() => {
        const query = new Moralis.Query("Content");
        query.descending("block_timestamp")
        query.limit(5)

        query.find()
        .then(function(results) {
          // results contains a weight / rank in result.get('score')
          setChangeResults(results);
          console.log("changes", results)
          
        })
        .catch(function(error) {
          // There was an error.
          console.log("change error", error);
        });

  }, [])

      return (
        <>
    
          <Title level={3}>Latest Content Changes</Title>
          <Table dataSource={changeResults} pagination={false}>
            <Column title="Content Type" dataIndex={["attributes", "contenttype"]} key="contenttype"></Column>
            <Column title="Name" dataIndex={["attributes", "name"]} key="name"></Column>
            <Column title="Date" dataIndex={["attributes", "block_timestamp"]} key="block_timestamp" render={item => item.toString()}></Column>
          </Table>
        
        </>
      )
}

export default LatestChanges;
