import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UsersList } from "./components/UsersList";
import { type User } from "./types.d";

const numberOfResults = 10; // luego cambiar a 100

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]); // <- guardar valor que no cambia entre renders

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${numberOfResults}`)
      .then(async (response) => await response.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Primero filtramos por país y luego ordenamos
  const filteredUsers =
    typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;

  const sortedUsers = sortByCountry
    ? filteredUsers.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : filteredUsers;

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "No ordenar por país" : "Ordenar por país"}
        </button>

        <button onClick={handleReset}>Resetear estado</button>

        <input
          placeholder="🗺 Filtra por país"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        <UsersList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
