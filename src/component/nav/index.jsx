import React, { Component } from 'react';
import Link from 'umi/link';
import withRouter from 'umi/withRouter'
import { Icon, Menu } from 'antd';
import './style.less';

const menus = [
    {
        title: '首页',
        icon: 'home',
        key: '/home'
    },
    // {
    //     title: '基本',
    //     icon: 'laptop',
    //     key: '/laptop',
    //     subs: [
    //         { key: '/laptop/list', title: '列表', icon: 'desktop', },
    //         { key: '/laptop/gobang', title: '五子棋', icon: 'user', },
    //     ]
    // },
    // {
    //     title: '组件',
    //     icon: 'edit',
    //     key: '/edit',
    //     subs: [
    //         {
    //             key: '/edit/form',
    //             title: '表单',
    //             icon: '',
    //             subs: [
    //                 { key: '/edit/form/adminform', title: '基础表单', icon: '' },
    //                 { key: '/edit/form/stepform', title: '分步表单', icon: '' }
    //             ]
    //         },
    //         { key: '/edit/admin', title: '上传', icon: '' },
    //     ]
    // },
    // {
    //     title: '关于',
    //     icon: 'info-circle-o',
    //     key: '/admin'
    // }
]

@withRouter
class SiderNav extends Component {
    state = {
        openKeys: [],
        selectedKeys: []
    };

    componentDidMount() {
        // 防止页面刷新侧边栏又初始化了
        console.log(1, this.props.location.pathname)
        const pathname = this.props.location.pathname
        //获取当前所在的目录层级
        const rank = pathname.split('/')
        console.log(2, rank)
        switch (rank.length) {
            case 2:  //一级目录
                this.setState({
                    selectedKeys: [pathname]
                })
                break;
            case 4: //三级目录，要展开两个subMenu
                this.setState({
                    selectedKeys: [pathname],
                    openKeys: [rank.slice(0, 2).join('/'), rank.slice(0, 3).join('/')]
                })
                break;
            default:
                this.setState({
                    selectedKeys: [pathname],
                    openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
                })
        }
    }

    componentWillReceiveProps(nextProps) {
        //当点击面包屑导航时，侧边栏要同步响应
        const pathname = nextProps.location.pathname
        if (this.props.location.pathname !== pathname) {
            this.setState({
                selectedKeys: [pathname],
            })
        }
    }

    onOpenChange = (openKeys) => {
        //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
        if (openKeys.length === 0 || openKeys.length === 1) {
            this.setState({
                openKeys
            })
            return
        }

        //最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
        //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
        //只适用于3级菜单
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({
                openKeys
            })
        } else {
            this.setState({
                openKeys: [latestOpenKey]
            })
        }
    }

    renderMenuItem = ({ key, icon, title, }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    {icon && <Icon type={icon} />}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }
    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }

    render() {
        const { openKeys, selectedKeys } = this.state
        return (
            <div className="component_nav" >
                <div className="nav_logo" />
                <Menu
                    onOpenChange={this.onOpenChange}
                    onClick={({ key }) => this.setState({ selectedKeys: [key] })}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    theme={this.props.theme ? this.props.theme : 'dark'}
                    mode='inline'>
                    {
                        menus && menus.map(item => {
                            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                        })
                    }
                </Menu>
            </div>
        );
    }
}
export default SiderNav


