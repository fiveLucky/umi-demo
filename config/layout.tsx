/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 16:03:20
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-09 09:48:32
 * @Description:
 * @FilePath: /umi-demo/config/layout.tsx
 */

import React from 'react';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { SettingDrawer } from '@ant-design/pro-components';
import { history, Link, useModel } from '@umijs/max';
import { LinkOutlined } from '@ant-design/icons';
import Footer from '@/components/Footer';
import { Question, SelectLang } from '@/components/RightContent';
import { AvatarDropdown, AvatarName } from '@/components/RightContent/AvatarDropdown';
import { filterMenu } from '@/utils';
const isDev = process.env.NODE_ENV === 'development';

const loginPath = '/user/login';

// 这个是配置页面布局的，内置了antd的menu 和 layout组件
// ProLayout 支持的api https://procomponents.ant.design/components/layout

const layout: RunTimeLayoutConfig = (props) => {
  const { initialState, setInitialState } = props;
  return {
    menu: {
      request: (params, defaultMenuData) => {
        filterMenu(defaultMenuData, initialState?.authList || []);
        return Promise.resolve(defaultMenuData);
      },
    },
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // 访问任何一个页面，都会走这里，判断登录态
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

export default layout;
