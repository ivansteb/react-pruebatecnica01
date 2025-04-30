import { type User } from "../types.d";

interface Props {
  users: User[];
  showColors: boolean;
}

export function UsersList({ users, showColors }: Props) {
  return (
    <table style={{ marginTop: "2em", width: "100%" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";

          return (
            <tr key={index} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.title} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
