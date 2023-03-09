/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 19:48:35
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-09 10:27:17
 * @Description:
 * @FilePath: /umi-demo/src/services/global.ts
 */
// import { request } from '@umijs/max';

export async function fetchAuthList() {
  // return request<{
  //   data: API.CurrentUser;
  // }>('/api/currentUser', {
  //   method: 'GET',
  // });
  return Promise.resolve([
    {
      key: '/admin',
      auth: true,
      type: 'menu',
    },
    {
      key: '/admin/sub-page',
      auth: false,
      type: 'menu',
    },
    {
      key: '/dota',
      auth: false,
      type: 'menu',
    },
    {
      key: '/list:create',
      auth: false,
      type: 'button',
    },
  ]);
}
