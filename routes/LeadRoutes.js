const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const leadController = require("../controllers/LeadController");

router.post("/register", leadController.create);
router.get(
  "/leads",
  authMiddleware,
  leadController.index
);
router.get(
  "/leads/:id",
  authMiddleware,
  leadController.show
);
router.put(
  "/leads/:id",
  authMiddleware,
  leadController.update
);

module.exports = router;
