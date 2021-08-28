import logo from "./logo.svg";
import "./App.css";
import { API_BASE_URL } from "./config";

function App() {
  async function callApi() {
    const url = `${API_BASE_URL}/api/test`
    const response = await fetch(url);
    const data = await response.json();
    console.log("Printing- - - - url:", url);
    console.log("Printing- - - - data:", data);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kedarify from Develop PR</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={async () => await callApi()}>test</button>
      </header>
    </div>
  );
}

export default App;
