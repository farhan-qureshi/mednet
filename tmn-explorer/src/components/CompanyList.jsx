import React, { useState, useEffect } from 'react'
import { List, Row, Col, Card, Input, PageHeader, Avatar, Divider } from 'antd';


import { Link } from 'react-router-dom';
import { Moralis } from "moralis";


const { Meta } = Card;
const { Search } = Input;

const CompanyList = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState ([]);
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const Company = Moralis.Object.extend("Company")
      const query = new Moralis.Query(Company);
            query.notEqualTo("ishistorical",1)
    
      const results = query.find()
      .then(function(results) {
        setList(results);
        setFilteredList(results);
      })
      .catch(err => {
        console.log(err)
      })
    }, [])

    useEffect(() => {
      const filteredData = list?.filter(comp => comp.attributes.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setFilteredList(filteredData)
    }, [searchTerm]);



  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Companies"
        subTitle="Browse A-Z"
      />
      <Divider orientation="left">Filter Companies</Divider>
      <Row gutter={{ xs: 2, sm: 8, md: 16, lg: 32 }}>
        <Col span={24}>
          <Search size="large" placeholder="Search company name" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 400 }} />
        </Col>
      </Row>
      <Divider/>
        
        <List itemLayout="vertical"
        dataSource={filteredList}
        size="large"
        grid={{gutter: 24, column: 3}}
        renderItem={i => (
              <Link to={`/companies/${i.attributes.owner}/${i.attributes.companyid}`}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`https://picsum.photos/200/200?${i.attributes.companyid}`} />
                    }
                    title={<a href="/companies/${i.attributes.owner}/${i.attributes.companyid}">{i.attributes.name}</a>}
                    description={i.attributes.name}
                      
                  />
                </List.Item>  
              </Link>
              
        )}/>

    </>
  );
}

export default CompanyList;
