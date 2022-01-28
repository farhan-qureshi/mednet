import React from "react";
import ReactDOM from "react-dom";
import { useMoralis } from "react-moralis";
import { Layout } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import { Navbar,  Homepage, CompanyList, Company, ContentList, ProductList, Product, LatestChanges } from './components';

import './css/App.css';
import './css/antd.css';
import icon from './images/tmp-logo.png';

const App = () => {

   
  const { Header, Footer, Content } = Layout;

  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <div className="site-layout-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route exact path="/companies" element={<CompanyList/>} />
            <Route exact path="/companies/:companywalletaddr/:companyid" element={<Company/>} />
            <Route exact path="/companies/:companywalletaddr/:companyid/:productid/:contentid" element={<Product/>} />
            <Route exact path="/products/" element={<ProductList/>} />
            <Route exact path="/content/" element={<ContentList/>} />
            <Route exact path="/latestchanges/" element={<LatestChanges/>} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        the.medicines.network Explorer - ©2021 - Original Digital Ltd (with the help of Ant Design).
        Certified service provider by <a onClick={f => { alert('not implemented yet')}}><img src={icon}/></a>
      </Footer>
    </Layout>  
  )
};

export default App;
