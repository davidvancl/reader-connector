import { useEffect, useState } from 'react';
import './App.css';
import Signals from './Signals';

declare global {
  interface Window { Signals: any; }
}

function App() {
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    window.Signals = Signals;

    Signals.subscribe('code_received', (msg: any, data: any) => {
      setCode(data.code);
    });
  }, []);

  const sendTestCode = () => {
    Signals.publish('code_received', { 'code': `test-code-123-321` });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src='./logo.svg' className="App-logo" alt="logo" />
        <p>{code ?? 'Scan barcode or qrcode!'}</p>
        <button onClick={sendTestCode}>click here</button>
      </header>
    </div>
  );
}

export default App;
