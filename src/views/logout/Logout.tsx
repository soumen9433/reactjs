import auth from "../../auth/authentication";

function Logout(props: any) {
  auth.logout();
  return null;
}

export default Logout;
