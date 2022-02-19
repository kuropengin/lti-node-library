const mongoose = require('mongoose');

/*
* Database class to maintain and access Platform information
*/
class Database {

  static async Get(collection, platformSchema, query) {
    let Model = mongoose.model(collection, platformSchema);
    let platformData;

      await Model.find(query)
      .then(registeredPlatform => {
        platformData = registeredPlatform;
      })
      .catch(err => console.log(`Error finding platform ${err}`));
      return platformData;
  };

  static async GetKey(collection, platformSchema, query) {
    let Model = mongoose.model(collection, platformSchema);
    let publicKey;

    await Model.find(query)
    .then(key => {
      publicKey = key[0].kid.publicKey;
    })
    .catch(err => console.log(`Error finding platform ${err}`));
    return publicKey;
  }

  static async Insert(collection, platformSchema, platform) {
    let Model = mongoose.model(collection, platformSchema);
    let savedPlatform;

    let newPlatform = new Model(platform);
    await newPlatform.save()
    .then(key => {
      savedPlatform = key;
    })
    .catch(err => {
      savedPlatform = false;
    });
    return savedPlatform;
  };

};

module.exports = Database;
