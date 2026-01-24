const form = document.getElementById("regForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;


  const name = document.getElementById("name").value;
  if (!/^[A-Za-z ]+$/.test(name)) {
    document.getElementById("nameError").innerText = "Only letters allowed";
    valid = false;
  } else {
    document.getElementById("nameError").innerText = "";
  }

 
  const email = document.getElementById("email").value;
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById("emailError").innerText = "Invalid email";
    valid = false;
  } else {
    document.getElementById("emailError").innerText = "";
  }

 
  const pass = document.getElementById("password").value;
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pass)) {
    document.getElementById("passError").innerText = "Password must have 8 characters, uppercase, lowercase, number & special character";
    valid = false;
  } else {
    document.getElementById("passError").innerText = "";
  }


  const dob = new Date(document.getElementById("dob").value);
  const age = Math.floor((new Date() - dob) / (1000 * 60 * 60 * 24 * 365));
  if (age < 18) {
    document.getElementById("dobError").innerText = "You must be 18+";
    valid = false;
  } else {
    document.getElementById("dobError").innerText = "";
  }


  const phone = document.getElementById("phone").value;
  if (!/^\d{10}$/.test(phone)) {
    document.getElementById("phoneError").innerText = "Phone must be 10 digits";
    valid = false;
  } else {
    document.getElementById("phoneError").innerText = "";
  }

  if (valid) {
    alert("Registration Successful!");
  }
});
