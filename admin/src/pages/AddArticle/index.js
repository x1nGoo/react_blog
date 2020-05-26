import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Row, Col, Input, Button, Card, DatePicker, Select } from 'antd'
import marked from 'marked'
import servicePath from '../../api/index'
import './index.css'

const { Option } = Select
const { TextArea } = Input

const AddArticle = () => {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   // 文章标题
  const [articleContent, setArticleContent] = useState('')  // markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('内容预览') // html内容
  const [introducemd, setIntroducemd] = useState()            // 简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('简介预览') // 简介的html内容
  const [showDate, setShowDate] = useState()   // 发布日期
  const [updateDate, setUpdateDate] = useState() // 修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) // 选择的文章类别

  useEffect(() => {
    handleGetType()
  }, []);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  })

  const handleGetType = async () => {
    const res = await axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true
      }
    });
    console.log('handleGetType', res)
  }

  const handleChangeContent = (e) => {
    setArticleContent(e.target.value)
    setMarkdownContent(marked(e.target.value))
  }

  const handleChangeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    setIntroducehtml(marked(e.target.value))
  }

  return (
    <Row gutter={12}>
      <Col span={18}>
        <Row gutter={12}>
          <Col span={18}>
            <Input placeholder="请输入文章标题" />
          </Col>
          <Col span={6}>
            <Select style={{ width: '100%' }} defaultValue="life">
              <Option value="life">生活</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={12} style={{ marginTop: 12 }}>
          <Col span={12}>
            <TextArea className="markdown-content" rows={35} placeholder="请输入文章内容" onChange={handleChangeContent} />
          </Col>
          <Col span={12}>
            <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }} />
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <div style={{ textAlign: 'right', marginBottom: 12 }}>
          <Button type="primary">发布文章</Button>
          <Button style={{ marginLeft: 8 }}>暂存文章</Button>
        </div>
        <DatePicker style={{ width: '100%' }} placeholder="发布日期" />
        <TextArea className="introduce" rows="4" placeholder="请输入文章简介" onChange={handleChangeIntroduce} />
        <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }} />
        <Row gutter={12} style={{ marginTop: 12 }}>
          <Col span={12}>
          </Col>
          <Col span={12}>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AddArticle