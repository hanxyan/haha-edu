// 首页
// import App from '../App'
const HOME = () => import('@/views/Home.vue');
const ABOUT = () => import(/* webpackChunkName: "about" */'@/views/About.vue');
const LOGIN_CAPTCHA=() => import('@/views/login/login-captcha.vue');
const INDEX=() => import('@/views/index/index.vue');
const USER_INDEX=() => import('@/views/user/index.vue');
const MESSAGE=() => import('@/views/message/message.vue');
const MY_COURSE_INDEX=() => import('@/views/my-course/index.vue');
const COURSE_DETAIL=() => import('@/views/course-detail/index.vue');
const COURSE_LIST=() => import('@/views/course-list/index.vue');


export const getMenuList=()=>{
	// let menu=[];
	let filterMenu=[
		//地址为空时跳转home页面
        {
            path: '/',
            redirect: '/index'
        },
        {
			path:'/index',
			name:'index',
			component: INDEX,
			children:null
		},
		{
			path:'/me',
			name:'me',
			component: USER_INDEX,
			children:null
		},
		{
			path:'/myCourse',
			name:'myCourse',
			component: MY_COURSE_INDEX,
			children:null
		},
		{
			path:'/message',
			name:'message',
			component: MESSAGE,
			children:null
		},
        {
			path:'/login',
			name:'login',
			component: LOGIN_CAPTCHA,
			meta:{keepAlive:true},
			children:null
		},
		{
			path:'/courseList',
			name:'courseList',
			component: COURSE_LIST,
			children:null
		},
		{
			path:'/courseDetail',
			name:'courseDetail',
			meta:{keepAlive:false},
			component: COURSE_DETAIL,
			children:null
		},
		{
			path:'/home',
			name:'home',
			component: HOME,
			children:null
		},
		{
			path:'/about',
			name:'about',
			component: ABOUT,
			children:null
		}
	];

	// let menu=[{
	// 	path: '/',
	// 	component: App, //顶层路由，对应index.html
	// 	children:filterMenu
	// }]
	return filterMenu;
}

export default getMenuList();