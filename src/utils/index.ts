/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 19:58:11
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-09 10:38:00
 * @Description:
 * @FilePath: /umi-demo/src/utils/index.ts
 */

export function filterMenu(data: any[], authList: any[]) {
  data.forEach((item) => {
    if (item.children && item.children.length) {
      return filterMenu(item.children, authList);
    }
    const matchedItem = authList.find((authItem) => authItem.key === item.path);
    if (matchedItem && matchedItem.type === 'menu' && !matchedItem.auth) {
      item.hideInMenu = true;
    }
  });
}

type Item = {
  [key: string]: string;
};

export function getButtonAuth(source: Item[] | [], target?: string) {
  return (
    !!source &&
    source.some((item) => {
      if (item.type === 'button' && item.key === target) {
        return item.auth;
      }
      return false;
    })
  );
}
