import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Router 임포트
import Desktop from './components/Desktop/Desktop';
import StatusBar from './components/StatusBar/StatusBar';
import Dock from './components/Dock/Dock';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <StatusBar />
        <Desktop />
        <Dock />
      </div>
    </Router>
  );
};

export default App;
