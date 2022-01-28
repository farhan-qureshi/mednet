import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Button, Divider, Input, PageHeader, Descriptions, List, Space } from 'antd';
import { ClockCircleOutlined, CaretDownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Moralis } from "moralis";
import ContentListForProduct from './ContentListForProduct';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const ProductList = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState ([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [contentList, setContentList] = useState([]);
  const [contentMap, setMap] = useState([]);

    useEffect(() => {
      const Product = Moralis.Object.extend("Product")
      const query = new Moralis.Query(Product);
            query.notEqualTo("ishistorical",1)
    
      const results = query.find()
      .then(function(results) {
        setList(results);
        setFilteredList(results);
        console.log("products", results)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])

    useEffect(() => {
      const Content = Moralis.Object.extend("Content")
      const queryC = new Moralis.Query(Content);
            queryC.notEqualTo("ishistorical",1)

      const resultsC = queryC.find()
      .then(function(resultsC) {
        setContentList(resultsC);
        console.log("content", resultsC)
      })
      .catch(err => {
        console.log(err)
      })
    },[])

    useEffect(() => {
      const ProductContentMap = Moralis.Object.extend("ProductContentMap")
      const queryPCM = new Moralis.Query(ProductContentMap);
            queryPCM.notEqualTo("ishistorical",1)
    
      const resultsPCM = queryPCM.find()
      .then(function(resultsPCM) {
        setMap(resultsPCM);
        console.log("map", resultsPCM)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])

    useEffect(() => {
      const filteredData = list?.filter(product => product.attributes.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setFilteredList(filteredData)
      console.log(filteredList)

    }, [searchTerm]);

    const IconLink = ({ src, text }) => (
      <a className="example-link">
        <img className="example-link-icon" src={src} alt={text} />
        {text}
      </a>
    );

    const content = (
      <>
        <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel nunc non velit porta vehicula efficitur iaculis metus. Curabitur non iaculis massa.
        Nam sit amet magna sed mauris rhoncus porttitor. Sed turpis est, ultrices sed velit et, vestibulum imperdiet dui. Nulla semper dignissim odio, ac venenatis leo commodo a.
        </Paragraph>
        <div>
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text="Find Related Links"
          />
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            text="Find Related Products"
          />          
        </div>
      </>
    );

    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
      <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="Browse Products"
          subTitle=""
        >
        </PageHeader>
      </div>
      <Divider orientation="left">Filter Products</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <Search size="large" placeholder="Filter Products" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 400 }} />
        </Col>
      </Row>
      <Divider/>        
  
      <List
          itemLayout="vertical"
          size="small"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={filteredList}
          renderItem={item => (
            <List.Item
              key={item.attributes.id}
              actions={[
                <IconText icon={ClockCircleOutlined} text={item.attributes.dateOfauthorisation.toString()} key="list-vertical-star-o" />,
                <IconText icon={CaretDownOutlined} text="Subject to additional monitoring" key="list-vertical-like-o" />,
                <IconText icon={GlobalOutlined} text={item.attributes.authorisedincountries} key="list-vertical-like-o" />,
              ]}
              extra={
                <ContentListForProduct productid={item.attributes.productid} map={contentMap} content={contentList} companywalletaddr={item.attributes.owner} companyid={item.attributes.companyid} />
              }  

            >
              <List.Item.Meta
                title={<a href={`/companies/${item.attributes.owner}/${item.attributes.productid}`}>{item.attributes.name}</a>}
                description={
                  item.attributes.generics}
              />
              
              </List.Item>
            )}
          />    

      {/* {filteredList?.map((i) => (
        
        <Row gutter={[10, 10]} className="crypto-card" key={i.attributes.id}>
            {<Link to={`/companies/{companyid}/${i.attributes.productid}`}>
              <Card
              title={`[${i.attributes.productid}] ${i.attributes.name}`}
              hoverable
              >
              <b>owner:</b> {i.attributes.owner}<br/>

              <ContentListForProduct productid={i.attributes.productid} map={contentMap} content={contentList} />
              
              </Card>
            </Link> }
        </Row>
      ))} */}
    </>

    
  );
}

export default ProductList;
