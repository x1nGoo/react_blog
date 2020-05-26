import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined, HeartOutlined } from '@ant-design/icons';
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Header from '../components/Header'
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import servicePath from '../config/apiUrl'

import '../static/style/pages/index.css'

const Home = ({ list }) => {
  console.log('list', list)
  const [ myList , setMyList ] = useState(list)
  useEffect(() => {
    setMyList(list)
  })
  const markedRender = new marked.Renderer()

  marked.setOptions({
    renderer: markedRender,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: (code) => {
      return highlight.highlightAuto(code).value;
    }
  });

  return (
    <div className="container">
      <Head>
        <title>lyx</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: 'detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}</span>
                  <span><HeartOutlined />{item.view_count}</span>
                </div>
                <div className="list-content">
                  <span dangerouslySetInnerHTML={{ __html: marked(item.introduce) }} />
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await axios(servicePath.getArticleList);
  // console.log('res', res.data.data)
  return { list: res.data.data }
}

export default Home