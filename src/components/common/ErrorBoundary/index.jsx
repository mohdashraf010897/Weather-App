import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: " flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: " 2rem",
          }}
        >
          <div>
            <p>
              There was an error in loading this page.
              <a href="/" style={{ cursor: "pointer", color: "#0077FF" }}>
                Back to HomePage
              </a>
            </p>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
