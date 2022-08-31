import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import http from "../../utilities/httpService";
import {useNavigate} from "react-router-dom";
import RouteEnum from "models/RouteEnum";

function UserDetails(props: any) {
  let {id} = useParams();

  const [details, setDetails] = useState<any>({});

  let navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      const apiUrl = "https://reqres.in/api/users/" + id;

      try {
        const result: any = await http.get(apiUrl);
        if (result) {
          setDetails(result.data.data);
        }
      } catch (error: any) {}
    };

    getUserDetails();
  }, [id]);

  return (
    <div className="user-details">
      <h3>User Details</h3>

      {details && (
        <table className="table-responsive details-tab">
          <tbody>
            <tr>
              <th className="title-col">ID</th>
              <td>{details.id}</td>
            </tr>
            <tr>
              <th className="title-col">Email</th>
              <td>{details.email}</td>
            </tr>
            <tr>
              <th className="title-col">First Name</th>
              <td>{details.first_name}</td>
            </tr>
            <tr>
              <th className="title-col">Last Name</th>
              <td>{details.last_name}</td>
            </tr>
          </tbody>
        </table>
      )}
      <button
        className="btn btn-primary back-btn"
        onClick={(e) => navigate(RouteEnum.UsersList)}
      >
        Back
      </button>
    </div>
  );
}

export default UserDetails;
