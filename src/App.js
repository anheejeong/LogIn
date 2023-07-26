import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect를 사용 => 리액트에 의해 함수 실행, 모든 컴포넌트 재평가 후 실행
  // 의존성이 변경된 후 실행
  // 앱이 시작될 때 한 번만 실행 => 새로고침 해도 다시 로그인 화면으로 돌아가지 않음
  useEffect(() => {
    // 무한 루프 가능 => useEffect 필요
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // Application => Local Starage에서 확인
    localStorage.setItem('isLoggedIn', '1'); //LOGED_IN
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
