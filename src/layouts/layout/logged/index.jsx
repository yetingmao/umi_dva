import React, { Component } from 'react';
import { User, Nav } from "../../../component";
import { Layout } from 'antd';
import './style.less';
const { Content, Footer, Sider } = Layout;

export default class extends Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    // console.log(this)  状态提升后，到底是谁调用的它
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible
          trigger={null}
          collapsed={this.state.collapsed}>
          <Nav />
        </Sider>
        <Layout>
          <User collapsed={this.state.collapsed} onToggle={this.toggle} />
          <Content className="content-container">
            <div >{this.props.children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>送变电 ©2019 Created by 飙风软件</Footer>
        </Layout>
      </Layout>
    );
  }
}



