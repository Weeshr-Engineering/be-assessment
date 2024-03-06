import type { Config } from "jest";

const config: Config.InitialOptions = {
  verbose: true,
  testMatch: ["**/tests/**/*.routeTest.ts"],
};

export default config;
