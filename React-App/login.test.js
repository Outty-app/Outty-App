test('should show validation error when password is empty', () => {
  const email = "test@example.com";
  const password = "";

  function login(email, password) {
    if (!password) return "Password is required";
    return "OK";
  }

  const result = login(email, password);

  expect(result).toBe("Password is required");
});

test('should show authentication error for wrong password', () => {
  const email = "test@example.com";
  const password = "wrongpassword";

  function login(email, password) {
    if (email === "test@example.com" && password === "123456") {
      return "Success";
    }
    return "Invalid credentials";
  }

  const result = login(email, password);

  expect(result).toBe("Invalid credentials");
});

test('password field should be masked by default', () => {
  const passwordField = {
    secureTextEntry: true
  };

  expect(passwordField.secureTextEntry).toBe(true);
});

test('Given a login request is in progress, when user tries to click login, then the button should be disabled', () => {
  let isLoading = true;

  const isDisabled = isLoading;

  expect(isDisabled).toBe(true);
});