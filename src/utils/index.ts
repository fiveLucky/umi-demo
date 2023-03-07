/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 19:58:11
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 21:32:14
 * @Description:
 * @FilePath: /umi-demo/src/utils/index.ts
 */

export function filterMenu(data: any[], authList: any[]) {
  data.forEach((item) => {
    if (item.children && item.children.length) {
      return filterMenu(item.children, authList);
    }
    const matchedItem = authList.find((authItem) => authItem.path === item.path);
    if (matchedItem && !matchedItem.auth) {
      item.hideInMenu = true;
    }
  });
}
