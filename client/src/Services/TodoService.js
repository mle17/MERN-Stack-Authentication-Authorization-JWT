/* eslint-disable import/no-anonymous-default-export */
const getResponse = async (/** @type {Response} */ response) => {
  console.log(response);

  if (response.ok) {
    return await response.json();
  }
  else {
    return { 
      message: { 
        msgBody: `Error Status Code: ${response.status}, ${response.statusText}.}`, 
        msgError: true,
      }
    };
  }
}

export default {
  getTodos: async () => {
    console.log(`Calling get todos`);

    const response = await fetch("/user/todos", {
      method: "get",
    });
    return await getResponse(response);
  },

  postTodo: async (/** @type {any} */ todo) => {
    console.log(`Calling create todos`);

    const response = await fetch("/user/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await getResponse(response);
  },

  deleteTodo: async (/** @type {any} */ todoId) => {
    console.log(`Calling deleting todo with ID: ${todoId}`);

    const response = await fetch(`/user/todos/${todoId}`, {
      method: "DELETE",
    });

    const responseObject = await getResponse(response);
    return responseObject;
  },
};