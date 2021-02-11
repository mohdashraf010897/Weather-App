import React, { Component } from "react";
import Main from "../components/Main";

import { connect } from "react-redux";
import WeatherControlActions from "../redux/Actions/weatherControl";
import Loader from "../components/common/Loader";
class Landing extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    //initially fetching forecast for current location using navigator api
    this.props.fetchForeCast(null);
  }

  render() {
    if (this.state.loading) return <Loader />;

    return (
      <>
        <Main />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForeCast: (placeObj) =>
      dispatch(WeatherControlActions.fetchForeCast(placeObj)),
  };
};

export default connect(null, mapDispatchToProps)(Landing);
