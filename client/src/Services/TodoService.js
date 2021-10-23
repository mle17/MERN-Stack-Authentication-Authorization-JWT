/* eslint-disable import/no-anonymous-default-export */
export default {
  getTodos: async () => {
    const response = await fetch("/user/todos");

    return await getResponse(response);
  },
  postTodo: async (/** @type {any} */ todo) => {
    const response = await fetch("/user/todo", {
      method: "post",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await getResponse(response);
  },
};

let getResponse = async (/** @type {Response} */ response) => {
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