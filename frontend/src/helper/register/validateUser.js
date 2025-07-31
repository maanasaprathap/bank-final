const validateUser = (user) => {
    const errors = {};
  
    // Helper function to add error message
    const addError = (field, message) => {
      errors[field] = message;
      errors.status = true;
    };
  
    // Validate firstname
    if (!user.firstname) {
      addError('firstname', 'Firstname is required');
    }

    // Validate lastname
    if (!user.lastname) {
      addError('lastname', 'Lastname is required');
    }
  
    // Validate email
    if (!user.username) {
      addError('email', 'Email is required');
    } else if (!isValidEmail(user.username)) {
      addError('email', 'Invalid email format');
    }
  
    // Validate phone number
    if (!user.tel) {
      addError('tel', 'Phone number is required');
    }
  
    // Validate password
    if (!user.password) {
      addError('password', 'Password is required');
    } else if (user.password.length < 8) {
      addError('password', 'Password must be at least 8 characters long');
    }
  
    // Validate confirm password
    if (user.password !== user.confirmPassword) {
      addError('confirmPassword', 'Passwords do not match');
    }
  
    // Validate gender
    if (!user.gender) {
      addError('gender', 'Gender is required');
    }
  
    // Validate date of birth
    if (!user.dob) {
      addError('dob', 'Date of birth is required');
    }
  
    // Return the errors object
    return { errors, hasErrors: errors.status };
  };
  // function to validate email format
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  export default validateUser