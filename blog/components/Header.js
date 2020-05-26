import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, Menu } from 'antd'
// import Icon, { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'
import servicePath from '../config/apiUrl'

import '../static/style/components/header.css'

const Header = () => {
  const [navList, setNavList] = useState([])
  useEffect(() => {
    const fetchList = async () => {
      const res = await axios(servicePath.getTypeInfo)
      console.log('res', res)
      setNavList(res.data.data)
    }

    fetchList()
  }, [])

  const handleMemuClick = (e) => {
    if (e.key === 'home') {
      Router.push('/index')
    } else {
      Router.push(`/list?type=${e.key}`)
    }
  }

  const iconMaker = (type, otherProps = {}) => {
    const Icon = require('@ant-design/icons')[type];
    return <Icon {...otherProps} />;
  }

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sx={24} md={10} lg={16} xl={12}>
          <div className="header-left">
            <span className="header-logo">x1nGoo</span>
            <span className="header-txt">做人如果没有梦想, 和咸鱼有什么区别</span>
          </div>
        </Col>
        <Col xs={0} sx={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleMemuClick}>
            {
              navList && navList.map(item => (
                <Menu.Item key={item.typeId}>
                  {iconMaker(item.icon)}
                  <span>{item.typeName}</span>
                </Menu.Item>
              ))
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header