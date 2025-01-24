const express = require('express');
const bodyParser = require('body-parser');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const app = express();

// Setup logger
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new transports.Console()
    ],
});


app.use(bodyParser.json());

// Example route
app.get('/', (req, res) => {
    logger.info('Root route accessed');
    res.send('<h1>Hello from Node.js App; ELK; AWS EKS!</h1>');
});

app.listen(3000, () => {
    logger.info('Server started on port 3000');
});
