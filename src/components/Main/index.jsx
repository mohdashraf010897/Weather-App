import React, { useState, useEffect } from "react";
import Forecast from "../Forecast";
import SearchBox from "../SearchBox";

const Main = () => {
  return (
    <main>
      <SearchBox />
      <Forecast />
    </main>
  );
};

export default Main;
