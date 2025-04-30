import { useEffect, useState } from "react";
import "./App.css";
import { UsersList } from "./components/UsersList";

const numberOfResults = 10; // luego cambiar a 100

function App() {
  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${numberOfResults}`)
      .then(async (response) => await response.json())
      .then((data) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </div>
  );
}

export default App;
