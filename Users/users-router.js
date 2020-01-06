const router = require("express").Router();

const Users = require("../Users/users-model");

router.get("/:id/journal", (req, res) => {
  Users.findEntries()
    .then(entries => {
      res.status(200).json(entries);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error retrieving recipes"
      });
    });
});

router.post("/:id/journal", (req, res) => {
  req.body.user_id = req.params.user_id;
  const body = req.body;
  Users.addEntry(body)
    .then(entry => {
      res.status(201).json(entry);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error saving entry"
      });
    });
});

router.get("/journals", (req, res) => {
  Users.findEntries()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "problem retrieving entries"
      });
    });
});

router.get("/", (req,res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: "error retrieving users"
        })
    })
})

module.exports = router;
