const express= require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing= require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const {index, renderNewForm, showListing, createListing, renderEditForm, updateListing, deleteListing , renderTrending, renderRooms, renderIconicCities, renderMountains, renderCastles, renderCamping, renderBeaches, renderFarms, renderArctic, renderDomes, renderSearch} = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get( wrapAsync(index))
  .post( isLoggedIn , upload.single("listing[image]"), validateListing , wrapAsync(createListing));

//New Route
router.get("/new", isLoggedIn , renderNewForm);

router.get("/search" , renderSearch);

router.get("/trending", renderTrending);
router.get("/rooms", renderRooms);
router.get("/iconic_cities", renderIconicCities);
router.get("/mountains", renderMountains);
router.get("/castles", renderCastles);
router.get("/beaches", renderBeaches);
router.get("/camping", renderCamping);
router.get("/farms", renderFarms);
router.get("/arctic", renderArctic);
router.get("/domes", renderDomes);

router
   .route("/:id")
   .get( wrapAsync(showListing))
   .put(isLoggedIn , isOwner , upload.single("listing[image]") ,validateListing , wrapAsync(updateListing))
   .delete( isLoggedIn , isOwner, wrapAsync(deleteListing));

  
//Edit Route
router.get("/:id/edit", isLoggedIn , isOwner , wrapAsync(renderEditForm));

  
module.exports = router;

  