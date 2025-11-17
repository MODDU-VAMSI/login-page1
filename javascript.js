function toggleForms() {
  document.getElementById("signupForm").classList.toggle("active");
  document.getElementById("loginForm").classList.toggle("active");
}

// SIGNUP FUNCTION
function signup() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;
  const msg = document.getElementById("signupMsg");

  msg.style.color = "red";

  if (!name || !email || !password || !confirmPassword) {
    msg.textContent = "All fields are required!";
    return;
  }
  if (!validateEmail(email)) {
    msg.textContent = "Invalid email format!";
    return;
  }
  if (password.length < 6) {
    msg.textContent = "Password must be at least 6 characters!";
    return;
  }
  if (password !== confirmPassword) {
    msg.textContent = "Passwords do not match!";
    return;
  }

  // Save user
  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  msg.style.color = "green";
  msg.textContent = "Signup successful! Please login.";

  setTimeout(() => toggleForms(), 1000);
}

// LOGIN FUNCTION
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMsg");

  msg.style.color = "red";

  const user = JSON.parse(localStorage.getItem("user"));

  if (!email || !password) {
    msg.textContent = "All fields are required!";
    return;
  }
  if (!user) {
    msg.textContent = "No user found. Please signup first.";
    return;
  }
  if (email === user.email && password === user.password) {
    msg.style.color = "green";
    msg.textContent = `Welcome, ${user.name}! Login successful.`;
  } else {
    msg.textContent = "Invalid email or password!";
  }
}

// EMAIL VALIDATION
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
