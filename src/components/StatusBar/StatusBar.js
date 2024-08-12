import React, { useState, useEffect, useRef } from 'react';
import cookie from 'react-cookies';
import styles from './StatusBar.module.css';
import NicknameModal from './NicknameModal';
import useAxiosInstance from '../../axios/useAxiosInstance';
import { useNavigate } from 'react-router-dom';

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가
  const loginRef = useRef(null);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = cookie.load('token');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !profile) {
      axiosInstance.get("/api/users/profile")
        .then(response => {
          setProfile(response.data);
          if (!response.data.nickName) {
            setShowNicknameModal(true);
          }
        })
        .catch(error => {
          console.error('Profile fetch error:', error);
        });
    }
  }, [isLoggedIn, axiosInstance, profile]);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  const handleLoginClick = () => {
    setShowLoginOptions(!showLoginOptions);
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleClickOutside = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      setShowLoginOptions(false);
      setShowProfileOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const googleLogin = () => {
    window.location.href = '/api/oauth2/authorization/google';
  };

  const kakaoLogin = () => {
    window.location.href = '/api/oauth2/authorization/kakao';
  };

  const naverLogin = () => {
    window.location.href = '/api/oauth2/authorization/naver';
  };

  const logout = () => {
    cookie.remove('token', { path: '/' }); // 쿠키 삭제
    setProfile(null);
    setIsLoggedIn(false);
    setShowProfileOptions(false);
    window.location.href = '/';
  };

  const handleNicknameSubmit = (nickname) => {
    axiosInstance.patch('/api/users/nickname', null, {
      params: {
        nickName: nickname
      }
    })
    .then(response => {
      setProfile({ ...profile, nickName: nickname });
      setShowNicknameModal(false);
    })
    .catch(error => {
      console.error('Nickname setting error:', error);
    });
  };

  return (
    <div className={styles.statusBar}>
      <div className={styles.leftSection}>
        <span>{formattedDate} {formattedTime}</span>
      </div>
      <div className={styles.rightSection} ref={loginRef}>
        {isLoggedIn ? (
          profile && (
            <div>
              <span className={styles.nickname} onClick={handleProfileClick}>
                안녕하세요, {profile.nickName || '사용자'}님
              </span>
              {showProfileOptions && (
                <div className={styles.profileOptions}>
                  <button className={styles.logoutButton} onClick={logout}>
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )
        ) : (
          <>
            <button 
              className={styles.loginButton} 
              onClick={handleLoginClick}
            >
              Login
            </button>
            {showLoginOptions && (
              <div className={styles.loginOptions}>
                <button className={styles.naverLoginButton} onClick={naverLogin}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/button/naver_login_button.png`} 
                    alt="Naver Login" 
                    className={styles.naverLoginImage}
                  />
                </button>
                <button className={styles.googleLoginButton} onClick={googleLogin}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/button/google_login_button.png`} 
                    alt="Google Login" 
                    className={styles.googleLoginImage}
                  />
                </button>
                <button className={styles.kakaoLoginButton} onClick={kakaoLogin}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/button/kakao_login_button.png`} 
                    alt="Kakao Login" 
                    className={styles.kakaoLoginImage}
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {showNicknameModal && (
        <NicknameModal onSubmit={handleNicknameSubmit} />
      )}
    </div>
  );
};

export default StatusBar;
