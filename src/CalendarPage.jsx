import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// ✂️ 정답 코드에서 // 주석 제거하는 함수
function removeComments(code) {
  return code
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n")
    .trim();
}

// 🔁 유사도 계산 함수
function calculateSimilarity(a, b) {
  const aChars = a.split("");
  const bChars = b.split("");
  let match = 0;

  for (let i = 0; i < Math.min(aChars.length, bChars.length); i++) {
    if (aChars[i] === bChars[i]) {
      match++;
    }
  }

  const similarity = match / Math.max(aChars.length, bChars.length);
  return similarity;
}

const missions = [
  `import React, { useState } from "react";

function DateSelector1() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  return (
    <div>
      <h2>DateSelector1 Practice</h2>
      <button onClick={handleTodayClick}>Get Today's Date</button>
      {selectedDate && <p>📅 Selected Date: {selectedDate.toDateString()}</p>}
    </div>
  );
}

export default DateSelector1;`,

  `import React, { useState } from "react";

function ClickCounter2() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>ClickCounter2</h2>
      <button onClick={handleClick}>Click me!</button>
      <p>You clicked {count} times</p>
    </div>
  );
}

export default ClickCounter2;`,

  `import React, { useState } from "react";

function NameInput3() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>NameInput3</h2>
      <input type="text" value={name} onChange={handleChange} />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default NameInput3;`,

  `import React, { useState } from "react";

function ToggleText4() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h2>ToggleText4</h2>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"} Text
      </button>
      {visible && <p>This is some toggleable text.</p>}
    </div>
  );
}

export default ToggleText4;`,

  `import React, { useState } from "react";

function ColorChanger5() {
  const [color, setColor] = useState("black");

  return (
    <div>
      <h2 style={{ color }}>ColorChanger5</h2>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("green")}>Green</button>
    </div>
  );
}

export default ColorChanger5;`,

  `import React, { useState } from "react";

function DateSelector6() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  return (
    <div>
      <h2>DateSelector6 Practice</h2>
      <button onClick={handleTodayClick}>Get Today's Date</button>
      {selectedDate && <p>📅 Selected Date: {selectedDate.toDateString()}</p>}
    </div>
  );
}

export default DateSelector6;`,

  `import React, { useState } from "react";

function ClickCounter7() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>ClickCounter7</h2>
      <button onClick={handleClick}>Click me!</button>
      <p>You clicked {count} times</p>
    </div>
  );
}

export default ClickCounter7;`,

  `import React, { useState } from "react";

function NameInput8() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h2>NameInput8</h2>
      <input type="text" value={name} onChange={handleChange} />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default NameInput8;`,

  `import React, { useState } from "react";

function ToggleText9() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h2>ToggleText9</h2>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"} Text
      </button>
      {visible && <p>This is some toggleable text.</p>}
    </div>
  );
}

export default ToggleText9;`,

  `import React, { useState } from "react";

function ColorChanger10() {
  const [color, setColor] = useState("black");

  return (
    <div>
      <h2 style={{ color }}>ColorChanger10</h2>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("green")}>Green</button>
    </div>
  );
}

export default ColorChanger10;`,

  // 👉 Day 11 ~ Day 30도 같은 방식으로 구성됨
  // 다음 메시지에서 바로 이어서 붙여드릴게요 (글자수 제한)
];

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [typingCount, setTypingCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState("");

  const [completedDates, setCompletedDates] = useState(() => {
    const stored = localStorage.getItem("completedDates");
    return stored ? JSON.parse(stored) : [];
  });

  const todayIndex = new Date().getDate() % missions.length;
  const missionText = missions[todayIndex];

  const handleDayClick = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      setSelectedDate(date);
      setTypingCount(0);
      setInputValue("");
      setFeedback("");
      alert("✅ Let's start today's practice!");
    } else {
      alert("⚠️ Only today's date is available for practice.");
    }
  };

  const handleSubmit = () => {
    // ✨ 주석 제거 후 유사도 비교
    const similarity = calculateSimilarity(
      inputValue,
      removeComments(missionText)
    );

    if (similarity >= 0.3) {
      const nextCount = typingCount + 1;
      setTypingCount(nextCount);
      setInputValue("");
      setFeedback(`✅ Good job! Similarity: ${(similarity * 100).toFixed(0)}%`);

      if (nextCount >= 3) {
        const todayStr = new Date().toDateString();
        if (!completedDates.includes(todayStr)) {
          const updated = [...completedDates, todayStr];
          setCompletedDates(updated);
          localStorage.setItem("completedDates", JSON.stringify(updated));
        }
      }
    } else {
      setFeedback(
        `❌ Too different. Similarity: ${(similarity * 100).toFixed(0)}%`
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0fff4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1 style={{ color: "#2e7d32" }}>🌿 Daily Code Practice Calendar</h1>
        <Calendar
          onClickDay={handleDayClick}
          calendarType="gregory"
          tileContent={({ date }) => {
            const dateStr = date.toDateString();
            if (completedDates.includes(dateStr)) {
              return <span style={{ color: "green", marginLeft: 4 }}>✔️</span>;
            }
            return null;
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#e8f5e9",
          borderLeft: "2px solid #c8e6c9",
          overflowY: "auto",
        }}
      >
        {selectedDate && (
          <div>
            <h3>📝 Today's Coding Mission</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                background: "#fff",
                padding: "1rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                maxHeight: "300px",
                overflowY: "auto",
                border: "1px solid #ccc",
              }}
            >
              {missionText}
            </pre>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type the code here..."
              style={{
                width: "100%",
                height: "120px",
                padding: "10px",
                fontSize: "0.9rem",
                border: "2px solid black",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />

            <button
              onClick={handleSubmit}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: "#388e3c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              Submit
            </button>

            <p>{feedback}</p>
            <p style={{ color: "green" }}>
              ✅ Success Count: {typingCount} / 3
            </p>
            {typingCount >= 3 && (
              <p style={{ color: "#2e7d32", fontWeight: "bold" }}>
                🎉 Mission Complete!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
