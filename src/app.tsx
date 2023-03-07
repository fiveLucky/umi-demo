import Footer from '@/components/Footer';
import { Question, SelectLang } from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import React from 'react';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import fetchedRoutes from '../config/routes';



const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';


let extraRoutes: object[] = [];

// 这里处理路由数据
function merge(routes: object[], target: object[]){
  // 直接修改源对象
  // eslint-disable-next-line no-param-reassign
  console.log(target);
  if(target.length) {
    // routes.push(...target);
  }
}
/**
 * 
 * @see https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
 */
// 先执行，发送路由请求
// export function render(oldRender: () => void) {
//   // fetch('/api/routes').then(res=>res.json()).then((res) => { 
//   //   extraRoutes = res.routes;
//   //   oldRender();
//   // })
//   // 这里假装请求回来了路由
//   Promise.resolve(fetchedRoutes).then((res) => {
//     extraRoutes = [...res,
//       // 添加一个新路由
//       {
//         path: '/dota',
//         name: '小宝贝',
//         icon: 'love',
//         component: '@pages/Lover',
//       },
//     ];
//   })
//   oldRender();
// }
// 后执行
// export function patchClientRoutes({ routes = [] }) {
//   merge(routes, extraRoutes);
// }


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// 这个函数是初始化基础数据的
// 比如 用户信息，一些通用的枚举值等
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      // 接口返回401，会走这里，跳转到登录页
      // history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// 这个是配置页面布局的，内置了antd的menu 和 layout组件
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // 访问任何一个页面，都会走这里，判断登录态
        // history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
// 配置接口请求的通用处理，比如error handler，统一的错误提示，错误上报啥的
export const request = {
  ...errorConfig,
};
