import { Avatar, Divider } from "antd";
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';

import '../static/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div><Avatar size={100} src="../static/img/avatar.png" /></div>
      <div className="author-intro">
        <div className="author-name">x1nG.</div>
        <div className="author-intro">嘿嘿嘿</div>
        <Divider>社交账号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account"  />
        <Avatar size={28} icon={<QqOutlined />}  className="account" />
        <Avatar size={28} icon={<WechatOutlined />}  className="account"  />
      </div>
    </div>
  )
}

export default Author