/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi: string) {
  return {
    route: {
      baseRoute: "/"
    },
    api: {
      graphql: `${baseApi}/graphql`
    },
    awsUserAccessKeyId: "AKIATKLEA3IJNKHWJITK",
    awsUserSecretAccessKey: "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",
    awsCognitoUserPoolId: "ap-south-1_gVA7o0J4m",
    awsCognitoClientId: "20j3lf90dakb8bc228u0bhbjec",
    isProduction: true,
    isDevelopment: false,
    isTesting: false
  };
}

export type Environment = ReturnType<typeof baseEnv>;
