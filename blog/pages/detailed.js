import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined, HeartOutlined } from '@ant-design/icons';
// import ReactMarkdown from 'react-markdown'
// import MarkDownNavbar from 'markdown-navbar'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import 'markdown-navbar/dist/navbar.css'
import '../static/style/pages/detailed.css'
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'

const Detailed = ({ detailedData }) => {
  console.log('detailedData', detailedData)

  const tocify = new Tocify()
  const markedRender = new marked.Renderer()
  markedRender.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

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

  const markedHtml = marked(detailedData.article_content)

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{detailedData.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{detailedData.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{detailedData.title}</div>

              <div className="list-icon center">
                <span><CalendarOutlined />{detailedData.addTime}</span>
                <span><FolderOutlined />{detailedData.typeName}</span>
                <span><FireOutlined />{detailedData.view_count}</span>
                <span><HeartOutlined />{detailedData.view_count}</span>
              </div>

              <div className="detailed-content" >
                <span dangerouslySetInnerHTML={{ __html: markedHtml }} />
                {/* <ReactMarkdown
                  source={detailedData.content}
                  escapeHtml={false}
                /> */}
              </div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={10}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
              {/* <MarkDownNavbar
                className="article-menu"
                source={markedHtml}
                // headingTopOffset={0}
                ordered={false}
              /> */}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (context) => {
  console.log('context', context)
  const id = context.query.id;
  const res = await axios(servicePath.getArticleById + id);
  // console.log('res', res.data.data)
  return { detailedData: res.data.data[0] }
}

export default Detailed

