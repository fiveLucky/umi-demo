/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 19:48:35
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 21:33:41
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
      path: '/admin',
      auth: true,
    },
    {
      path: '/admin/sub-page',
      auth: false,
    },
    {
      path: '/dota',
      auth: false,
    },
  ]);
}
