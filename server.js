// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   // console.log("HEY");
   res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
   var newOne = req.body;
   var newId;
   console.log(JSON.stringify(req.body));
   console.log(newOne);
   
     if (todos.length === 0) {
        newId = 1;
        console.log("this is the same");
     } else {
      newId = todos[todos.length-1]._id+1;
     }
     var newTask = req.body.task;
     var newScript = req.body.description;
     var newTodo = todos.push({'_id': newId, 'task': newTask, 'description': newScript});
     
     // console.log(todos[i]._id);
     // console.log(newOne.id);
   
   res.send(todos[todos.length-1]);
   // res.json(newOne);
   // todos.push(newOne);
   
   res.end();
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   // var idChange = req.params.id-1;
   // var newTodo;
   // // var parseTodo = parseInt(idChange);
   // for (var i = 0; i < todos.length; i++) {
   //    if (todos[i]._id == idChange) {
   //      console.log(todos[i]._id);
   //      console.log(idChange);
   //      newTodo =todos[idChange];
   //    }
   // }
   // console.log(idChange);
   // console.log(JSON.stringify(newTodo));
   // res.json(todos[newTodo]);
   var idChange = req.params.id-1;
   res.json(todos[idChange]);

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   todos.forEach(function(el, index) {
    console.log(el._id);
    console.log(req.params.id);
    if (el._id == req.params.id) {
      console.log(todos[index]);
      // console.log(req.params.id);
      console.log(todos[index].task);
      console.log(todos[index].description);
      // req.body.task = todos[index].task;
      // req.body.description = todos[index].description;
      // todos[index]._id = req.body._id;
      todos[index].task = req.body.task;
      todos[index].description = req.body.description;
      // console.log("id of index is " + todos[index]._id);
      // console.log("id of put is " + req.body._id);
      console.log(req.body.task);
      console.log(req.body.description);
      res.json(req.body);
    }

   });
   
   // console.log(req.body);
   res.end();
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   console.log(req.params.id-1);
   res.json(delete todos[req.params.id-1]);
   // delete todos[req.params.id-1];
   res.end();
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
