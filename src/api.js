// import jwt from 'jsonwebtoken';
const BASE_URL = 'http://localhost:8080/';

export const getUserData = async () => {
  try {
    const response = await fetch(`${BASE_URL}users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getUserProfileData = async () => {
  try {
    const response = await fetch(`${BASE_URL}users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    // console.log(responseData.user[0]);
    return responseData;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getBlogsData = async () => {
  try {
    const response = await fetch(`${BASE_URL}blogs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    // console.log(responseData);
    return responseData; // Make sure to return the data
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getCatagoriesData = async () => {
  try {
    const response = await fetch(`${BASE_URL}catagories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const getBlogDataById = async ({ id }) => {
  // console.log(id);
  try {
    const response = await fetch(`${BASE_URL}blogs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    // console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const registerUser = async ({ userData }) => {
  console.log(userData.firstName);
  try {
    const response = await fetch(`${BASE_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
export const loginUser = async ({ userData }) => {
  try {
    const response = await fetch(`${BASE_URL}users`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const usersData = await response.json();

    // Find user by email
    const user = usersData.find((user) => user.email === userData.email);

    if (user) {
      // User found, now check password
      if (user.password === userData.password) {
        const timestamp = Date.now().toString();
        const randomNumber = Math.random().toString().slice(2, 12); // Get a random number and remove the leading "0."
        const token = timestamp + randomNumber;
        // console.log(token);
        return { data: { user, token }, error: null };
      } else {
        // Incorrect password
        return { data: null, error: { password: 'Incorrect password' } };
      }
    } else {
      // User not found
      return { data: null, error: { user: 'User not found' } };
    }
  } catch (error) {
    console.error('API error:', error);
    return { data: null, error: { api: 'API error' } };
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`${BASE_URL}blogs/${blogId}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Error deleting blog');
    }

    return true; // Indicate success
  } catch (error) {
    throw new Error('Error deleting blog');
  }
};
