import React, { useState} from "react";
import './App.css';
import logo from './assets/fitlogo.png';
const balanced_routine = [
  ["benchpress", "8 reps", "0 reps", "0 reps", "0 reps", "8 reps", "0 reps", "0 reps"],
  ["squat", "0 reps", "10 reps", "0 reps", "0 reps", "0 reps", "10 reps", "0 reps"],
  ["deadlift", "0 reps", "0 reps", "5 reps", "0 reps", "0 reps", "0 reps", "5 reps"],
  ["bicep curls", "0 reps", "0 reps", "8 reps", "0 reps", "0 reps", "0 reps", "8 reps"],
  ["tricep pushdowns", "0 reps", "0 reps", "12 reps", "0 reps", "0 reps", "0 reps", "12 reps"],
  ["t-bar rows", "0 reps", "0 reps", "10 reps", "0 reps", "0 reps", "0 reps", "10 reps"],
  ["leg extensions", "0 reps", "10 reps", "0 reps", "0 reps", "0 reps", "10 reps", "0 reps"],
  ["lat raises", "8 reps", "0 reps", "10 reps", "0 reps", "8 reps", "0 reps", "10 reps"],
  ["preacher curls", "0 reps", "0 reps", "8 reps", "0 reps", "0 reps", "0 reps", "8 reps"],
  ["incline benchpress", "8 reps", "0 reps", "0 reps", "0 reps", "8 reps", "0 reps", "0 reps"],
  ["chest flies", "12 reps", "0 reps", "0 reps", "0 reps", "12 reps", "0 reps", "0 reps"],
  ["jogging treadmill", "0 min", "15 min", "0 min", "0 min", "0 min", "15 min", "0 min"],
  ["decline crunches", "0 reps", "12 reps", "0 reps", "0 reps", "0 reps", "12 reps", "0 reps"],
];

// Function to create user routine based on days and goal
function createUserRoutine(days, goal) {
  let user_routine = balanced_routine.map(row => [row[0], ...row.slice(1, days + 1)]);

  if (goal.toLowerCase() === "strength") {
    user_routine = user_routine.filter((_, i) => i !== 11); // remove treadmill
  } else if (goal.toLowerCase() === "endurance") {
    user_routine = user_routine.map(row => {
      const modified = row.slice(1).map(val => {
        if (val.includes("8 reps")) return "12 reps";
        if (val.includes("10 reps")) return "15 reps";
        if (val.includes("12 reps")) return "18 reps";
        if (val.includes("15 min")) return "30 min";
        return val;
      });
      return [row[0], ...modified];
    });
  } else if (goal.toLowerCase() === "cardio") {
    user_routine = user_routine.map(row => {
      if (row[0] === "jogging treadmill") {
        return [row[0], ...Array(days).fill("40 min")];
      }
      return row;
    });
  }

  return user_routine;
}

function Login() {
  // Move all hooks and state inside the component function
  const [screen, switchscreen] = useState("welcome");
  const [accountusername, setausername] = useState("");
  const [accountpassword, setapassword] = useState("");
  const [loginusername, setloginusername] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [name, setname] = useState("");
  const [weight, setweight] = useState("");
  const [days, setdays] = useState(3); // default days
  const [goal, setgoal] = useState("cardio"); // default goal
  const [gender, setgender] = useState("");
  const [routine, setroutine] = useState([]);

  // When entering plan screen, generate routine
  function enterPlan() {
    const plan = createUserRoutine(days, goal);
    setroutine(plan);
    switchscreen("plan");
  }

  return (
    <div>
      {screen === "welcome" && (
        <>
        <img src={logo} alt="LOGO" className="logo"/>
          <h1>Would you like to start your journey with Fittrack?</h1>
          <button onClick={() => switchscreen("accountcreation")}>
            Let's make an account
          </button>
        </>
      )}

      {screen === "accountcreation" && (
        <>
          <h2>Make a username and password</h2>
          <p>Make a username</p>
          <input
            type="text"
            value={accountusername}
            onChange={e => setausername(e.target.value)}
            placeholder="username"
          />
          <p>Make a password</p>
          <input
            type="password"
            value={accountpassword}
            onChange={e => setapassword(e.target.value)}
            placeholder="password"
          />
          <button
            onClick={() => {
              if (accountusername === "" || accountpassword === "") {
                alert("One of the fields is empty!");
              } else {
                switchscreen("login");
              }
            }}
          >
            Make account
          </button>
        </>
      )}

      {screen === "login" && (
        <>
          <h3>Enter your login information</h3>
          <p>Username</p>
          <input
            type="text"
            value={loginusername}
            onChange={e => setloginusername(e.target.value)}
            placeholder="username"
          />
          <p>Password</p>
          <input
            type="password"
            value={loginpassword}
            onChange={e => setloginpassword(e.target.value)}
            placeholder="password"
          />
          <button
            onClick={() => {
              if (
                loginusername === accountusername &&
                loginpassword === accountpassword
              ) {
                switchscreen("manu");
              } else {
                alert("Login information is incorrect");
              }
            }}
          >
            Login
          </button>
        </>
      )}

      {screen === "infocollection" && (
        <>
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={e => setname(e.target.value)}
            placeholder="Enter your name"
          />

          <p>Weight (kg)</p>
          <input
            type="number"
            value={weight}
            onChange={e => setweight(e.target.value)}
            placeholder="Enter your weight"
          />

          <p>Days per week</p>
          <input
            type="number"
            min="1"
            max="7"
            value={days}
            onChange={e => {
              const val = Math.min(7, Math.max(1, Number(e.target.value)));
              setdays(val);
            }}
            placeholder="Enter number of workout days"
          />

          <p>Goal</p>
          <select
            value={goal}
            onChange={e => setgoal(e.target.value)}
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="endurance">Endurance</option>
          </select>

          <p>Gender</p>
          <input
            type="text"
            value={gender}
            onChange={e => setgender(e.target.value)}
            placeholder="Enter your gender"
          />

          <button onClick={() => switchscreen("manu")}>Finalize Info</button>
        </>
      )}

      {screen === "manu" && (
        <>
          <button onClick={() => switchscreen("infocollection")}>
            Change personal information
          </button>
          <button onClick={enterPlan}>View plan</button>
          <button onClick={() => switchscreen("login")}>Logout</button>
          <button onClick={() => switchscreen("welcome")}>Delete account</button>
        </>
      )}

      {screen === "plan" && (
        <>
          <h2>Your Workout Plan</h2>
          <table
            border="1"
            cellPadding="5"
            style={{ marginTop: "20px", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Exercise</th>
                {[...Array(days)].map((_, i) => (
                  <th key={i}>Day {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routine.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ textAlign: j === 0 ? "left" : "center" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ marginTop: "20px" }} onClick={() => switchscreen("manu")}>
            Back to menu
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
