export const validateUser = (user) => {
  console.log(user);
  const validateError = {};
  if (!user.firstName.trim()) {
    validateError.firstName = 'First Name is required';
  }
  if (!user.lastName.trim()) {
    validateError.lastName = 'Last Name is required';
  }
  if (!user.email.trim()) {
    validateError.email = 'Email Address is required';
  } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
    validateError.email = 'Invalid email format';
  }
  if (!user.password.trim()) {
    validateError.password = 'Password is required';
  } else if (user.password.length < 6) {
    validateError.password = 'Password must be at least 6 characters';
  }
  return validateError;
};

export const validateSignInUser = (user) => {
  const validateError = {};

  if (!user.email.trim()) {
    validateError.email = 'Email Address is required';
  } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
    validateError.email = 'Invalid email format';
  }
  if (!user.password.trim()) {
    validateError.password = 'Password is required';
  } else if (user.password.length < 6) {
    validateError.password = 'Password must be at least 6 characters';
  }
  return validateError;
};

export const validationBlogForm = (blogData) => {
  // console.log(blogData);
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const maxSizeInBytes = 5 * 1024 * 1024;
  const validationError = {};

  if (!blogData.title.trim()) {
    validationError.title = 'Title is required';
  }
  if (!blogData.description.trim()) {
    validationError.description = 'Description is required';
  }
  if (!blogData.category.trim()) {
    validationError.category = 'Category is required';
  }
  if (!blogData.image) {
    validationError.image = 'Image is required';
  } else {
    const fileName = blogData.image.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      validationError.image =
        'Invalid file format. Allowed formats: ' + allowedExtensions.join(', ');
    }

    if (blogData.image.size > maxSizeInBytes) {
      validationError.image = 'File size exceeds the limit (5MB)';
    }
  }
  return validationError;
};
export const validationCatagoryForm = (blogData) => {
  console.log(blogData);
  const validationError = {};

  if (!blogData.title.trim()) {
    validationError.title = 'Title is required';
  }
  if (!blogData.description.trim()) {
    validationError.description = 'Description is required';
  }
  return validationError;
};

export const validationUserForm = (userData) => {
  console.log(userData);
  const validationError = {};

  if (!userData.firstName.trim()) {
    validationError.firstName = 'First Name is required';
  }
  if (!userData.email.trim()) {
    validationError.email = 'Email Address is required';
  } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
    validationError.email = 'Invalid email format';
  }
  if (!userData.password.trim()) {
    validationError.password = 'Password is required';
  } else if (userData.password.length < 6) {
    validationError.password = 'Password must be at least 6 characters';
  }
  return validationError;
};
