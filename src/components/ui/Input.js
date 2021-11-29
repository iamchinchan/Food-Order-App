import React, { useImperativeHandle, useRef } from "react";
import styles from "../../css/Input.module.css";
const Input = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {});

  return (
    <div className={styles.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
