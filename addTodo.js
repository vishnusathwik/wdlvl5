// addTodo.js
var argv = require("minimist")(process.argv.slice(2));
const db = require("./models/index");

const createTodo = async (params) => {
  try {
    await db.Todo.addTask(params);
  } catch (error) {
    console.error(error);
  }
};

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Days must be an integer please enter a valid value");
  }
  const today = new Date();
  const eachDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * eachDay);
};
(async () => {
  const { title, dueInDays } = argv;
  if (!title || dueInDays === undefined) {
    throw new Error(
      'A valid title and due in days are required. \nSample command: node addTodo.js --title="Buy milk" --dueInDays=-2 '
    );
  }
  await createTodo({ title, dueDate: getJSDate(dueInDays), completed: false });
  await db.Todo.showList();
})();
