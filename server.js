const express = require("express");
const app = express();
const port = 3000;

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours(); // Get current hour

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow access
  } else {
    res.send("<h1>Sorry, the website is only available from Monday to Friday, 9 AM to 5 PM.</h1>");
  }
};

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Apply middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
