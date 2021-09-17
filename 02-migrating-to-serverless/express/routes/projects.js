const express = require("express");
const router = express.Router();

let { projects, users } = require("../data");

router.get("/", async (req, res) => {
  if (req.query.id) {
    const id = parseInt(req.query.id);
    projects = projects.filter((project) => project.id === id);
  }
  projects = projects.map((project) => {
    return {
      ...project,
      users: users.filter((user) => project.users.indexOf(user.id) > -1),
    };
  });
  res.json(projects);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  projects.push({
    id: projects.length + 1,
    name,
  });
  res.json(projects);
});

router.put("/:id", (req, res) => {
  const { user } = req.body;
  projects.push({
    id: projects.length + 1,
    user,
  });
  res.json(projects);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    projects = projects.filter((project) => project.id !== parseInt(id));
    res.json(projects);
  } else {
    res.status(404);
  }
});

module.exports = router;
