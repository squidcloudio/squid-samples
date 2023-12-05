import './App.css';
import SendEmail from './components/sendEmail.tsx';
import Secrets from './components/secrets.tsx';

function App() {
  return (
    <div>
      <h1>Examples of Executables</h1>

      <div className="side-by-side">
        <div className="flex-child">
          <SendEmail />
        </div>
        <div className="flex-child">
          <Secrets />
        </div>
      </div>
    </div>
  );
}

export default App;
