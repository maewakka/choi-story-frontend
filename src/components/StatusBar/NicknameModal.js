import React, { useState, useEffect } from 'react';
import useAxiosInstance from '../../axios/useAxiosInstance';
import styles from './NicknameModal.module.css';

const NicknameModal = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(null);
  const [nicknameRuleValid, setNicknameRuleValid] = useState(false); // 규칙 유효성 상태 추가
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    // 3글자 이상, 공백 불가 규칙 체크
    if (nickname.length >= 3 && !/\s/.test(nickname)) {
      setNicknameRuleValid(true);
    } else {
      setNicknameRuleValid(false);
    }

    if (nickname && nicknameRuleValid) {
      const validateNickname = async () => {
        try {
          const response = await axiosInstance.get('/api/users/nickname', {
            params: { nickName: nickname }
          });
          setNicknameValid(!response.data);
        } catch (error) {
          console.error('Nickname validation error:', error);
          setNicknameValid(false);
        }
      };
      validateNickname();
    } else {
      setNicknameValid(null);
    }
  }, [nickname, nicknameRuleValid, axiosInstance]);

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSubmit = () => {
    if (nicknameValid && nicknameRuleValid) {
      onSubmit(nickname);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>닉네임 설정</h2>
        <input 
          type="text" 
          value={nickname} 
          onChange={handleChange} 
          placeholder="닉네임을 입력하세요" 
          className={styles.nicknameInput}
        />
        <p className={styles.rules}>* 닉네임은 3글자 이상, 공백 불가입니다.</p>
        {nicknameValid !== null && (
          <p className={nicknameValid ? styles.validNickname : styles.invalidNickname}>
            {nicknameValid ? '닉네임을 사용할 수 있습니다.' : '닉네임을 사용할 수 없습니다.'}
          </p>
        )}
        <button 
          onClick={handleSubmit} 
          disabled={!nicknameValid || !nicknameRuleValid} 
          className={styles.submitButton}
        >
          설정
        </button>
      </div>
    </div>
  );
};

export default NicknameModal;
