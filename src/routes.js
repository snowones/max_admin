//基本布局页面
import Basiclayout from './layout/index';
//主页面
import Main from './component/main/index';
//文章详情页面
import Article from './component/article/index';
//登录页面
// import Login from './component/login/index';


var Routes = [ 
        {   
            path: '/',
            component: Basiclayout,
            children: [
                {
                    path: '/',
                    exact: true,
                    component: Main
                },
                {
                    path: '/main',
                    exact: true,
                    component: Main
                },
                {
                    path: '/article',
                    exact: true,
                    component: Article
                },
                // {
                //     path: '/login',
                //     exact: true,
                //     component: Login
                // }
            ]
         },
        
]

export default Routes