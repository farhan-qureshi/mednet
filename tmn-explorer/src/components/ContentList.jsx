import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Button, Divider, Input, PageHeader, Descriptions, List, Space } from 'antd';
import { ClockCircleOutlined, CloudDownloadOutlined, GlobalOutlined, MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Moralis } from "moralis";

const {Title, Paragraph} = Typography;
const { Search } = Input;

const ContentList = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState ([]);
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const Content = Moralis.Object.extend("Content")
      const query = new Moralis.Query(Content);
    
      const results = query.find()
      .then(function(results) {
        setList(results);
        setFilteredList(results);
        console.log(results)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])

    useEffect(() => {
      const filteredData = list?.filter(content => content.attributes.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
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
        <Divider orientation="left">Filter Content</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            <Search size="large" placeholder="Filter Content" onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 400 }} />
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
                <IconText icon={CloudDownloadOutlined} text={item.attributes.contenttype} key="list-vertical-like-o" />,
                <IconText icon={ClockCircleOutlined} text={item.attributes.lastupdate.toString()} key="list-vertical-star-o" />,
                <IconText icon={GlobalOutlined} text={item.attributes.language} key="list-vertical-like-o" />,
                <IconText icon={MoreOutlined} text="More from this company"/>
                
              ]}
            >
              <List.Item.Meta
                title={<a target="_blank" href={item.attributes.contenturi}>{item.attributes.name}</a>}
              />
              
              </List.Item>
            )}
          />  
    </>

    
  );
}

export default ContentList;
