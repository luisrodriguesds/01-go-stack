const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

let repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.status(200).send(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs } = request.body
  repositories.push({
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  })

  return response.status(200).send(    
    repositories[repositories.length-1]
  )
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const { url, title, techs } = request.body
  const index = repositories.findIndex(obj => obj.id == id)
  if (index == -1) {
    return response.status(400).send({message:"Repositório não existe"})
  }

  repositories[index].url = url
  repositories[index].title = title
  repositories[index].techs = techs

  return response.status(200).send(repositories[index])

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const index = repositories.findIndex(obj => obj.id == id)
  if (index === -1) {
    return response.status(400).send({ message: "Repositório não existe" })
  }
  
  repositories.splice(index, 1)
  return response.status(204).send(repositories)
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params
  const index = repositories.findIndex(obj => obj.id == id)
  if (index === -1) {
    response.status(400).send({ message: "Repositório não existe" })
  }

  repositories[index].likes += 1
  return response.status(200).send(repositories[index])
});

module.exports = app;
