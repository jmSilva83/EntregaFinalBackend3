import winston from 'winston';

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info: 'blue',
        debug: 'white',
    },
};

const formatJSON = winston.format((info) => {
    let message = info.message;
    if (typeof message !== 'string') {
        message = String(message);
    }
    if (message.includes('Generated pets:')) {
        try {
            const jsonPart = message.replace('Generated pets: ', '').trim();
            if (
                jsonPart &&
                jsonPart.startsWith('{') &&
                jsonPart.endsWith('}')
            ) {
                const formattedJSON = JSON.stringify(
                    JSON.parse(jsonPart),
                    null,
                    2
                );
                info.message = `Generated pets:\n${formattedJSON}`;
            } else {
                info.message = `Generated pets: ${jsonPart}`;
            }
        } catch (error) {
            info.message = `Generated pets (invalid JSON format): ${message}`;
        }
    }

    return info;
});

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                formatJSON(),
                winston.format.colorize({
                    colors: customLevelOptions.colors,
                }),
                winston.format.printf((info) => {
                    return `${info.level}: ${info.message}`;
                })
            ),
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.prettyPrint(),
        }),
    ],
});

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(
        `${req.method} en ${req.url} - ${new Date().toLocaleTimeString(
            'es-AR',
            { hour12: false }
        )}`
    );
    next();
};

export { addLogger, logger };
