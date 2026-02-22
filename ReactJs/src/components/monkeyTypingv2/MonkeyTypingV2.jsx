import React, { useState, useEffect, useRef } from "react";

import "./styles.css";

const SOURCE_TEXT = "The quick brown fox jumps over the lazy dog";

const onStartTyping = (intervalRef, setTimeLeft) => {
  if (intervalRef.current) return;

  const interval = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime === 1) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  intervalRef.current = interval;
};

const MonkeyTypingV2 = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [typedText, setTypedText] = useState("");
  const [focused, setFocused] = useState(false);

  const intervalRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setFocused(true);
    inputRef.current?.focus();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    function onOutsideClick(e) {
      if (!wrapperRef.current?.contains(e.target)) {
        inputRef.current?.blur();
        setFocused(false);
      }
    }
    window.addEventListener("mousedown", onOutsideClick);
    return () => {
      window.removeEventListener("mousedown", onOutsideClick);
    };
  }, []);

  const onType = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value.length === 1) {
      onStartTyping(intervalRef, setTimeLeft);
    }
    setTypedText(value);
  };

  console.log(typedText);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Time Left: {timeLeft}</div>
      </div>
      <div
        style={{
          padding: "16px",
          backgroundColor: "#f0f0f0",
          border: "1px solid gray",
          borderRadius: "8px",
        }}
        ref={wrapperRef}
        onClick={() => {
            setFocused(true);
            inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          onChange={onType}
          style={{
            position: "absolute",
            opacecity: 0,
            pointerEvents: "none",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
          }}
        />
        {SOURCE_TEXT.split("").map((char, index) => {
          const classes = ["char"];
          if (index < typedText.length) {
            if (char === typedText[index]) {
              classes.push("correct");
            } else {
              classes.push("incorrect");
            }
          }
          return (
            <span key={index}>
              {index === typedText.length && focused && (
                <span className="char caret">{"\u00A0"}</span>
              )}
              <span className={classes.join(" ")}>
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MonkeyTypingV2;
