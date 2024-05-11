import express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import bodyParser from 'body-parser';
import { profileResource } from './application/resources/ProfileResource';
import { leagueResource } from './application/resources/LeagueResource';
import cors from "cors"
import * as dotenv from 'dotenv'
import { errorHandler } from './application/middleware/errorHandler';
import { teamResource } from './application/resources/TeamResource';

dotenv.config()

const app = express();
app.use(cors());


// Middleware zum Fehlerhandling registrieren
app.use(errorHandler);
app.use(bodyParser.json({limit: "5mb"}));
app.use("/profile", profileResource);
app.use("/league", leagueResource);
app.use("/team", teamResource);

if (require.main === module) {
    //runs only locally
    const port = 3001;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

const server = createServer(app);

//lambda-handler
export const handler = (event: APIGatewayProxyEvent, context: Context) => {
    proxy(server, event, context);
};
