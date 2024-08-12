import React from 'react';
import styles from './Desktop.module.css';

const Desktop = () => {
  const backgroundImageUrl = `${process.env.PUBLIC_URL}/images/pexels-8moments-1323550.jpg`;

  return (
    <div
      className={styles.desktopContainer}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      {/* 여기에는 바탕화면의 아이콘이나 다른 콘텐츠를 추가할 수 있습니다. */}
    </div>
  );
};

export default Desktop;
