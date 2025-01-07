import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Topicos API",
      version: "1.0.0",
      description: "API de chistes para topicos",
      contact: {
        name: "Brandon Gutierrez",
      },
      servers: [
        {
          url: "http://localhost:3005",
          description: "Local server",
        },
      ],
    },
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsdoc(options);
export default specs;
