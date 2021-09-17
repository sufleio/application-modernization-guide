const express = require('express');
const router = express.Router();

let { users } = require('../data');

router.get("/", async (req, res) => {
  if (req.query.id) {
    const id = parseInt(req.query.id);
    users = users.filter((user) => user.id === id);
  }
  res.json(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push({
    id: (users.length + 1),
    name: user.name,
  });
  res.json(users);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (id) {
        users = users.filter(user => user.id !== parseInt(id));
        res.json(users);
    } else {
        res.status(404);
    }
});

module.exports = router;
