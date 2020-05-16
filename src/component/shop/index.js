import React, { Component } from 'react';
import './index.scss';

import {Table,Button} from 'antd';

//封装好的公共方法
import {api,host} from '../../public/until'


class Shop extends Component {
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
            url:host + 'selectAllGoods',
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
                contact : "",
                name : "",
                discount : "",
                detail : "",
                remarks : "",
                image : "",
                create_time : "",
            })
        }
        
        for(let j=0;j<data.length;j++){
            let image = JSON.parse(data[j].image);
            showData[j].id= data[j].id;
            showData[j].contact= data[j].contact;
            showData[j].name= data[j].name;
            showData[j].discount= data[j].discount;
            showData[j].detail= data[j].detail;
            showData[j].remarks= data[j].remarks;
            showData[j].image= image;
            showData[j].create_time= data[j].create_time;
        }

        this.setState({
            showData
        })

    }


    render() {
        const columns = [
            {
                title: '卖家',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '联系方式',
                dataIndex: 'contact',
                key: 'contact',
            },
            {
                title: '价格',
                dataIndex: 'discount',
                key: 'discount',
            },
            {
                title: '详情',
                dataIndex: 'detail',
                key: 'detail',
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
            },
            {
                title: '商品图片',
                key: 'image',
                render: (text, record) => (
                    <div>
                      <img style={{height:'49px'}} src={record.image[0]}></img>
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

export default Shop;