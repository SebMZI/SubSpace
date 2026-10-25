import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
export default class SubSpace {
  static BASE_API_URL = "/api/v1";
  static instance: SubSpace | null = null;
  fastify!: FastifyInstance;

  constructor() {}

  static getInstance(): SubSpace {
    if (!SubSpace.instance) {
      SubSpace.instance = new SubSpace();
    }

    return SubSpace.instance;
  }

  init() {
    this.fastify = Fastify({
      logger: true,
      trustProxy: process.env.TRUST_PROXY ? true : false,
    });

    this.registerOptions();
    this.registerRoutes();
  }

  registerOptions() {}

  registerRoutes() {}

  async run() {
    if (!this.fastify) {
      throw new Error("Fastify instance has not been created!");
    }

    const PORT_VALUE = process.env.PORT ?? "8080";
    const PORT = Number(PORT_VALUE);
    if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
      throw new Error("PORT must be an integer between 1 and 65535");
    }

    try {
      await this.fastify.listen({
        port: PORT,
        host: process.env.HOST ?? "127.0.0.1",
      });
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}
