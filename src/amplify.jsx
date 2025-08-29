import { Amplify } from "aws-amplify";

const config = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
      region: import.meta.env.VITE_AWS_REGION,
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_COGNITO_DOMAIN,
          scopes: ["openid", "email", "profile"],
          redirectSignIn: [import.meta.env.VITE_REDIRECT_SIGNIN],
          redirectSignOut: [import.meta.env.VITE_REDIRECT_SIGNOUT],
          responseType: "code",
          providers: ["Google"],
        },
      },
    },
  },
};

Amplify.configure(config);

// console.log("Debug redirect URIs:", {
//   signIn: import.meta.env.VITE_REDIRECT_SIGNIN,
//   signOut: import.meta.env.VITE_REDIRECT_SIGNOUT,
//   domain: import.meta.env.VITE_COGNITO_DOMAIN,
// });
