import React from 'react'
import Header from 'components/Header';
import SimpleBottomNavigation from 'views/Navigation';

const user = () => {
  return (
    <div className="container">
      <Header title="ユーザー" />
      <div className="content">
      </div>
      <SimpleBottomNavigation />
    </div>
  )
}

export default user
