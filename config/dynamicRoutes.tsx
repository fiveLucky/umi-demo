/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 17:41:39
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 19:43:32
 * @Description:
 * @FilePath: /umi-demo/config/dynamicRoutes.tsx
 */

/**
 * 下面是动态路由逻辑
 */
import Admin from '@/pages/Admin';
import Lover from '@/pages/Lover';
import TableList from '@/pages/TableList';
import { ChromeFilled, CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons';
export const authList = [
  {
    path: '/admin',
    auth: true,
  },
  {
    path: '/admin/sub-page',
    auth: false,
  },
  {
    path: '/dota',
    auth: true,
  },
];

// export function render(oldRender: () => void) {
//   // fetch('/api/routes').then(res=>res.json()).then((res) => {
//   //   extraRoutes = res.routes;
//   //   oldRender();
//   // })
//   // 这里假装请求回来了路由
//   Promise.resolve(fetchedRoutes).then((res) => {
//     extraRoutes = [...res,
//     // 添加一个新路由
//     {
//       path: '/dota',
//       name: '小宝贝',
//       layout: true,
//       // component: '@/pages/Lover',
//       element: <Lover />,
//     },];
//     oldRender();
//   })

//   // 这里应该把数据保存到store里
// }
// /**
// *
// * @see https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
// */
// // 这里是注册页面组件
// export function patchClientRoutes(props: { routes: object[] }) {
//   const { routes } = props;
//   console.log(props);

//   if (extraRoutes.length) {
//     // 直接修改源对象
//     routes.push(...extraRoutes);
//     console.log(routes);
//   }
// }

/**
 * 路由配置项
 * @see https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
 * @param data
 * @param authList
 */

type Item = {
  path?: string;
  children?: [];
  routes?: [];
  auth?: boolean;
  menuRender?: boolean;
  hideInMenu?: boolean;
};

function filterMenu(data: Item[], authList: Item[]) {
  data.forEach((item) => {
    if (item.routes && item.routes.length) {
      filterMenu(item.routes, authList);
    }
    const matchedItem = authList.find((authItem) => authItem.path === item.path);
    console.log(matchedItem, 'matchedItem');
    if (matchedItem && !matchedItem.auth) {
      item.hideInMenu = true;
    }
  });
}

export function fetchRoutes(defaultMenuData: object[]) {
  // 这里使用store的路由数据，只是渲染菜单，所以不需要component属性
  return Promise.resolve(authList).then((res) => {
    filterMenu(defaultMenuData, authList);
    return defaultMenuData;
  });
}
