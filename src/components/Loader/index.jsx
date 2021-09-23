import React from "react";

import "./Loader.scss";

function Loader() {
  return (
    <div className="loader">
      <ul className="loader__list">
        <li className="loader__item"></li>
        <li className="loader__item"></li>
        <li className="loader__item"></li>
      </ul>
    </div>
  );
}

export default Loader;
