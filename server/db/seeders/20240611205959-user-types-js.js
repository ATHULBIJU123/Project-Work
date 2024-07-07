'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return models.user_types
      .insertMany([
        {
          _id:"6668bcc6a10df1c8ac10c153",
          user_type:"admin",
        },

        {
          _id:"6668bcd7a10df1c8ac10c154",
          user_type:"employee",
        },
      ]).then(res => {
      // Prints "1" 
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return models.user_types
      .deleteMany({
        _id: {
          $in: [
            "6668bcc6a10df1c8ac10c153",
            "6668bcd7a10df1c8ac10c154",
          ],
        },
      })
      .then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  },
};
