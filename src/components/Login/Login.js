import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// reducer 함수 : 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떤 데이터도 필요하지 않음
// 따라서 리듀서 함수는 이 컴포넌트 함수의 범위 밖에서 만들어질 수 있음
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.isValid }
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.isValid }
  }
  return { value: '', isValid: false }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  })

  // useEffect
  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid( // 이 코드가 타이핑 할때마다 수십번 발생하는 것을 피하기 위함
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500); // 타이핑 후 500밀리초 지나면 실행

  //   return () => {  // 클린업 코드가 실행되어야 useEffect 실행
  //     console.log('CLEANUP');
  //     clearTimeout(identifier); // 클린업 함수가 실행될 때마다 클린업 함수가 실행되기 전에 설정된 타이머를 지움
  //   };
  // }, [setFormIsValid, enteredEmail, enteredPassword]); //setFormIsValid는 state에 의해 관리되고 있으므로 생략 가능

  // 객체 destructuring
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      // setFormIsValid( // 이 코드가 타이핑 할때마다 수십번 발생하는 것을 피하기 위함
      //   emailState.isValid && passwordState.isValid
      // );
      setFormIsValid(emailIsValid && passwordIsValid) // isValid가 true이면 불필요한 코드 재실행을 막기 위함
    }, 500); // 타이핑 후 500밀리초 지나면 실행

    return () => {  // 클린업 코드가 실행되어야 useEffect 실행
      console.log('CLEANUP');
      clearTimeout(identifier); // 클린업 함수가 실행될 때마다 클린업 함수가 실행되기 전에 설정된 타이머를 지움
    };
  }, [emailIsValid, passwordIsValid]); //setFormIsValid는 state에 의해 관리되고 있으므로 생략 가능

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );

    // useReducer 사용시
    // emailState.isValid ~ 사용 가능
  };

  // 다른 state의 업데이트가 제 시간에 처리되지 않을 수도 있으므로 다른 state에 기반해서 state를 의존하는 코드는 사용하지 않아야 함
  // 여러 다른 state 기반의 state 업데이트 => useReducer를 사용
  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' })

  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
