



import express from "express";

const router = express.Router();

router.get("/get-data", (req, res) => {
  // RETURN SUCCESS!
  res.json({ message: "Hello, World!" });
})


export default router;