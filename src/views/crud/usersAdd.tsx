import React, {useState} from "react";
import http from "../../utilities/httpService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import RouteEnum from "models/RouteEnum";

function UsersAdd(props: any) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  let navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [valid, setValid] = useState(false);

  const handleSubmit = async (event: any) => {
    console.log("handleSubmit");
    event.preventDefault();
    setSubmitted(true);
    if (values.firstName && values.lastName && values.email) {
      setValid(true);

      const apiUrl = "https://reqres.in/api/users";
      try {
        const result: any = await http.post(apiUrl, values);
        if (result) {
          toast.success("User Added successfully");
          navigate(RouteEnum.UsersList);
        }
      } catch (error: any) {}
    }
  };

  return (
    <div className="add-user">
      <h3>Add User</h3>
      <form className="model-content" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            className="form-control"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={(e) => {
              setValues((values) => ({
                ...values,
                firstName: e.target.value
              }));
            }}
          />
          {submitted && !values.firstName && (
            <span className="form-error">Please enter a first name</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            className="form-control"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={(e) => {
              setValues((values) => ({
                ...values,
                lastName: e.target.value
              }));
            }}
          />
          {submitted && !values.lastName && (
            <span className="form-error">Please enter a last name</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            type="text"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e) => {
              setValues((values) => ({
                ...values,
                email: e.target.value
              }));
            }}
          />
          {submitted && !values.email && (
            <span className="form-error">Please enter an email address</span>
          )}
        </div>

        <div className="model-submit">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UsersAdd;
