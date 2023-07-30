import React, { useRef, useImperativeHandle } from "react";
// useImperativeHandle => 명령적으로 프로그래밍 가능

import classes from './Input.module.css';

// ref를 외부에서 설정할 경우
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });

    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []);

    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;