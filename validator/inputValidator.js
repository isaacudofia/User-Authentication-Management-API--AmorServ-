export const inputValidator = (email, password, name = undefined) => {
  // For registration: name, email, password required
  // For login: only email, password required
  if (name !== undefined) {
    if (!name || !email || !password) {
      throw new Error(
        "All fields (name, email and password) are required, please try again..."
      );
    }
  } else {
    if (!email || !password) {
      throw new Error("Email and password are required, please try again...");
    }
  }

  //Check if entered email is valid or not
  if (
    !(
      email.toString().includes("@gmail.com") ||
      email.toString().includes("@yahoo.com")
    )
  ) {
    throw new Error("Invalid Yahoo or Gmail, please try again...");
  }

  //Validation for user inputted password
  if (password.toString().length <= 5) {
    throw new Error(
      "Password must be greater than 5 characters, please try again..."
    );
  }
};
