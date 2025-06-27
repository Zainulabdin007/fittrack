import React,{useEffect} from 'react';
import Login from './logic';  
import fittrackLogo from './assets/fitlogo.png'
import './App.css';
import gear from './assets/gear.png';
function App() {
 useEffect(() => {
  document.title = "Fit Track";

  const favicon = document.getElementById('favicon');
  if (favicon) {
    favicon.href = fittrackLogo;
  } else {
    const link = document.createElement('link');
    link.id = 'favicon';
    link.rel = 'icon';
    link.href = fittrackLogo;
    document.head.appendChild(link);
  }
}, []);
  
  return (
    <div>
      <img src={gear} alt="gear" className="gear gear-left" style={{  width: '400px'}} /* adjust size */
/>
    <img src={gear} alt="gear" className="gear gear-right" style={{  width: '400px'}}/>

    <div className="App">
      <Login />
    </div>
    </div>
  );
}


export default App;
