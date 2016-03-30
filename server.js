// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

 /* GET INDEX */
 app.get('/api/todos', function index(req, res) {
   /* Create function to return index of everything
   */
   res.send({todos: todos});
 });


/* GET SHOW */
 app.get('/api/todos/:id', function show(req, res) {
   /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
  Found out this was a band-aid solution as it relies on the array staying in
  order
  /* var id = req.params.id;
   res.send(todos[id-1]);*/

// Use parseInt array method to parse through array as a query string to
// identify ID and label as "todoId" to use in next function
var todoId = parseInt(req.params.id);

// Use filter array method to idetify and match ID being called by form
// and label as foundTodo.
var foundTodo = todos.filter(function (todo) {
  return todo._id === todoId;

// What role does return todo._id == todoId; play in the callback? Does this
// translate as from the ID found with parseInt, we filter it out, and
// return it as todoID? Why not just return as todo._id?
})[0];

res.json(foundTodo);

 });

/* POST CREATE */
 app.post('/api/todos', function create(req, res) {
   // Create new var to hold new todo item and pass along
   var newTodo = req.body;

   // If array length of todos list is 0 or less than 0, new item will become
   // first item, thus ID equally 1.
   // Otherwise, new todo id is added to the end of the existing array
   // which is array.length -1 since array starts at 0, then +1
   //
   if (todos.length > 0) {
     newTodo._id = todos[todos.length -1]._id + 1;
   }
   else {
     newTodo._id = 1;
   }
   // adds (push) to existing todos array
   todos.push(newTodo);

   // send newTodo as a JSON response
   res.json(newTodo);
   /*     var task = req.body.task;
   var desc = req.body.description;
   var newTask = { task: task, description: desc, };
   // assuming that tasks is an array in our app:
   todos.push(req.body);
   res.send(req.body);*/
   // Wasn't able to get last two requirements based on mocha but would love to
   // know if my current path is doable.
   /*POST /api/todos (create)
   ✓ should respond with status 200 - Success
   ✓ should respond with JSON
   ✓ should respond with the new todo object
   1) should assign an _id to the new todo object
   2) should increment the _id number by one each time a todo is created*/
 });

/* DELETE DESTROY */
 app.delete('/api/todos/:id', function destroy(req, res) {

   // Use parseInt array method to parse out from query string
   var todoId = parseInt(req.params.id);

   // Use filter array method, same question GET SHOW
   var todoToDelete = todos.filter(function (todo) {
     return todo._id === todoId;
   })[0];

   // Use array method splice to delete matched array element by calling
   // indexOf newly created var todoTodelete which holds the ID from query
   todos.splice(todos.indexOf(todoToDelete), 1);

   // send back what was deleted as json object, client would receive 204 message
   res.json(todoToDelete);
 });

/* PUT UPDATE */
 app.put('/api/todos/:id', function update(req, res) {
   /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

// Use array method parseInt to get ID from query string
var todoId = parseInt(req.params.id);

// Use filter array method, same question GET SHOW
var todoToUpdate = todos.filter(function (todo) {
  return todo._id === todoId;
})[0];

// from array element pulled out, drill down into task and update
todoToUpdate.task = req.body.task;

// same as above but updating description
todoToUpdate.description = req.body.description;

// send back updated todo as json
res.json(todoToUpdate);

 });

/* GET SEARCH */
app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

// Parse through search query string to find match by ID
var search = parseInt(req.params.id);
// use filter array method to pull out actual key value pair from ID
search = todos.filter(function (todo) {
  return todo._id === todoId;
})[0];

searchResults = [];

search.push(searchResults);

   res.json(searchResults);
});

// I wasn't able to get this to work, but I think my logic is sound, and am
// hoping this is just a syntax or order of operation kind of error.

// Can't get passed this error: "1) should list all todos that contain the
// search term from the query parameter (e.g. `?q=discover`) in the task field"



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
