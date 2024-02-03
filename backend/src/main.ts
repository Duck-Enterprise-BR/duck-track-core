import { runScheduledJobs } from "./scheduled.jobs";
import { serverDevelop } from "./server-develop";
import { ServerRoutes } from "./server.routes";
import { connectRedis } from "./providers/redis/redis-cliente";
import { environment } from "./environment";
import { connect } from "./providers/firebase/firebase";
import { logger } from "./application/logger/server-logger";
import mongoose from "mongoose";
import express from "express";
import * as cluster from "cluster";

import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());

const start = async (): Promise<string> => {
    app.use(express.json());
    connect();

    await mongoose.connect(environment.mongoUrl, {
        dbName: environment.mongoDb
    }).then(() => {
        logger.info("Mongoose connected");
    });
    await connectRedis();

    app.use(ServerRoutes);

    /* for (let i = 0; i < environment.nodeForcks; i++) {
        cluster.default.fork();
    } */

    if (environment.developMode) {
        await serverDevelop(app);
    }

    runScheduledJobs();

    app.listen(environment.port, environment.host);
    return `Server listening on http://${environment.host}:${environment.port}`;
}

try {
    start().then((message: string) => {
        logger.info(message);
    });
} catch (error) {
    console.error(error);
}
