import { useEffect, useState } from 'react';
import './App.css';
import Signals from './Signals';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Alert key={'info'} className='mt-3' variant={'info'}>
          {code !== '' ? code : 'Scan barcode or qrcode!'}
        </Alert>
        <Button variant="outline-warning" onClick={sendTestCode}>Publish topic with test code</Button>
      </header>
    </div>
  );
}

export default App;
