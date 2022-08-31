import {useState} from "react";
import auth from "../../auth/authentication";
import RouteEnum from "../../models/RouteEnum";
// import MicrosoftLogin from "react-microsoft-login";
import I18n from "utilities/i18n";

function Login(props: any) {
  const currentUser = auth.getCurrentUser();
  if (currentUser) {
    props.history.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const authHandler = (err: any, data: any) => {
  //   console.log(err, data);
  // };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      // const data = await auth.login(email, password);
      // if (data) {
      //   window.location.href = RouteEnum.Root;
      // }
      window.location.href = RouteEnum.Root;
    } catch (err) {
      const error: any = err;
      setError(error.message);
    }
  };

  return (
    <div className="form-group">
      <form onSubmit={onSubmit}>
        <input
          value={email}
          className="form-control mt-2"
          placeholder={I18n("Auth.Email")}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          value={password}
          type="password"
          className="form-control mt-2"
          placeholder={I18n("Auth.Password")}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <button className="btn btn-primary mt-2" type="submit">
          {I18n("Nav.Login")}
        </button>

        {/* {
          <MicrosoftLogin
            clientId="58340cb5-9555-49cd-9aaf-98a4b54e23b9"
            tenantUrl="https://login.microsoftonline.com/3c893b10-e22b-4fa7-b828-b963ec3c65e5"
            authCallback={authHandler}
          />
        } */}
      </form>
    </div>
  );
}

export default Login;
