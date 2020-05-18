const router = require("express").Router();
const restricted = require("../auth/restricted")
const Users = require("../Users/users-model");

router.post("/:id/journal",restricted, (req, res) => {
  req.body.user_id = req.params.id;
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
router.post("/:id/info", restricted, (req,res)=> {
  req.body.user_id = req.params.id
  const body = req.body
  Users.addUserInfo(body)
  .then(info => {
    res.status(201).json(info)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "error posting info"
    })
  })
})

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error retrieving users"
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
        errorMessage: "error retrieving entries"
      });
    });
});
router.get("/:id/journal", restricted, (req, res) => {
  req.body.user_id = req.params.id
  const id = req.body.user_id
  Users.findEnt(id)
    .then(entries => {
      res.status(200).json(entries);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error retrieving entry"
      });
    });
});
router.get("/usersinfo", (req,res) => {
  Users.findUsersInfo()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "error returning user info"
    })
  })
})
router.get("/:id/info", restricted, (req,res)=> {
  req.body.user_id = req.params.id
  const id = req.body.user_id
  Users.findInfo(id)
  .then(info => {
    res.status(200).json(info)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "error retrieving information"
    })
  })
})
router.put("/:id/entry",restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.findEntryById(id)
    .then(entry => {
      if (entry) {
        Users.update(changes, id).then(updatedEntry => {
          res.json(updatedEntry);
        });
      } else {
        res.status(404).json({
          message: `could not find entry #${id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Failed to update entry"
      });
    });
});
router.put("/:id/info", restricted, (req,res)=> {
  const { id } = req.params
  const changes = req.body
  Users.findInfoById(id)
  .then(info => {
    if (info) {
      Users.editInfo(changes, id).then(newInfo => {
        res.json(newInfo)
      })
    } else {
      res.status(404).json({
        message: `could not find info for id #${id}`
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "Failed to update Info"
    })
  })
})

router.delete('/:id/entry',restricted, (req,res)=> {
  const { id } = req.params;

  Users.remove(id)
  .then(deleted => {
    if (deleted) {
      res.json({
        removed: deleted
      })
    } else {
      res.status(404).json({
        message: `Could not find entry#${id}`
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      errorMessage: "Failed to delete entry"
    })
  })
})
router.delete('/:id/info', restricted, (req,res)=> {
  const { id } = req.params;
  Users.deleteInfo(id)
  .then(deleted => {
    if (deleted) {
      res.json({
        removed: deleted
      })
    } else {
      res.status(404).json({
        message: `could not find info with id of ${id}`
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "Error deleting user info"
    })
  })
})
router.delete('/:id', restricted, (req,res)=> {
  const { id } = req.params;
  Users.removeUser(id)
  .then(deleted => {
    if (deleted) {
      res.json({
        removed: deleted
      })
    } else {
      res.status(404).json({
        message: `could not find user with id of ${id}`
      })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "Error deleting user"
    })
  })
})


module.exports = router;
