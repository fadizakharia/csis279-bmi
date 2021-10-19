import { RedisOptions } from "ioredis";

export const redisConf: RedisOptions = {
  host: process.env.REDIS_HOST!,
  port: +process.env.REDIS_PORT!,
  password: process.env.REDIS_PASS!,
};
