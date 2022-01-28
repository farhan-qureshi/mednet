import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Typography, List  } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ContentListForProduct = ({productid, map, content, companywalletaddr, companyid}) => {

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <>
      <table>
          {content?.filter(c => isMapped(c.attributes.contentid, productid)).map(selC => (
            <div key={selC.attributes.contentid}>
                <tr>
                  <td>
                    <IconText icon={FilePdfOutlined} text=" " key="list-vertical-star-o" />
                  </td>
                  <td>
                    <Link to={`/companies/${companywalletaddr}/${companyid}/${productid}/${selC.attributes?.contentid}`}>
                      {selC?.attributes?.contenttype} {selC?.attributes?.name} ({selC?.attributes.language})
                    </Link>
                  </td>
                </tr>
            </div>
          ))}
      </table>
    </>
  )

  function isMapped(contentid, productid) {
    for (var i=0; i < map.length; i++) {
      if (map[i].attributes?.contentid == contentid && map[i].attributes?.productid == productid)
        return true;
    }
    return false;
  }

  function openContent(contentUri) {
    alert(contentUri)
    var win = window.open(contentUri, '_blank');
    win.focus();
  }
}


export default ContentListForProduct