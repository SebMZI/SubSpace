import "./src/config/env.config";
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SubSpace API',
            version: '1.0.0',
            description: 'A self-hosted application to privately manage and organize your YouTube subscriptions. Save channels and videos, categorize them with custom tags, and access them easily without relying on YouTube’s built-in subscription system.'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT ?? 3000}`,
            }
        ]
    },
    apis: ['./src/routes/*.ts'] // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;