import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.scss";
import "./normalize.css";
import Clock from "./components/Clock";
import Loader from "./components/Loader";
import { getTimezones } from "./redux/actions/timezonesActions";
import Error from "./components/Error";

function App() {
  const dispatch = useDispatch();

  const [timezonesStatus, setTimezonesStatus] = useState({
    isFetching: false,
    isFetched: false,
    error: null,
  });

  useEffect(() => {
    const fecthTimezones = async () => {
      // only to show loader a bit longer
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Ready!"), 1500);
      });

      setTimezonesStatus({
        isFetching: true,
        isFetched: false,
        error: null,
      });

      promise.then(() =>
        dispatch(getTimezones())
          .then(() => {
            setTimezonesStatus({
              isFetching: false,
              isFetched: true,
              error: null,
            });
          })
          .catch((error) => {
            setTimezonesStatus({
              isFetching: false,
              isFetched: false,
              error: error,
            });
          })
      );
    };

    fecthTimezones();
  }, [dispatch]);

  return (
    <>
      {timezonesStatus.isFetching && <Loader />}

      {timezonesStatus.isFetched && (
        <div className="grid">
          <Clock />
          <Clock />
        </div>
      )}

      {timezonesStatus.error && <Error />}
    </>
  );
}

export default App;
