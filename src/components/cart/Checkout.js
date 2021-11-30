import styles from "../../css/Checkout.module.css";
import useInput from "../../customHooks/useInput";
const Checkout = (props) => {
  const checkValidityName = (inputValue) => {
    return inputValue.trim() !== "";
  };
  const checkValidityStreet = (inputValue) => {
    return inputValue.trim() !== "";
  };
  const checkValidityCity = (inputValue) => {
    return inputValue.trim() !== "";
  };
  const checkValidityPostal = (inputValue) => {
    return inputValue.trim() !== "" && inputValue.trim().length === 6;
  };
  const {
    inputValue: nameValue,
    inputReset: nameReset,
    inputIsValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHanlder: nameBlurHandler,
    inputHasError: nameHasError,
  } = useInput(checkValidityName);
  const {
    inputValue: streetValue,
    inputReset: streetReset,
    inputIsValid: streetIsValid,
    inputChangeHandler: streetChangeHandler,
    inputBlurHanlder: streetBlurHandler,
    inputHasError: streetHasError,
  } = useInput(checkValidityStreet);
  const {
    inputValue: cityValue,
    inputReset: cityReset,
    inputIsValid: cityIsValid,
    inputChangeHandler: cityChangeHandler,
    inputBlurHanlder: cityBlurHandler,
    inputHasError: cityHasError,
  } = useInput(checkValidityCity);
  const {
    inputValue: postalValue,
    inputReset: postalReset,
    inputIsValid: postalIsValid,
    inputChangeHandler: postalChangeHandler,
    inputBlurHanlder: postalBlurHandler,
    inputHasError: postalHasError,
  } = useInput(checkValidityPostal);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && cityIsValid && postalIsValid) {
    formIsValid = true;
  }
  const confirmHandler = (event) => {
    console.log("not diabled");
    event.preventDefault();
    if (!nameIsValid || !streetIsValid || !cityIsValid || !postalIsValid) {
      return;
    }
    //submit the form data by calling fn in cart
    nameReset();
    streetReset();
    cityReset();
    postalReset();
  };
  //   console.log("hi, ",nameHasError);
  const nameClasses = `${styles.control} ${nameHasError ? styles.invalid : ""}`;
  const streetClasses = `${styles.control} ${
    streetHasError ? styles.invalid : ""
  }`;
  const cityClasses = `${styles.control} ${cityHasError ? styles.invalid : ""}`;
  const postalClasses = `${styles.control} ${
    postalHasError ? styles.invalid : ""
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
        />{" "}
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onBlur={postalBlurHandler}
          onChange={postalChangeHandler}
        />
        {postalHasError && (
          <p>Please enter a valid postal(5 characters/digits)!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancelOrder}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={!formIsValid}
          className={`${!formIsValid ? styles.invalid : styles.submit}`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
