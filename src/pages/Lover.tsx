/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 09:56:10
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 21:34:12
 * @Description:
 * @FilePath: /umi-demo/src/pages/Lover.tsx
 */
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import './index.less';

const Lover: React.FC = () => {
  const intl = useIntl();
  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.admin.subPage.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    >
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} className="lover">
          I love you my baby. You are the best girl in the world.
        </Typography.Title>
      </Card>
    </PageContainer>
  );
};

export default Lover;
