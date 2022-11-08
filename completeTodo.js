// completeTodo.js
var argv = require("minimist")(process.argv.slice(2));
const db = require("./models/index");
const markAsComplete = async (id) => {
  try {
    await db.Todo.markAsComplete(id);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = argv;
  if (!id) {
    throw new Error("Please pass an ID as it is needed");
  }
  if (!Number.isInteger(id)) {
    throw new Error("The ID must be an integer,So please crosscheck and type again");
  }
  await markAsComplete(id);
  await db.Todo.showList();
})();
