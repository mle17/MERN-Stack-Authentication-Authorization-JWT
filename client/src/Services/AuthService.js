/* eslint-disable import/no-anonymous-default-export */
export default {
  login: async (user) => {
    console.log(user);
    const res = await fetch("/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return await getUserResponse(res);
  },
  register: async (user) => {
    console.log(user);
    const res = await fetch("/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  logout: async () => {
    const res = await fetch("/user/logout");
    const data = await res.json();
    return data;
  },
  isAuthenticated: async () => {
    const res = await fetch("/user/authenticated");
    
    return await getUserResponse(res);
  },
};

let getUserResponse = async (/** @type {Response} */ response) => {
  if (response.ok) {
    return await response.json();
  }
  else {
    return { 
      isAuthenticated: false, 
      user: { 
        username: "", 
        role: "" 
      }
    };
  }
}