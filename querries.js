db.createCollection("users");

db.createCollection("tasks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        completed: {
          bsonType: "bool",
        },
        created: {
          bsonType: "date",
        },
        updated: {
          bsonType: "bool",
        },
      },
    },
  },
});

const insertUser = (database, name, age, gender) => {
  try {
    db[database].insertOne({ name, age, gender });
  } catch (error) {
    console.log(error.message);
  }
};

const updateNamebyID = (database, id, newValue) => {
  try {
    db[database].updateOne({ _id: id }, { $set: { name: newValue } });
  } catch (error) {
    console.log(error.message);
  }
};

const getAllNames = (database) => {
  try {
    db[database]
      .find({}, { _id: false, name: true, age: false, gender: false })
      .sort({ name: 1 });
  } catch (error) {
    console.log(error.message);
  }
};

const getFemaleUsers = (database) => {
  try {
    db[database].find({ gender: "female" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateAllToComplete = (database) => {
  try {
    db[database].updateMany({}, { $set: { completed: false } });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteAllCompleted = (database) => {
  try {
    db[database].deleteMany({ completed: true });
  } catch (error) {
    console.log(error.message);
  }
};

const getActiveSorted = (database, id) => {
  try {
    db[database].find({ _id: id, completed: false }).sort({ created: 1 });
  } catch (error) {
    console.log(error.message);
  }
};
