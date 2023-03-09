/*
 * @Author: xuwenjie
 * @Date: 2023-03-09 09:59:43
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-09 10:38:09
 * @Description:
 * @FilePath: /umi-demo/src/components/AuthRender/index.tsx
 */
import * as React from 'react';
import { useModel } from '@umijs/max';
import { getButtonAuth } from '@/utils';

const AuthRender: React.FC<{
  authKey: string;
  children: any;
}> = ({ authKey, children }) => {
  const { initialState } = useModel('@@initialState');
  if (getButtonAuth(initialState?.authList || [], authKey)) {
    return children;
  }
  return null;
};

export default AuthRender;
