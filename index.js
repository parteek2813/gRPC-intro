const grpc = require("@grpc/grpc-js");
const todosProto = grpc.load("load.proto");

const server = new grpc.Server();

const todos = [
  {
    id: "1",
    title: "Todo1",
    content: "Content of todo 1",
  },
  {
    id: "2",
    title: "Todo2",
    content: "Content of todo 2",
  },
];

server.addService(todosProto.TodoService.service, {
  listTodos: (call, callback) => {
    callback(null, todos);
  },
  CreateTodo: (call, callback) => {
    let incomingNewTodo = call.request;
    todos.push(incomingNewTodo);
    callback(null, incomingNewTodo);
  },
  getTodo: (call, callback) => {
    let incomingId = call.request;
  },
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("server started");
server.start();
