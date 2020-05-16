import React, { Component } from 'react';
import './index.scss';

import {Table,Button} from 'antd';

//封装好的公共方法
import {api,host} from '../../public/until'


class Picture extends Component {
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
            url:host + 'selectAllPicture',
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
                avatar_url : "",
                contentLength : "",
                contents : "",
                create_time : "",
            })
        }
        
        for(let j=0;j<data.length;j++){
            let contents = JSON.parse(data[j].contents);
            let contentLength = contents.length

            showData[j].id= data[j].id;
            showData[j].name= data[j].name;
            showData[j].avatar_url= data[j].avatar_url;
            showData[j].contentLength= contentLength;
            showData[j].contents= contents;
            showData[j].create_time= data[j].create_time;
        }

        this.setState({
            showData
        })

    }

    delete = (id)=>{
        api({
            url:host + 'deletePictureById',
            args: {
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
                title: '作者头像',
                key: 'avatar_url',
                render: (text, record) => (
                    <div>
                      <img style={{height:'49px'}} src={record.avatar_url}></img>
                     </div>
                )
            },
            {
                title: '相册名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '照片数量',
                dataIndex: 'contentLength',
                key: 'contentLength',
            },
            {
                title: '相册背景',
                key: 'bg',
                render: (text, record) => (
                    <div>
                      <img style={{height:'49px'}} src={record.contents[0]}></img>
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
                           this.delete(record.id)
                        }} >删除
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

export default Picture;