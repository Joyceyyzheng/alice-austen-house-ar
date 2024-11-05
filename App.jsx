// App.js
import React from 'react';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.info('App component mounted');}, []);

  return (
    <div>
      <h1>React UI</h1>
      <button onClick={() => alert("Button Clicked!")}>Click Me</button>
    </div>
  );
}

export default App;
