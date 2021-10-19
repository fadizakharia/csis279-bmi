import express from "express";
import dotenv from "dotenv";
import { errorController } from "./controller/error";
import routes from "./routes/routes";
import session from "express-session";
import { json } from "body-parser";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import cors from "cors";
import { redisConf } from "./modelConf/redis.config";
async function startApp() {
  dotenv.config();
  const app = express();
  const redisStore = connectRedis(session);
  const redisInstance = new Redis(redisConf);
  const port = process.env.PORT ? process.env.PORT : 3001;
  app.use(json());
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? process.env.ORIGIN
          : "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      store: new redisStore({ client: redisInstance }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
      rolling: true,
      saveUninitialized: true,
    })
  );

  app.use(routes.authRouter);
  app.use(routes.bmiRouter);
  app.all("*", (req, res, next) => {
    return res.send({ error: "Page not found!" }).status(404);
  });
  app.use(errorController);
  app
    .listen(port, () => {
      console.log("server listening on port: " + port);
    })
    .addListener("error", (err) => {
      if (err) {
        console.log(err);
      }
    });
}
startApp();
