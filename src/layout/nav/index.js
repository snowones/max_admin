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
                        title={<span><Icon type="pie-chart" /><span>Main</span></span>}
                    >
                        <Menu.Item key="1"><a href="#/main">Main</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="dashboard" /><span>Other</span></span>}
                    >
                        <Menu.Item key="2"><a href="#/article">Article</a></Menu.Item>
                    </SubMenu>
            </Menu>
        )
    }

}

export default Nav;