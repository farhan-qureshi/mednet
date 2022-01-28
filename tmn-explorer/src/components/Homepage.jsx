import React, { useState, useEffect } from 'react'
import { Input, Typography, Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Moralis } from "moralis";

const {Title} = Typography;
const { Column, ColumnGroup } = Table;

const Homepage = () => {
  
  const { Search } = Input;
  const [ searchResults, setSearchResults ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  const [ changeResults, setChangeResults ] = useState([]);
  
  const onSearch = value => {
    setSearchTerm(value);
    if (searchTerm != '') {
      console.log('searching for ', value)
      const query = new Moralis.Query("Product");
      query.fullText('name', value);
      query.ascending('$score');

      query.find()
        .then(function(results) {
          // results contains a weight / rank in result.get('score')
          setSearchResults(results);
          console.log("results", results)
          
        })
        .catch(function(error) {
          // There was an error.
          console.log("error", error);
        });
      }
  }

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
          <Title level={1}>the.medicines.network Explorer</Title>
          <Divider></Divider>

          <Title level={3}>Search the.medicines.network</Title>
          <Search
            placeholder="search by company name, product, or generic name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Table dataSource={searchResults} >
            <Column title="Name" dataIndex={["attributes", "name"]} key="name"></Column>
            <Column title="Generics" dataIndex={["attributes", "generics"]} key="generics"></Column>
            <Column title="Authorisation Date" dataIndex={["attributes", "dateOfauthorisation"]} key="dateOfauthorisation"></Column>
            <Column title="Marketing Auth #" dataIndex={["attributes", "marketingauthnumb"]} key="marketingauthnumb"></Column>
          </Table>            
        </>
      )
}

export default Homepage;
