//database connection parameters please see http://docs.mlab.com/ for more info
let db_vendor = '@ds113122.mlab.com:13122/notivize_db'
let db_user = 'notivize_sandbox';
let db_password = 'sandman1';

//export database cred and news api key
module.exports = {
  database: 'mongodb://' + db_user + ':' + db_password + db_vendor,
  apiKey: '632422c8282d40ef988c927ab3790836'
}
