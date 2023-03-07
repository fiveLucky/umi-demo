/*
 * @Author: xuwenjie
 * @Date: 2023-03-07 09:56:10
 * @LastEditors: xuwenjie
 * @LastEditTime: 2023-03-07 10:00:11
 * @Description:  
 * @FilePath: /my-app/src/pages/Lover.tsx
 */
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
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
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
      <Card>
        
        <Typography.Title level={2} className="lover">
          I love you my baby. You are the best girl in the world.
        </Typography.Title>
      </Card>
      
    </PageContainer>
  );
};

export default Lover;
