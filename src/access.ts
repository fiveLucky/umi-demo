/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 09:19:15
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 21:29:08
 * @Description:
 * @FilePath: /umi-demo/src/access.ts
 */
/**
 * @see https://umijs.org/docs/max/access
 *
 *
 * 控制菜单权限
 * 对应的key表示权限name，对应routes里的access字段
 * true则展示，false则隐藏
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; authList?: any[] } | undefined,
) {
  const { currentUser, authList = [] } = initialState ?? {};
  const authMap = authList.reduce((prev, cur) => {
    prev[cur.path] = cur.auth;
    return prev;
  }, {});
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    ...authMap,
  };
}
