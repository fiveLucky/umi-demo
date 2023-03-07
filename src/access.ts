/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 09:19:15
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 09:31:17
 * @Description:  
 * @FilePath: /my-app/src/access.ts
 */
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * 
 * 
 * 控制菜单权限
 * 对应的key表示权限name，对应routes里的access字段
 * true则展示，false则隐藏
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: true,
    // canAdmin: currentUser && currentUser.access === 'admin',
  };
}
