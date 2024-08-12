import React, { useState, useEffect } from 'react';
import styles from './Dock.module.css';

const icons = [
  { name: 'Finder', iconUrl: `${process.env.PUBLIC_URL}/images/icons/blog.png` },
  { name: 'Safari', iconUrl: `${process.env.PUBLIC_URL}/images/icons/guestbook.png` },
  { name: 'Mail', iconUrl: `${process.env.PUBLIC_URL}/images/icons/portfolio.png` },
];

const Dock = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientX < 10) { // 화면 왼쪽 끝에 마우스를 가져가면 독 확장
        setIsExpanded(true);
      } else if (event.clientX > 80 && !event.target.closest(`.${styles.dockContainer}`)) {
        // 마우스가 독을 벗어나면 독 최소화
        setIsExpanded(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`${styles.dockContainer} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <ul className={styles.iconList}>
        {icons.map((icon, index) => (
          <li key={index} className={styles.iconItem}>
            <img src={icon.iconUrl} alt={icon.name} className={styles.iconImage} />
            {isExpanded && <span className={styles.iconLabel}>{icon.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dock;
