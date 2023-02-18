const dbc = require('db-core');
const config = require("../../config");
const { Schema } = require('mongoose');
const MongoSequence = require('mongoose-sequence');
const Mongo = dbc.MongooseDb(config.development.mongodb1);
const AutoIncrement = MongoSequence(Mongo);

const tablename = "table1";
const Table1Schema = Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
}, { autoCreate: false, autoIndex: false });

Table1Schema.plugin(AutoIncrement, { id: 'Table1Schema_AutoIncrement_id', inc_field: 'id' });
const Table1 = Mongo.model(tablename, Table1Schema);
module.exports = Table1;
