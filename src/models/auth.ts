/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 19:45:27
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 20:04:48
 * @Description:
 * @FilePath: /umi-demo/src/models/menu.ts
 */
import { useRequest } from 'ahooks';
import { fetchAuthList } from '@/services/global';

export default () => {
  const { data: autList } = useRequest(async () => {
    const res = await fetchAuthList();
    if (res) {
      return res;
    }
    return {};
  });
  console.log(autList, 'autList');

  return {
    autList,
  };
};
