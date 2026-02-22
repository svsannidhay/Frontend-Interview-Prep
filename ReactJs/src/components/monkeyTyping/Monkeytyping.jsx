import React, { useState, useRef, useEffect } from "react";
import "./monkeyTyping.css";

const SOURCE_TEXT = "The quick brown fox jumps over the lazy dog";

const MonkeyTyping = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [typedText, setTypedText] = useState("");
  const [focused, setIsFocused] = useState(false);
  const intervalRef = useRef(null);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsFocused(true);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function listenerOutSideClick(e) {
      if (!wrapperRef.current?.contains(e.target)) {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    }

    window.addEventListener("click", listenerOutSideClick);

    return () => {
      window.removeEventListener("click", listenerOutSideClick);
    };
  }, []);

  const onStartTyping = () => {
    if (intervalRef.current) return; // Prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const onType = (e) => {
    const value = e.target.value;

    if (value.length === 1) {
      onStartTyping();
    }
    setTypedText(value);
  };

  console.log(focused);

  return (
    <div style={{ width: "100%", height: "100%", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <div>Time: {timeLeft}</div>
      </div>
      <div
        style={{
          padding: "16px",
          border: "1px solid gray",
          borderRadius: "8px",
          backgroundColor: "#f0f0f0",
          position: "relative",
        }}
        ref={wrapperRef}
        onClick={() => {
            if (!focused) {
              setIsFocused(true);
              inputRef.current?.focus();
            }
        }}
      >
        {!focused && <div>Click anywhere on the text to start typing</div>}
        <input
          value={typedText}
          onChange={onType}
          ref={inputRef}
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            height: 0,
            width: 0,
          }}
        //   onFocus={() => setIsFocused(true)}
        //   onBlur={() => setIsFocused(false)}
        ></input>
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
                <span className="caret">{"\u00A0"}</span>
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

export default MonkeyTyping;
