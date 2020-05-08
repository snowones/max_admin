import React,{ Component } from 'react';

import { Menu, Icon } from 'antd';

// 引入子菜单组件
const SubMenu = Menu.SubMenu; 

class Nav extends Component {
    render(){
        return(
            <Menu
                id = "home_nav"
                mode = "inline" 
                theme = "dark"  
                defaultSelectedKeys={['1']}
             >
                <SubMenu
                        key="sub1"
                        title={<span><Icon type="pie-chart" /><span>主页</span></span>}
                    >
                        <Menu.Item key="1"><a href="#/main">主页</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="dashboard" /><span>论坛</span></span>}
                    >
                        <Menu.Item key="2"><a href="#/article">帖子管理</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={<span><Icon type="dashboard" /><span>文章</span></span>}
                    >
                        <Menu.Item key="2"><a href="#/article">文章管理</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={<span><Icon type="dashboard" /><span>闲置</span></span>}
                    >
                        <Menu.Item key="2"><a href="#/article">商品管理</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={<span><Icon type="dashboard" /><span>相册</span></span>}
                    >
                        <Menu.Item key="2"><a href="#/article">相册管理</a></Menu.Item>
                    </SubMenu>
            </Menu>
        )
    }

}

export default Nav;