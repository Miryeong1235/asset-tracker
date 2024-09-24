import logo from './inu-test.JPG';
import './App.css';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="test" />
        <p>
          Hi this is test. <br />
          This is an app to track your assets.
        </p>

      </header>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
