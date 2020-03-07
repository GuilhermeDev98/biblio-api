const fs = require('fs');

const folder = './src/controllers/'
const model = process.argv[2]
const lower = process.argv[2].toLowerCase()
const plural = `${lower}s`

fs.writeFile(`${folder}${model}Controller.js`, 
`
const HasPemission = require("../utils/HasPemission");
const ${model} = require("../models/${model}");

module.exports = {
  async index(req, res) {
    if (await HasPemission("index_${lower}", req.user)) {
      const ${plural} = await ${model}.findAll();
      return res.json(${plural});
    }
    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async store(req, res) {
    if (await HasPemission("store_${lower}", req.user)) {
      const ${lower} = await ${model}.create(req.body);
      return res.status(201).json(${lower});
    }
    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async update(req, res) {
    if (await HasPemission("update_${lower}", req.user)) {
      const ${lower} = await ${model}.findByPk(req.params.id);
      await ${lower}.update(req.body);
      return res.status(201).json(${lower});
    }

    return res.status(401).json({ error: { message: "unauthorized" } });
  },
  async destroy(req, res) {
    if (await HasPemission("delete_${lower}", req.user)) {
      const ${lower} = await ${model}.findByPk(req.params.id);
      await ${lower}.destroy(req.body);
      return res.status(204).json(${lower});
    }

    return res.status(401).json({ error: { message: "unauthorized" } });
  }
};

`
, function (err) {
  if (err) return console.log(err);
  console.log(`${process.argv[2]} Controller Created`);
});