//基本布局页面
import Basiclayout from './layout/index';
//主页面
import Main from './component/main/index';
//文章详情页面
import Article from './component/article/index';
//论坛详情页面
import Discuss from './component/discuss/index';
//闲置详情页面
import Shop from './component/shop/index';
//相册详情页面
import Picture from './component/picture/index';
//手机端闲置物品详情页面
import MobileShop from './component/MobileShop/index';
//登录页面
// import Login from './component/login/index';


export const Routes = [ 
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
                {
                    path: '/discuss',
                    exact: true,
                    component: Discuss
                },
                {
                    path: '/shop',
                    exact: true,
                    component: Shop
                },
                {
                    path: '/picture',
                    exact: true,
                    component: Picture
                },
                // {
                //     path: '/login',
                //     exact: true,
                //     component: Login
                // }
            ]
         },
        
]

export const MobileRoutes = [
    {
        path: '/mobileShop',
        exact: true,
        component: MobileShop
    },
]