const db = require('./server/db'); 

db.sync()  // sync our database
.then(() => require('./server')) // then start our express server