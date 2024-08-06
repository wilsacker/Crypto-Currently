const express = require("express");
const { requireLogin, allowGuests } = require("../helpers/auth");
const router = express.Router();
// Render homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.logged_in,
      username: req.session.username,
    });
  } catch (error) {
    console.error("Error rendering homepage:", error);
    res.status(500).json({ error: "Failed to render homepage" });
  }
});
// Render login page, only for guests
router.get("/login", allowGuests, (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.error("Error rendering login page:", err);
    res.status(500).json(err);
  }
});
// Render signup page, only for guests
router.get("/signup", allowGuests, (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.error("Error rendering signup page:", err);
    res.status(500).json(err);
  }
});
// Handle login POST request
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Here you would typically check the username and password against your database
    // For this example, we'll just set the session
    req.session.loggedIn = true;
    req.session.username = username;
    req.session.user_id = 1; // This should be the actual user ID from your database
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Failed to log in" });
  }
});
// Handle signup POST request
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Here you would typically create a new user in your database
    // For this example, we'll just set the session
    req.session.loggedIn = true;
    req.session.username = username;
    req.session.user_id = 1; // This should be the actual user ID from your database
    res.status(200).json({ message: "Signed up successfully" });
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ error: "Failed to sign up" });
  }
});
// Handle logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;