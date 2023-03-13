const db = require('../models');
const Prophet = db.prophets;
const passwordUtil = require('../util/passwordComplexityCheck');
//the issue here we create the data and then we store in data base Db
module.exports.create = (req, res) => {
 
  try {
 //we use exception try-catch block to checkif username or paassword  is wrong or right
    if (!req.body.username || !req.body.password)
     {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const prophets = new Prophet(req.body);
    prophets
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
    // here , this block catches the error from mongodb 
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  } 
  //here this block catches all the uncaught Error username /password 
  catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getAll = (req, res) => {
  // console.log(Prophet)
  try {
    Prophet.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getProphets = (req, res) => {
  try {
    const username = req.params.username;
    Prophet.find({ username: username })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateProphets = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    Prophet.findOne({ 'username': username }, function (err, prophet) {
      // console.log(err)
      prophet.username = req.params.username;
      prophet.password = req.body.password;
      prophet.displayName = req.body.displayName;
      prophet.info = req.body.info;
      prophet.profile = req.body.profile;
      prophet.save(function (err) {
        // console.log(err)
        if (err) {
          res.status(500).json(err || 'Some error occurred while updating the contact.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    // console.log(err)
    res.status(500).json(err);
  }
};

module.exports.deleteProphets = async (req, res) => {
  try {
    const username = req.params.username;
    // here this block just checkes if username if empty or not
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    Prophet.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the contact.');
      } else {
        //after test delete send response(result shows 204 No content)
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the contact.');
  }
};
