import {useEffect, useState} from "react";
import http from "../../utilities/httpService";
import {useNavigate} from "react-router-dom";
import RouteEnum from "models/RouteEnum";
import {
  MdRemoveRedEye,
  MdModeEditOutline,
  MdDeleteForever
} from "react-icons/md";
import PopupModel from "../../utilities/popupModel";
import ConfirmationPopup from "./../../utilities/confirmationPopup";
import {toast} from "react-toastify";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);

  let navigate = useNavigate();

  const getUsers = async () => {
    const apiUrl = "https://reqres.in/api/users";

    try {
      const result: any = await http.get(apiUrl);
      if (result) {
        setUsers(result.data.data);
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id: any) => {
    const apiUrl = "https://reqres.in/api/users/" + id;

    try {
      const result: any = await http.delete(apiUrl);
      if (result) {
        toast.success("User deleted successfully");
        setIsConfirmationModelOpen(false);
        getUsers();
      }
    } catch (error: any) {}
  };

  return (
    <div className="crud-table">
      <h3>User's List</h3>
      <div className="crud-btn">
        <button
          className="btn btn-primary"
          onClick={(e) => navigate(RouteEnum.AddUser)}
        >
          Add
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col" className="th-actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td className="action-btns">
                    <MdRemoveRedEye
                      className="actions"
                      fontSize={20}
                      onClick={(e) =>
                        navigate(RouteEnum.UserDetails + "/" + user.id)
                      }
                    />
                    <MdModeEditOutline
                      className="actions"
                      fontSize={20}
                      onClick={(e) =>
                        navigate(RouteEnum.UsersEdit + "/" + user.id)
                      }
                    />
                    <MdDeleteForever
                      className="actions"
                      fontSize={20}
                      onClick={() => {
                        setSelectedId(user.id);
                        setIsConfirmationModelOpen(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          <PopupModel
            modalIsOpen={isConfirmationModelOpen}
            setIsOpen={setIsConfirmationModelOpen}
            modelContent={
              <ConfirmationPopup
                setIsConfirmationModelOpen={setIsConfirmationModelOpen}
                actionFunction={deleteUser}
                callbackData={selectedId}
                displayText="Do you really want to delete this user?"
              />
            }
          />
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
