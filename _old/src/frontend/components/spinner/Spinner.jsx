import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.scss";

function Spinner (props = { message: "" }) {
  return (
        <div className={classNames(styles.wrapper)}>
          <div className={classNames(styles.spinner)} />
          <div className={classNames(styles.message)} >
            { props.message }
          </div>
        </div>
      );
}

Spinner.propTypes = {
    message: PropTypes.string
};

export default Spinner;
