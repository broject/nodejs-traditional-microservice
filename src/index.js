require('./services/book');
require('./services/customer');
require('./services/order');


/* using a oauth system of my own creation */
// require('./services/testOAuth');

/* using Qpaylize DB platform */
// (async () => {
//     const Table1 = require('./db/table1');
//     const newOne = new Table1({ name: "ms-test-name 2" });
//     newOne.save().then((result) => {
//         console.log('New Table1 added successfully!', result);
//     }).catch((err) => {
//         console.log('Internal Server Error!', err);
//     });
// })();