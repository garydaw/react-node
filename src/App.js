import './App.css';
import PlayerForm from './Playerform.js'

function App() {

 /* fetch('http://localhost:5000/api/players')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));*/

    return (
      <div className="App">
        <h1>Ally Code App</h1>
        <PlayerForm />
      </div>
    );
}



export default App;
