import environment, {Environment} from "./base";

const baseApi = "http://localhost:4000";
const env = environment(baseApi);

const testEnv: Environment = {
  ...env,
  // override anything that gets added from base.
  isProduction: false,
  isDevelopment: true,
  isTesting: true
};

export default testEnv;
