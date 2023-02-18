// ReferenceError: require is not defined in ES module scope, you can use import instead 
// This file is being treated as an ES module because it has a '.js' file extension and 
// '\package.json' contains "type": "module". 
// To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
module.exports = {
    development: {
        mysql1: {
            dialect: 'mysql',
            dialectOptions: {
                // Your db native options here
                multipleStatements: true,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            },
            pool: {//for Sequelize.pool
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {//for Sequelize.models
                freezeTableName: true,
                timestamps: false,
                paranoid: false,
                underscored: true
            },
            //Sequelize ConnectionOptions
            logging: false,
            ssl: false,
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'test',
            slaves: [{
                logging: false,
                ssl: false,
                host: 'localhost',
                port: 3307,
                username: 'root',
                password: '',
                database: 'test',
                models: ['table1']
            }, {
                logging: false,
                ssl: false,
                host: 'localhost',
                port: 3307,
                username: 'root',
                password: '',
                database: 'test_read',
                models: ['table2']
            }]
        },
        postgres1: {
            /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
            dialect: 'postgres',
            dialectOptions: {
                // Your db native options here
                multipleStatements: true,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            },
            pool: {//for Sequelize.pool
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {//for Sequelize.models
                freezeTableName: true,
                timestamps: false,
                paranoid: false,
                underscored: true
            },
            //Sequelize ConnectionOptions
            logging: false,
            ssl: false,
            host: 'localhost',
            username: 'postgres',
            password: 'pass',
            database: 'test',
            slaves: [{
                logging: false,
                ssl: false,
                host: 'localhost',
                username: 'postgres',
                password: 'pass',
                database: 'test_read',
                models: ['table1']
            }, {
                logging: false,
                ssl: false,
                host: 'localhost',
                username: 'postgres',
                password: 'pass',
                database: 'test_read',
                models: ['table2']
            }]
        },
        sqlite1: {
            dialect: 'sqlite',
            logging: false,
            storage: 'C:\\sqlite\\db\\test.db', // or ':memory:'
            dialectOptions: {
                // Your sqlite3 options here
                // for instance, this is how you can configure the database opening mode:
                // mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
            },
            define: {
                freezeTableName: true,
                timestamps: false,
                paranoid: false,
                underscored: true
            }
        },
        mongodb1: {
            dialect: 'mongodb',
            logging: false,
            dialectOptions: {
                // Your mongodb options here
                maxPoolSize: 10,
                minPoolSize: 1,
                serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            },
            host: 'localhost',
            port: 27017,
            database: 'test'
        }
    }
}
