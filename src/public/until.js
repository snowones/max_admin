var iTime;
var Tools = {
    // 验证手机号的有效性,可以接受 Number 也可以接受 字符串
    isPhone(phone) {
        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            return false; 
        }else{
            return true;
        } 
    },

    // fetch接口封装
    api: function({ url, args='', callback }) {
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
    },

    /**
     * 把json解析成字符串
     * author Bin
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    childStr: function (data) {
        let childArr = [];
        if(typeof(data) == 'object'){
        for (let key in data) {
            for (let i in this.childStr(data[key])) {
            childArr.push('[' + key + ']' + this.childStr(data[key])[i]);
            }
        }
        } else {
        childArr.push(('=' + encodeURIComponent(data)));
        }
        return childArr;
    },
    /**
     * 把json解析成字符串
     * author bin
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    buildStr: function (data){
        let str = '';
        for (let key in data) {
        for (let i in this.childStr(data[key])) {
            str += (key + this.childStr(data[key])[i] + '&');
        }
        }
        return str.substr(0, str.length-1);
    },
    buildArgs:function(formData,args,keys = []){
        for(let i in args){
            if(typeof(args[i]) == 'object'){
                let newkeys = [...keys];
                if(newkeys.length > 0){
                    newkeys[0] = newkeys[0] + `[${i}]`;
                }else{
                    newkeys.push(i);
                }
                this.buildArgs(formData,args[i],newkeys);
            }else{
                let key = '';
                keys.map( c => {
                    this.isEmpty(key) ? key = c : key += `[${c}]`;
                })
                this.isEmpty(key) ? formData.append(i,args[i]) : formData.append(key+`[${i}]`,args[i]);
            }
        }
        return formData;
    },

    loading:function(state,text = "数据加载中，请稍后",type = 1){
        let element = document.getElementById("c-loading");
        if(state == 'show'){
            if(this.isEmpty(element)){
                let html =`<div id="c-loading" style="display:none">
                    <div style="background: #000;position: fixed;width: 100%;height: 100%;top: 0;left: 0;z-index: 9999;transition: opacity .3s;opacity: 0.05;"></div>
                    <div  style="position: fixed;right: 40%;bottom: 45%;z-index:999999;margin-right:10px;padding: 20px;background-color: white;">
                        <div>
                        <img src = "//q.aiyongbao.com/trade/img/loading.gif" style="margin-right:10px;vertical-align: middle;"/>
                        <font style="vertical-align: middle;color:#999">${text}</font>
                        </div>
                    </div>
                </div>`;
                if(type == 0) html = `<div id="c-loading" style="display:none;position: fixed;right: 40%;bottom: 45%;z-index: 999999;margin-right:10px;"><img src = "//q.aiyongbao.com/trade/img/loading.gif" style="margin-right:10px;vertical-align: middle;"/><font style="vertical-align: middle;color:#999">${text}</font></div>`;
                let div = document.createElement('div');
                div.innerHTML = html;
                document.getElementById('root').appendChild(div);
                iTime = setTimeout(function(){
                    try{
                        document.getElementById("c-loading").style.display = "block";
                    }catch(e){
                    }
                    setTimeout(()=>{
                        let element = document.getElementById("c-loading");
                        if (iTime !="")clearTimeout(iTime);
                        if(element) element.parentNode.removeChild(element);
                    },5000)
                },600);
  
            }
  
        }else{
            if (iTime !="")clearTimeout(iTime);
            if(element) element.parentNode.removeChild(element);
  
        }
    },
    /* 判断是否为空 */
    isEmpty: function(key){
        if (typeof(key) === 'string') {
            key = key.replace(/(^\s*)|(\s*$)/g, '');
            if (key == '' || key == null || key == 'null' || key == undefined || key == 'undefined') {
                return true
            } else {
                return false
            }
        } else if (typeof(key) === 'undefined') {
            return true;
        } else if (typeof(key) == 'object') {
            for(let i in key){
                return false;
            }
            return true;
        }else if (typeof(key) == 'boolean'){
            return false;
        }
    },
    /**
     * zyx
     * 2019/10/17
     * 给obj对象重新赋值 把其中等于null的值赋值为''防止结构赋值时出错
     */
    setObj : function(obj){
        for(let index in obj){
            if(!obj[index]){
                obj[index] = ''
            }
        }
        return obj;
    },
    /**
     * zyx
     * 2019/10.22
     * 时间戳转时间‘YYYY-MM-DD HH:mm:ss’
     */
    time : function(time){
        //从数据库拿出来的时间戳是字符串形式 需要转化为数字
        time = parseInt(time);
        // 增加8小时
        let date = new Date(time + 8 * 3600 * 1000); 
        return date.toJSON().substr(0, 19).replace('T', ' ');
        //Date的‘toJSON’方法返回格林威治时间的JSON格式字符串，实际是使用‘toISOString’方法的结果。
        //字符串形如‘2018-08-09T10:20:54.396Z’，转化为北京时间需要额外增加八个时区，
        //我们需要取字符串前19位，然后把‘T’替换为空格，即是我们需要的时间格式。
    }
}

export const isPhone = Tools.isPhone.bind(Tools);
export const api = Tools.api.bind(Tools);
export const isEmpty = Tools.isEmpty.bind(Tools);
//host 请求地址
export const host = 'http://182.92.64.245/tp5/public/index.php/index/index/';
export const setObj = Tools.setObj.bind(Tools);
export const time = Tools.time.bind(Tools);