import React from 'react';
import CategoryList from 'components/CategoryList';
import Header from 'components/Header';
import { AutoComplete } from 'material-ui';
import { Button } from '@material-ui/core';


const SettingPage: React.FC = (props) => {
  return (
    <>
      <Header title="設定" />
      <div className="content">
        <div style={{ marginBottom: 40 }}>
          <p className="title">カテゴリー</p>
        </div>
        <div>
          <p className="title">作業時間</p>
        </div>
        <div>
          <p className="title">休憩時間</p>
        </div>
        <Button>完了</Button>
      </div>
    </>
  );
};

export default SettingPage;