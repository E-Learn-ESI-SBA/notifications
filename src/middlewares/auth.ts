import { FastifyInstance, preHandlerAsyncHookHandler } from "fastify";
import { ValidateToken } from "../lib/jwt.js";

export const AuthMiddleware = (
  fastify: FastifyInstance,
): preHandlerAsyncHookHandler => {
  return async (req, res) => {
    try {
      let token = req.headers.authorization;

      if (!token || !token.startsWith("Bearer ")) {
        throw new Error("Auth Header Not Found");
      }
      token = token.replace("Bearer ", "");
      const user = await ValidateToken(token, fastify.config.JWT_SECRET);
      if (user instanceof Error) {
        throw user;
      }
      req.user = user;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unauthorized";
      res.send({ message }).status(401);
    }
  };
};
