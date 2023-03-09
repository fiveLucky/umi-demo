/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 21:33:50
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-09 10:24:31
 * @Description:
 * @FilePath: /umi-demo/src/app.tsx
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

import { fetchAuthList } from './services/global';
// 抽离代码，各尽其责
export { default as layout } from '../config/layout';
export { default as request } from '../config/request';

const loginPath = '/user/login';

/**
 * 这个文档有问题 https://umijs.org/docs/api/runtime-config#typescript-%E6%8F%90%E7%A4%BA
 * 这里不能用defineApp，不然layout函数的参数不对
 */

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// 这个函数是初始化基础数据的
// 比如 用户信息，一些通用的枚举值等
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  authList: any[] | [];
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
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const authList = await fetchAuthList();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
      authList,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
    authList: [],
  };
}
