import React from "react";
import { connect } from "react-redux";

const Loader = ({ errorMessage = "" }) => {
  return !errorMessage ? (
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  ) : (
    <h4 className="error-message">{errorMessage}</h4>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.weather.errorMessage,
  };
};

export default connect(mapStateToProps)(Loader);
