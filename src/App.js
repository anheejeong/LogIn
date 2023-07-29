// import React, { useState, useEffect } from 'react';
import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const ctx = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect를 사용 => 리액트에 의해 함수 실행, 모든 컴포넌트 재평가 후 실행
  // 의존성이 변경된 후 실행
  // 앱이 시작될 때 한 번만 실행 => 새로고침 해도 다시 로그인 화면으로 돌아가지 않음

  // context/auth-context.js 파일로 이동
  // useEffect(() => {
  //   // 무한 루프 가능 => useEffect 필요
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if (storedUserLoggedInInformation === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways

  //   // Application => Local Starage에서 확인
  //   localStorage.setItem('isLoggedIn', '1'); //LOGED_IN, auth-context에 의해 주석
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn')
  //   setIsLoggedIn(false);
  // };

  return (
    <React.Fragment>
      {/* contextAPI wrapping */}
      {/* <AuthContext.Provider ---> index.js 파일에서 wrapping
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler
        }}> */}
      {/*<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />*/}
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
