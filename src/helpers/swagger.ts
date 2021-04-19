export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Books Backend API',
            version: '0.1.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
            contact: {
                name: 'Riccardo Busetti',
                url: 'riccardobusetti.xyz',
                email: 'rbusetti@unibz.it',
            },
        },
        servers: [
            {
                url: 'http://localhost:7000',
            },
        ],
    },
    apis: ['./src/routes/v1/*.ts'],
};
