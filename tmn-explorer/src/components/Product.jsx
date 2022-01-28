import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Button, Divider, Input, PageHeader, Descriptions, List, Space, Tabs } from 'antd';
import { ClockCircleOutlined, CaretDownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { Moralis } from "moralis";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Product = () => {
  
  const { companywalletaddr, companyid, productid, contentid } = useParams();

  // get the product information
  const [company, setCompany] = useState({});
  const [product, setProduct] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [contentMap, setMap] = useState([]);
  const [ownerAddress, setOwnerAddress] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);  

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

    // get the product
    useEffect(() => {
      if (ownerAddress != '') {
        const Product = Moralis.Object.extend("Product")
        const queryP = new Moralis.Query(Product);
              queryP.notEqualTo("ishistorical",1)
              queryP.equalTo("owner", ownerAddress)
              queryP.equalTo("companyid", parseInt(companyid))
              queryP.equalTo("productid", parseInt(productid))

        const resultsP = queryP.first()
        .then(function(resultsP) {
          setProduct(resultsP);
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
            queryPCM.equalTo("productid", parseInt(productid))
    
      const resultsPCM = queryPCM.find()
      .then(function(resultsPCM) {
        setMap(resultsPCM);
        console.log("map", resultsPCM)
      })
      .catch(err => {
        console.log(err)
      })
    }, [ownerAddress])

    const IconLink = ({ src, text }) => (
      <a className="example-link">
        <img className="example-link-icon" src={src} alt={text} />
        {text}
      </a>
    );

    const content = (
      <>

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


    function callback(key) {
      console.log(key);
    }

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title={product.attributes?.name}
          subTitle={`by ${company.attributes?.name}`}
          extra={[
            <Button key="3" type="primary">Save</Button>,
            <Button key="2">Follow</Button>,
          ]}
        >
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="Last Authorisation Date">{product?.attributes?.dateOfauthorisation.toString()}</Descriptions.Item>
            <Descriptions.Item label="Countries">{product?.attributes?.authorisedincountries}</Descriptions.Item>
            <Descriptions.Item label="Additional Monitoring?">{product?.attributes?.subjecttoadditionalmonitoring}</Descriptions.Item>
            <Descriptions.Item label="Generics">{product?.attributes?.generics}</Descriptions.Item>
          </Descriptions>
          <Content
            extraContent={
              <img
                src={`https://picsum.photos/200/200?${productid}`}
                alt="content"
                width="100px"
              />
            }
          >
            {content}
          </Content>
        </PageHeader>
      </div> 
                
        <Tabs defaultActiveKey="1" onChange={callback} type="card" size="large">
        <TabPane tab="SmPC" key="1">
        <div>
            <Document
              file='https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf'
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </div>
        </TabPane>
        <TabPane tab="PIL" key="2">
          <div>
            <Document
              file="https://dweb.link/ipfs/bafybeihieygmjjezt3j72mb6jqf5k2w4p4dw2y5hxhoqhr3r75gqohsm54/Test-OD.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
          </div>
        </TabPane>
        <TabPane tab="Risk Materials" key="3">
        Example extension of this model to include Risk Materials
        </TabPane>
        <TabPane tab="Safety Information" key="4">
          Example extension of this model to include Safety Information
        </TabPane> 
        <TabPane tab="Something else" key="5">
        Example extension of this model to include more information        
        </TabPane>               
      </Tabs>   
       
    </>
  );
}

export default Product;
