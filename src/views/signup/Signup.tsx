import {useState} from "react";
import auth from "../../auth/authentication";
import SignupConstants from "../../constants/signup.constants";
import I18n from "utilities/i18n";

function Signup(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupMsg, setSignupMsg] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    auth.getUserPool().signUp(email, password, [], [], (err, data) => {
      if (err) {
        setError(err.message);
        setSignupMsg("");
      } else {
        setError("");
        setSignupMsg(SignupConstants.Success);
      }
    });
    // Adding user after signup to specific usergroup can be done with backend using main AWS sdk
    // https://github.com/amazon-archives/amazon-cognito-identity-js/issues/565
  };

  return (
    <div>
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
        <button className="btn btn-primary mt-2" type="submit">
          {I18n("Nav.SignUp")}
        </button>

        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {signupMsg && (
          <div className="alert alert-success mt-2">{signupMsg}</div>
        )}
      </form>
    </div>
  );
}

export default Signup;
