import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Button, Divider, Input, PageHeader, Descriptions, List, Space } from 'antd';
import { ClockCircleOutlined, CaretDownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Moralis } from "moralis";
import ContentListForProduct from './ContentListForProduct';

const { Title, Paragraph } = Typography;

const Company = () => {
  
  const { companywalletaddr, companyid } = useParams();

  const { Search } = Input;

  // get the product information
  const [company, setCompany] = useState({});
  
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState ([]);
  const [contentList, setContentList] = useState([]);
  const [contentMap, setMap] = useState([]);
  const [ownerAddress, setOwnerAddress] = useState('');
  const [ownerCompanyId, setOwnerCompanyId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [contentUri, setContentUri] = useState('')
  

   // get the company details and all the products for this company
     useEffect(() => {
       
       if (companywalletaddr != '') {
          const Company = Moralis.Object.extend("Company")
          const query = new Moralis.Query(Company);
                query.notEqualTo("ishistorical", 1)
                query.equalTo("owner", companywalletaddr.toLowerCase());
                query.equalTo("companyid", parseInt(companyid));
                query.limit(1);

          const results = query.find()
          .then(function(results) {
            setCompany(results[0]);
            console.log("result", results[0])
            setOwnerAddress(companywalletaddr?.toLowerCase())
            
          })
          .catch(err => {
            console.log("error", err)
          })
       }
    }, []);

    // get the products
    useEffect(() => {
      if (ownerAddress != '') {
        const Product = Moralis.Object.extend("Product")
        const queryP = new Moralis.Query(Product);
              queryP.notEqualTo("ishistorical",1)
              queryP.equalTo("owner", ownerAddress)
              queryP.equalTo("companyid", parseInt(companyid))

        const resultsP = queryP.find()
        .then(function(resultsP) {
          setProductList(resultsP);
          setFilteredList(resultsP);
        })
        .catch(err => {
          console.log(err)
        })
      }
    }, [ownerAddress])

    useEffect(() => {
      if (ownerAddress != '') {
        const Content = Moralis.Object.extend("Content")
        const queryC = new Moralis.Query(Content);
              queryC.notEqualTo("ishistorical",1)
              queryC.equalTo("owner", ownerAddress)

        const resultsC = queryC.find()
        .then(function(resultsC) {
          setContentList(resultsC);
          console.log("content", resultsC)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },[ownerAddress])

    useEffect(() => {
      const ProductContentMap = Moralis.Object.extend("ProductContentMap")
      const queryPCM = new Moralis.Query(ProductContentMap);
            queryPCM.notEqualTo("ishistorical",1)
            queryPCM.equalTo("owner", ownerAddress)
            queryPCM.equalTo("companyid", parseInt(companyid))
    
      const resultsPCM = queryPCM.find()
      .then(function(resultsPCM) {
        setMap(resultsPCM);
        console.log("map", resultsPCM)
      })
      .catch(err => {
        console.log(err)
      })
    }, [ownerAddress])

    // // let the user filter products
    useEffect(() => {
      const filteredData = productList?.filter(product => product.attributes.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setFilteredList(filteredData)
      console.log("filteredList", filteredList)

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
            text="Visit website"
          />
          <IconLink
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
            text="Contact the company"
          />                 
        </div>
      </>
    );

    const Content = ({ children, extraContent }) => (
      <Row>
        <div style={{ flex: 1 }}>{children}</div>
        <div className="image">{extraContent}</div>
      </Row>
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
          title={company.attributes?.name}
          subTitle=""
          extra={[
            <Button key="3" type="primary">Save</Button>,
            <Button key="2">Follow</Button>,
          ]}
        >
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="Creation Time">{company?.attributes?.block_timestamp.toString()}</Descriptions.Item>
            <Descriptions.Item label="Wallet Address">{company?.attributes?.owner}</Descriptions.Item>
          </Descriptions>
          <Content
            extraContent={
              <img
                src={`https://picsum.photos/200/200?${companywalletaddr}`}
                alt="content"
                width="100px"
              />
            }
          >
            {content}
          </Content>
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
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={filteredList}
          renderItem={item => (
            <List.Item
              key={item.attributes.id}
              actions={[
                <IconText icon={ClockCircleOutlined} text={item.attributes.dateOfauthorisation?.toString()} key="list-vertical-star-o" />,
                <IconText icon={CaretDownOutlined} text="Subject to additional monitoring" key="list-vertical-like-o" />,
                <IconText icon={GlobalOutlined} text={item.attributes.authorisedincountries} key="list-vertical-like-o" />,
              ]}
              extra={
                <ContentListForProduct productid={item.attributes.productid} map={contentMap} content={contentList} companywalletaddr={companywalletaddr} companyid={companyid} />
              }
            >
              <List.Item.Meta
                title={<a href={`/companies/${companywalletaddr}/${item.attributes.productid}`}>{item.attributes.name}</a>}
                description={item.attributes.generics}
              />
              </List.Item>
            )}
          />          
    </>
  );
}

export default Company;
