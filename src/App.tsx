import { CSSProperties } from "react";
import { Stopwatch } from "./components/Stopwatch";
import './App.css';

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
  backgroundColor: '#2a2b2e',
}

function App() {
  return (
    <div style={styles}>
        <Stopwatch />
    </div>
  );
}

export default App;
