import React,{ Component } from 'react';

import { Layout} from 'antd';

import { renderRoutes } from 'react-router-config';//引入renderRoutes
import Nav from './nav/index'
const { Header, Footer, Sider, Content } = Layout;
// 引入子菜单组件



export default class BasicLayout extends React.Component {

render() {
    return (
        <Layout>
            <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                <Nav/>
            </Sider>
            <Layout >
                <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>微信引流后台</Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 460 }}>
                    {renderRoutes(this.props.route.children)}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Design ©2020 Created by zyx</Footer>
            </Layout>
        </Layout>
        )
    }

}