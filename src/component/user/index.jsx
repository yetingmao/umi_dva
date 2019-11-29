import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Icon, Dropdown, Menu, Modal } from 'antd';
import './style.less';
export default class extends Component {
    state = {
        icon: 'arrows-alt',
        count: 100,
        visible: false,
        isLogin: window.localStorage.getItem('token') ? true : false,
        avatar: require('@/assets/img/defaultUser.jpg')
    }
    toggle = () => {
        this.props.onToggle()
    }
    logout = () => {
        window.localStorage.removeItem('token')
        router.push('/login');
    }

    render() {
        const { visible, avatar, isLogin } = this.state
        const notLogin = (
            <div>
                <Link to={{ pathname: '/home' }} style={{ color: 'rgba(0, 0, 0, 0.65)' }}>请登录</Link>&nbsp;
      </div>
        )
        const menu = (
            <Menu className='li_menu'>
                <Menu.ItemGroup title='用户中心' className='menu_group'>
                    <Menu.Item>你好 - admin</Menu.Item>
                    <Menu.Item>个人信息</Menu.Item>
                    <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='设置中心' className='menu_group'>
                    <Menu.Item>个人设置</Menu.Item>
                    <Menu.Item>系统设置</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        )
        const login = (
            <Dropdown overlay={menu}>
                <img onClick={() => this.setState({ visible: true })} src={avatar} alt="" />
            </Dropdown>
        )
        return (
            <div className="component_user" >
                <Icon
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    className='user_trigger'
                    onClick={this.toggle}
                />
                <div style={{ lineHeight: '64px', float: 'right' }}>
                    <ul className='user_ul'>
                        <li>
                            {isLogin ? login : notLogin}
                        </li>
                    </ul>
                </div>
                <Modal
                    footer={null} closable={false}
                    visible={visible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({ visible: false })}>
                    <img src={avatar} alt="" width='100%' />
                </Modal>
            </div>
        );
    }
}



