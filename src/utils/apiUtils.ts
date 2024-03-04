import { readdirSync } from "fs";
import { authMiddleware } from "../middlewares/auths";

export const registerApiRoutes = (version, app) => {
  const apiPath = `./src/routes/api/${version}`;

  readdirSync(apiPath).map((path) => {
    if (path.includes("author")) {
      app.use(`/api/${version}/`, require(`../routes/api/${version}/${path}`));
    } else {
      app.use(
        `/api/${version}/`,
        authMiddleware,
        require(`../routes/api/${version}/${path}`)
      );
    }
  });
};
