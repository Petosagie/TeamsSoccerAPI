const swaggerAutogen = require('swagger-autogen')();  

const doc = {
    info: {
        title: "TeamSoccerAPI",
        description: "API for NodeJS (TeamSoccerAPI) Information on teams, players, coaches, and matches."
    },
    host: "http://localhost:3000",
    schemes: ['https']
    };

const outputFile = './swagger.json';    
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
