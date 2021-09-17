const express = require("express");
const app = express();

const { users, projects } = require('./routes');

app.use(express.json());

app.use('/users', users);
app.use('/projects', projects);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
