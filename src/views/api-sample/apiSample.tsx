import {useEffect, useState} from "react";
import http from "../../utilities/httpService";

function ApiSample() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const apiUrl = "https://reqres.in/api/users";

      try {
        const result: any = await http.get(apiUrl);
        if (result) {
          setUsers(result.data.data);
        }
      } catch (error: any) {}
    };

    getUsers();
  }, []);

  return (
    <>
      <ul>
        {users &&
          users.map((user: any) => {
            return <li key={user.id}>{user.email}</li>;
          })}
      </ul>
    </>
  );
}

export default ApiSample;
