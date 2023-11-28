import './App.css';
import SendEmail from './components/sendEmail.tsx';
import Secrets from './components/secrets.tsx';

function App() {
  return (
    <div>
      <h1>Examples of Executables</h1>

      <SendEmail />
      <Secrets />
    </div>
  );
}

export default App;
