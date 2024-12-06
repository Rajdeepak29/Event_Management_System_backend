const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);

router.post("/users/signup", userController.createUser);
router.post("/users/login", userController.login);
router.post("/admin/login", userController.adminlogin);
router.post("/addEvent", userController.addevent);
router.post("/addCategory", userController.addcategory);
router.get("/allEvent", userController.allevent);
router.delete("/allEvent/:Id", userController.deleteEvent);
router.put("/allEvent/:Id", userController.updateEvent);
router.get("/eventdetails/:Id", userController.eventDetails);
router.get("/allcategory", userController.allCategory);
router.delete("/allcategory/:Id", userController.deleteCategory);
router.put("/allcategory/:Id", userController.updateCategory);
router.post("/createCheckoutSession", userController.checkoutSession);
router.get(
  "/getBookingDetails/:username",
  userController.getBookingdetailsUsername
);
router.get("/getBookingDetail", userController.getBookingdetails);
router.get("/count-tickets", userController.countTickets);
module.exports = router;
