const headingOptions = ["Sign up", "Login"];
const heading = document.createElement("h2");
heading.textContent = headingOptions[0];

style(heading, {
  textAlign: "center",
  margin: "5px",
});

const labels = ["Username", "Email", "Password"];
const types = ["text", "email", "password"];

const textContents = [
  "Already have an account? Login here.",
  "If you don't have an account. Sign up",
];

const inputStyle = {
  padding: "5px",
  border: "1px solid grey",
  borderRadius: "5px",
  marginBottom: "8px",
};

const form = document.createElement("form");
form.appendChild(heading);
form.classList.add("form");
form.addEventListener("submit", handleSubmit);

function style(el, styles) {
  Object.assign(el.style, styles);
}

function createInput(index) {
  const input = document.createElement("input");
  input.type = types[index];
  input.name = labels[index].toLowerCase();
  input.id = labels[index].toLowerCase();
  input.placeholder = `Enter your ${labels[index].toLowerCase()}...`;
  style(input, inputStyle);
  return input;
}

function createLabel(index) {
  const label = document.createElement("label");
  label.textContent = labels[index];
  label.setAttribute("for", labels[index].toLowerCase());
  label.style.marginBottom = "5px";
  return label;
}

for (let i = 0; i < labels.length; i++) {
  form.appendChild(createLabel(i));
  form.appendChild(createInput(i));
}

const toggleButton = document.createElement("button");
toggleButton.textContent = textContents[0];
toggleButton.type = "button";

style(toggleButton, {
  textAlign: "center",
  border: "none",
  background: "transparent",
  margin: "8px 0px 0px 0px",
  fontSize: "14px",
  color: "blue",
  cursor: "pointer",
});

toggleButton.addEventListener("click", handleLogin);

function handleLogin(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll("input");
  const labelss = document.querySelectorAll("label");

  if (heading.textContent === headingOptions[0]) {
    heading.textContent = headingOptions[1];
    labelss.forEach((labels) => {
      if (labels.textContent === "Username") {
        labels.style.display = "none";
      }
    });
    inputs.forEach((input) => {
      if (input.name === "username") {
        input.style.display = "none";
      }
    });
    toggleButton.textContent = textContents[1];
  } else {
    heading.textContent = headingOptions[0];
    labelss.forEach((labels) => {
      if (labels.textContent === "Username") {
        labels.style.display = "block";
      }
    });
    inputs.forEach((input) => {
      if (input.name === "username") {
        input.style.display = "block";
      }
    });
    toggleButton.textContent = textContents[0];
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  let obj = {};
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    obj[input.name] = input.value;
  });

  if (heading.textContent === headingOptions[0]) {
    if (!obj.username || !obj.email || !obj.password) {
      alert("Username, email, and password are required!");
      return;
    }
  } else {
    if (!obj.email || !obj.password) {
      alert("Email and password are required!");
      return;
    }
  }

  try {
    const endpoint = heading.textContent === headingOptions[0] ? "register" : "login";
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Operation failed");
      return;
    }

    alert(data.message || "Operation successful");
    inputs.forEach((input) => (input.value = ""));
    obj = {};
    getAllUsers(); // Refresh user list
  } catch (error) {
    alert("An error occurred");
  }
}

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";
submitButton.classList.add("button");
style(submitButton, {
  padding: "5px 10px",
  border: "1px solid grey",
  borderRadius: "5px",
  background: "#007bff",
  color: "white",
  cursor: "pointer",
});

form.appendChild(submitButton);
form.appendChild(toggleButton); // Added toggleButton to form
document.body.appendChild(form);

function getAllUsers() {
  fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      renderTable(data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      alert("Failed to load users");
    });
}

getAllUsers();

const table = document.createElement("table");

style(table, {
  borderCollapse: "collapse",
  maxWidth: "800px",
  border: "1px solid black",
  width: "100%",
  margin: "20px auto",
  textAlign: "center",
});

const thead = document.createElement("thead");
const tbody = document.createElement("tbody");

function createThead() {
  const tr = document.createElement("tr");
  thead.appendChild(tr);

  style(thead, {
    backgroundColor: "white",
    border: "1px solid black",
  });

  labels.forEach((label) => {
    let th = document.createElement("th");
    th.style.border = "1px solid black";
    th.textContent = label;
    tr.appendChild(th);
  });

  table.appendChild(thead);
}

function createTbody(users) {
  if (!Array.isArray(users) || users.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = "No users found";
    td.colSpan = labels.length;
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  users.forEach((user) => {
    const tr = document.createElement("tr");
    style(tbody, {
      backgroundColor: "rgb(232, 231, 231)",
      border: "1px solid black",
    });

    Object.values(user).forEach((value) => {
      let td = document.createElement("td");
      td.style.border = "1px solid black";
      td.textContent = value;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

document.body.appendChild(table);

function renderTable(users) {
  thead.innerHTML = "";
  tbody.innerHTML = "";
  createThead();
  createTbody(users);
}