import { readdirSync } from "fs";

export const registerApiRoutes = (version, app) => {
  const apiPath = `./src/routes/api/${version}`;

  readdirSync(apiPath).map((path) => {
    app.use(`/api/${version}/`, require(`../routes/api/${version}/${path}`));
  });
};
