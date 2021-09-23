import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import "./Clock.scss";
import Select from "../Select";

function Clock() {
  const clockRef = useRef(null);
  const timezones = useSelector((state) => state.timezones);

  const [timezone, setTimezone] = useState({
    timezone: new Date().getTimezoneOffset() / -60,
  });
  const [analogClock, setAnalogClock] = useState();

  const setClock = () => {
    const date = new Date();

    const secondHand = clockRef.current.querySelector(".clock__second");
    const minuteHand = clockRef.current.querySelector(".clock__minute");
    const hourHand = clockRef.current.querySelector(".clock__hour");

    const seconds = date.getUTCSeconds() / 60;
    const minutes = (date.getUTCMinutes() + seconds) / 60;
    const hours =
      (date.getUTCHours() + minutes + Number.parseFloat(timezone.timezone)) /
      12;

    rotateHand(secondHand, seconds);
    rotateHand(minuteHand, minutes);
    rotateHand(hourHand, hours);
  };

  const rotateHand = (hand, rotate) => {
    hand.style.transform = `translateX(-50%) rotate(${rotate * 360}deg)`;
  };

  const setDigitalClock = () => {
    const date = new Date();

    let hours = date.getUTCHours() + Number.parseFloat(timezone.timezone);

    if (hours >= 24) {
      hours -= 24;
    }

    setAnalogClock(
      `${convertTime(hours)}:${convertTime(date.getUTCMinutes())}:${convertTime(
        date.getUTCSeconds()
      )}`
    );
  };

  const convertTime = (value) => {
    if (!value && value !== 0) return;

    return value.toString().length < 2 ? `0${value}` : value;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setClock();
      setDigitalClock();
    }, 1000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (Array.isArray(timezones) && timezones.length !== 0) {
      setTimezone(timezones[0]);
    }
  }, [timezones]);

  return (
    <div className="clockCard">
      <div className="clock" ref={clockRef}>
        <div className="clock__hand clock__hour"></div>

        <div className="clock__hand clock__minute"></div>

        <div className="clock__hand clock__second"></div>

        <div className="clock__number clock__number1"></div>
        <div className="clock__number clock__number2"></div>
        <div className="clock__number clock__number3"></div>
        <div className="clock__number clock__number4"></div>
        <div className="clock__number clock__number5"></div>
        <div className="clock__number clock__number6"></div>
        <div className="clock__number clock__number7"></div>
        <div className="clock__number clock__number8"></div>
        <div className="clock__number clock__number9"></div>
        <div className="clock__number clock__number10"></div>
        <div className="clock__number clock__number11"></div>
        <div className="clock__number clock__number12"></div>
      </div>

      <div className="clockCard__digital">{analogClock}</div>

      <Select
        options={timezones}
        setSelected={setTimezone}
        selected={timezone}
        value="timezone"
        disabled={timezones.length === 0}
      />
    </div>
  );
}

export default Clock;
