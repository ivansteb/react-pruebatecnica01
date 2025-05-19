import { SortBy, type User } from "../types.d";

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUser: (uuid: string) => void;
  users: User[];
  showColors: boolean;
}

export function UsersList({
  changeSorting,
  deleteUser,
  users,
  showColors,
}: Props) {
  return (
    <table style={{ marginTop: "2em", width: "100%" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
            Apellido
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";

          return (
            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.title} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.login.uuid);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
