'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return models.users
          .insertMany ([
            {
              _id: "6657ecec70745989b1757fd7",
              firstname: "John",
              lastname: "Varghese",
              gender: "Male",
              mobil_no: "9874563210",
              email:"johnvarghese12345@gmail.com",
              password : "$2y$10$CJftu6Ojp9tPHeTspEVLX.jgLlIr489Xl/RorZLPBVbnGBQtI4bcS"       //John@123
            }
          ])
          .then((res) => {
            console.log(res.insertedCount)
          })
    
  },

  down: (models, mongoose) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return models.users
        .deleteMany({
          _id: {
            $in: [
              "6657ecec70745989b1757fd7",
            ],
          },
          })
        .then(res => {
        // Prints "1"
        console.log(res.deletedCount);
        });
    
  }
};
