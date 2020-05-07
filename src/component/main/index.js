import React, { Component } from 'react';
import './index.scss';

import {Table,Button    } from 'antd';

//封装公共请求方法
function api({ url, args='', callback }) {
    let argsStr = '';
    if(args!='') {
        for(let key in args) {
            argsStr += key + '=' + args[key] + '&';
        }
        argsStr = '?' + argsStr.substr(0, argsStr.length-1);
    }
    
    fetch(url+argsStr)
    .then(response => response.json())
    .then(res => {
        callback(res);
    });
}

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            showData:[],//需要做展示的数据
        }
    }

    componentDidMount(){
        this.onChange();
    }

    onChange = ()=>{
        api({
            url:'http://182.92.64.245/tp5/public/index.php/index',
            // args: {
            // },
            callback: (res) => {
                this.showData(res);
            }
        });
    }

    /**
     * 数据处理函数
     * 将返回的数据处理成数据表格需要的数据
     */
    showData = (data)=>{
        let showData = [];// 渲染的数据
        
        for(let i=0;i<data.length;i++){
            showData.push({
                id : "",
                name : "",
                count:"",
                password :"",
                address:"",
                sign_person:"",
                is_vip:"",
            })
        }
        
        for(let j=0;j<data.length;j++){
            let is_vip = '普通';
            if(data[j].is_vip){
                is_vip = 'vip';
            }
            showData[j].id= data[j].id;
            showData[j].name= data[j].name;
            showData[j].count= data[j].count;
            showData[j].password= data[j].password;
            showData[j].address= data[j].address;
            showData[j].sign_person= data[j].sign_person;
            showData[j].is_vip= is_vip;
        }

        this.setState({
            showData
        })

    }

    vipAction = (is_vip,id)=>{
        let vipChange;
        if(is_vip == '普通'){
            vipChange = 1;
        }else{
            vipChange = 0;
        }

        api({
            url:'http://182.92.64.245/tp5/public/Index/index/change',
            args: {
                is_vip : vipChange,
                id
            },
            callback: (res) => {
                this.onChange();
            }
        });

    }


    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '账号',
                dataIndex: 'count',
                key: 'count',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '个性签名',
                dataIndex: 'sign_person',
                key: 'sign_person',
            },
            {
                title: '会员',
                dataIndex: 'is_vip',
                key: 'is_vip',
            },
            {
                title:'操作',
                key: 'action',
                render: (record) => (
                   
                    <div>
                        <Button style={{color:"#63B8FF"}} onClick = {() => {
                            this.vipAction(record.is_vip,record.id);
                        }} >升级/降级
                        </Button>
                    </div>
                ),
            }
        ];
        return (
            <div>
                <Table 
                    dataSource={this.state.showData} 
                    columns={columns}
                    rowKey={record => record.id}
                />;
            </div>
        );
    }
}

export default Main;