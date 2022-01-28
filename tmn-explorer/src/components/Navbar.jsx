import React, {useState, useEffect} from 'react';
import { Menu, Input } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined  } from '@ant-design/icons';



//import icon from 'https://www.original-digital.co.uk/wp-content/uploads/2021/01/od-logo-300x87-1.png';

const Navbar = () => {
  const { Search } = Input;
  const onSearch = value => { console.log(value) }


  return (
     <>
        
        <div className="logoReplacement"><img width="150" src="https://www.original-digital.co.uk/wp-content/uploads/2021/01/od-logo-300x87-1.png"/> mi-explorer</div>
        <Menu theme="dark" mode="horizontal">
            <Menu.Item icon={<HomeOutlined/>}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
              <Link to="/companies">Companies A-Z</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
              <Link to="/products">Products A-Z</Link>
            </Menu.Item>                
            <Menu.Item icon={<BulbOutlined/>}>
              <Link to="/content">Content A-Z</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/latestchanges">Latest Changes</Link>
            </Menu.Item>
            {/* <Menu.Item icon={<SmileOutlined/>}>
              <Link onClick={() => authenticate({ signingMessage: "Hello World!" })}>Login</Link>
            </Menu.Item>  
            <Menu.Item icon={<SmileOutlined/>}>
              <Link onClick={() => logout()}>Logout</Link>
            </Menu.Item>          */}
        </Menu>
      {/* <div>
        <h1>Welcome {user.get("username")}</h1>
        <button onClick={() => logout()}>Logout</button>
      </div> */}
      
      </>
  )
}

export default Navbar
