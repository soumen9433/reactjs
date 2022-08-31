import environment from "environment";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  ICognitoUserData,
  ICognitoUserSessionData
} from "amazon-cognito-identity-js";
import RouteEnum from "../models/RouteEnum";

const poolData = {
  UserPoolId: environment.awsCognitoUserPoolId,
  ClientId: environment.awsCognitoClientId
};

export function getUserPool() {
  const UserPool = new CognitoUserPool(poolData);
  return UserPool;
}

export function getCurrentUser() {
  const currentUser = getUserPool().getCurrentUser();
  return currentUser;
}

export async function getCurrentUserSession() {
  return await new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error: any, session: any) => {
        resolve(session);
      });
    } else {
      reject();
    }
  });
}

export async function getJwtToken() {
  return await new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error: any, session: any) => {
        localStorage.setItem("token", session.idToken.jwtToken);
        resolve(session.idToken.jwtToken);
      });
    } else {
      resolve("");
    }
  });
}

export async function getUserPayLoad() {
  return await new Promise<void>((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error: any, session: any) => {
        if (session) {
          resolve(session.accessToken.payload);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

export async function getIdTokenPayLoad() {
  return await new Promise<void>((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      currentUser.getSession((error: any, session: any) => {
        if (session) {
          resolve(session.idToken.payload);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

export async function login(Username: string, Password: string) {
  return await new Promise((resolve, reject) => {
    const Pool = getUserPool();

    const user = new CognitoUser({Username, Pool});
    const authDetails = new AuthenticationDetails({Username, Password});
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        resolve(data);
        getJwtToken();
      },
      onFailure: (error) => {
        reject(error);
      },
      newPasswordRequired: (data) => {
        resolve(data);
      }
    });
  });
}

export async function externalLogin(authTokens: any) {
  return await new Promise((resolve, reject) => {
    const Pool = getUserPool();

    const cognitoAccessToken = new CognitoAccessToken({
      AccessToken: authTokens.access_token
    });
    const cognitoIdToken = new CognitoIdToken({IdToken: authTokens.id_token});
    const cognitoRefreshToken = new CognitoRefreshToken({
      RefreshToken: authTokens.refresh_token
    });

    const sessionData: ICognitoUserSessionData = {
      IdToken: cognitoIdToken,
      AccessToken: cognitoAccessToken,
      RefreshToken: cognitoRefreshToken
    };

    const cognitoUserSession = new CognitoUserSession(sessionData);

    const userName = cognitoIdToken.payload["cognito:username"];

    const UserData: ICognitoUserData = {
      Username: userName,
      Pool
    };

    const user = new CognitoUser(UserData);
    user.setSignInUserSession(cognitoUserSession);

    if (user != null) {
      user.getSession(function (err: any, result: any) {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    }
  });
}

export function logout() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    currentUser.signOut();
  }
  window.location.href = RouteEnum.Login;
}

const authentication = {
  getUserPool,
  getCurrentUser,
  getCurrentUserSession,
  getJwtToken,
  getUserPayLoad,
  getIdTokenPayLoad,
  login,
  externalLogin,
  logout
};
export default authentication;
