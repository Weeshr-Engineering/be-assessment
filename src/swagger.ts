import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Bookstore API Documentation",
      version: "0.0.1",
      description: "Bookstore API End Points Documentation",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1/",
        description: "Local server",
      },
      {
        url: "https://#/",
        description: "Live server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.route.ts"],
};

const specs = swaggerJsdoc(options);

export { specs };