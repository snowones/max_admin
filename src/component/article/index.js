import React, { Component } from 'react';
import './index.scss';

import {Table,Button} from 'antd';

//封装好的公共方法
import {api,host} from '../../public/until'


class Article extends Component {
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
            url:host + 'selectAllArticle',
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
                sub_title : "",
                bg : "",
                theme : "",
                content : "",
                create_time : "",
            })
        }
        
        for(let j=0;j<data.length;j++){
            
            showData[j].id= data[j].id;
            showData[j].name= data[j].name;
            showData[j].title= data[j].title;
            showData[j].sub_title= data[j].sub_title;
            showData[j].bg= data[j].bg;
            showData[j].theme= data[j].theme;
            showData[j].content= data[j].content;
            showData[j].create_time= data[j].create_time;
        }

        this.setState({
            showData
        })

    }


    render() {
        const columns = [
            {
                title: '作者',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '题目',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '副标题',
                dataIndex: 'sub_title',
                key: 'sub_title',
            },
            {
                title: '主题',
                dataIndex: 'theme',
                key: 'theme',
            },
            {
                title: '文章背景',
                key: 'bg',
                render: (text, record) => (
                    <div>
                      <img style={{height:'49px'}} src={record.bg}></img>
                     </div>
                )
            },
            {
                title: '发表时间',
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

export default Article;