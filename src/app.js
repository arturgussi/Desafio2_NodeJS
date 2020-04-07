const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);  
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const likes = 0;

  const repository = {
    id : uuid(),
    title,
    url,
    techs,
    likes
  };

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repIndex = repositories.findIndex(repository => repository.id === id);

  if (repIndex < 0) {
    return response.status(400).json("Id não é válido, tente novamente!")
  }

  const likes = repositories[repIndex].likes;

  repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repIndex] = repository;

  return response.json(repositories[repIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repIndex = repositories.findIndex(repository => repository.id === id);

  if (repIndex < 0) {
    return res.status(400).json("Id não é válido, tente novamente!")
  }

  repositories.splice(repIndex, 1);

  return res.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repIndex = repositories.findIndex(repository => repository.id === id);

  if (repIndex < 0) {
    return response.status(400).json("Id não é válido, tente novamente!")
  }

  let likes = repositories[repIndex].likes
  likes += 1;

  const { title, url, techs } = repositories[repIndex];

  repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repIndex] = repository;

  return response.json(repositories[repIndex]);
});

module.exports = app;
