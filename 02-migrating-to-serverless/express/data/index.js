let users = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
];

let projects = [
  {
    id: 1,
    name: "Awesome Project 1",
    users: [1],
  },
  {
    id: 2,
    name: "Awesome Project 2",
    users: [1, 2],
  },
];

module.exports = {
  users,
  projects,
};
