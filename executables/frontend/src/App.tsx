import './App.css';
import SendEmail from './components/sendEmail.tsx';
import CheckSecret from './components/checkSecret.tsx';

function App() {
  return (
    <div>
      <h1>Examples of Executables</h1>

      <SendEmail />
      <CheckSecret />
    </div>
  );
}

export default App;
