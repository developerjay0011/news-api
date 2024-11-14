const admin = require("firebase-admin");
const serviceAccount = require("../utils/newsapp-6d31e-firebase-adminsdk-u1b5m-3b4c273f39.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;