import React, { Component } from 'react';
import './index.scss';

import {Table,Button} from 'antd';

//封装好的公共方法
import {api,host} from '../../public/until'


class Discuss extends Component {
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
            url:host + 'selectAllDiscuss',
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
        console.log(data);
        let showData = [];// 渲染的数据
        
        for(let i=0;i<data.length;i++){
            showData.push({
                id : "",
                name : "",
                title : "",
                content : "",
                content_img : "",
                create_time : "",
            })
        }
        
        for(let j=0;j<data.length;j++){
            
            let content_img = JSON.parse(data[j].content_img);
            showData[j].id= data[j].id;
            showData[j].name= data[j].name;
            showData[j].title= data[j].title;
            showData[j].content= data[j].content;
            showData[j].content_img= content_img;
            showData[j].create_time= data[j].create_time;
        }

        this.setState({
            showData
        })

    }


    render() {
        const columns = [
            {
                title: '题主',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '题目',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '内容图片',
                key: 'content_img',
                render: (text, record) => (
                    <div>
                        <img style={{height:'49px'}} src={record.content_img[0]}></img>
                    </div>
                )
            },
            {
                title: '发时间',
                dataIndex: 'create_time',
                key: 'create_time',
            },
           
            {
                title:'操作',
                key: 'action',
                render: (record) => (
                   
                    <div>
                        <Button style={{color:"#63B8FF"}} onClick = {() => {
                            console.log('点击了编辑')
                        }} >编辑
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

export default Discuss;