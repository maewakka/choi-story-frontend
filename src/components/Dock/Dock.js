import React from 'react';
import styles from './Dock.module.css';

const icons = [
  { name: 'Finder', iconUrl: '/icons/finder.png' },
  { name: 'Safari', iconUrl: '/icons/safari.png' },
  { name: 'Mail', iconUrl: '/icons/mail.png' },
  { name: 'Music', iconUrl: '/icons/music.png' },
  { name: 'System Preferences', iconUrl: '/icons/system-preferences.png' },
];

const Dock = () => {
  return (
    <div className={styles.dockContainer}>
      <ul className={styles.iconList}>
        {icons.map((icon, index) => (
          <li key={index} className={styles.iconItem}>
            <img src={icon.iconUrl} alt={icon.name} className={styles.iconImage} />
            <span className={styles.iconLabel}>{icon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dock;
