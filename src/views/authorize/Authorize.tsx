import React, {useEffect} from "react";
import queryString from "query-string";
import auth from "../../auth/authentication";
import RouteEnum from "models/RouteEnum";
import http from "./../../utilities/httpService";

function Authorize(props: any) {
  useEffect(() => {
    const {code, type} = queryString.parse(props.location.search);

    async function authenticate() {
      const authenticateUrl =
        "http://localhost:4000/api/getTokenFromCode/" + type + "/" + code;
      http
        .get(authenticateUrl)
        .then(async (response: any) => {
          if (response) {
            const authTokens = response.data;
            const data = await auth.externalLogin(authTokens);
            if (data) {
              window.location.href = RouteEnum.Root;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    authenticate();
  });

  return <div>Authorize </div>;
}

export default Authorize;
