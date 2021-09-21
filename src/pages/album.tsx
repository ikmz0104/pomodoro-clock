import React from 'react';
import Header from 'components/Header';
import SimpleBottomNavigation from 'views/Navigation';

const album = () => {
  return (
    <div className="container">
      <Header title="アルバム" />
      <div className="content">
      </div>
      <SimpleBottomNavigation />
    </div>
  )
}

export default album
