import React, { Component } from 'react';
import './index.scss';
import 'antd-mobile/dist/antd-mobile.css';
import { PullToRefresh } from 'antd-mobile';
//封装好的公共方法
import {api,host} from '../../public/until'


class MobileShop extends Component {
    constructor(props){
        super(props);
        this.state = {
            showData:[],//需要做展示的数据
            topHeader:'',//吸顶的元素
            refreshing:false,//下拉刷新
        }
    }

    componentDidMount(){
        //监听滚动效果
        document.addEventListener('scroll', this.bindHandleScroll,true);
        //加载数据
        this.onChange();
    }

    //组件销毁清空监听
    componentWillUnmount() {
        document.removeEventListener("scroll", this.bindHandleScroll,true);
    }

    bindHandleScroll = (event) =>{
        let {showData} = this.state;
        let length = showData.length;
        for(let i = 0;i<length;i++){
            //取出元素离底部的距离
            let offsetTop = this.refs[showData[i].name].getBoundingClientRect().top;
            //说明这个元素已到达顶部位置
            if(offsetTop < 0){
                this.setState({
                    topHeader:showData[i].name
                })
            }
            console.log(offsetTop);
        }
    };

    onChange = ()=>{
        api({
            url:host + 'selectAllGoods',
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
      
        //数据复制三遍作为item
        showData = showData.concat(showData,showData)

        //数据再复制五遍 作为五个类别
        showData = [
            {
                name:'List1',
                data:showData,
            },
            {
                name:'List2',
                data:showData,
            },
            {
                name:'List3',
                data:showData,
            },
            {
                name:'List4',
                data:showData,
            },
            {
                name:'List5',
                data:showData,
            }
        ]
        this.setState({
            showData
        })

    }

    render() {
        let {showData,topHeader} =this.state;
     
        return (
            <PullToRefresh
                damping={60}
                direction='down' 
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true });
                    setTimeout(() => {
                        this.setState({ refreshing: false });
                    }, 1000);
                }}
            >
                <div className='mobileShop'>
                    <div className="list">
                        {
                            showData.map((data) =>{
                                return(
                                    <div className="listItem">
                                        <div className={topHeader == data.name ? 'fixed itemHeader' : 'itemHeader'} ref={data.name}>{data.name}</div>
                                        {
                                            data.data.map((data)=>{
                                                return(
                                                    <div className='itemItem'>
                                                        {data.name + '：' +data.detail}
                                                    </div>
                                                )
                                            })
                                        }
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </PullToRefresh>  
        );
    }
}

export default MobileShop;