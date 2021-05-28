const express = require("express");
const router = express.Router();
const Portrait = require("../../models/Portrait");
const db = require("../../config/keys").mongoURI;
const mongoose = require("mongoose");


module.exports = (upload) => {
  const connect = mongoose.createConnection(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let gfs;

  connect.once("open", () => {
    // initialize stream
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
      bucketName: "uploads",
    });
  });

  /*
        Create: Upload a single Portrait with image file
    */
  router
    .route("/")
    .post(upload.single("file"), (req, res, next) => {
      console.log("in the post!", req.body);
      // check for existing images
      Portrait.findOne({ description: req.body.description })
        .then((portrait) => {
          console.log(portrait);
          if (portrait) {
            // come back to delete file that was just uploaded
            return res.status(200).json({
              success: false,
              message: "Portrait already exists",
            });
          }

          let newPortrait = new Portrait({
            title: req.body.title,
            artist: req.body.artist,
            description: req.body.description,
            funFact: req.body.funFact,
            imgName: req.file.filename,
            imgId: req.file.id,
          });

          newPortrait
            .save()
            .then((portrait) => {
              res.status(200).json(portrait);
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((err) => res.status(500).json(err));
    })
    /*
        List
    */
    .get((req, res, next) => {
      Portrait.find({})
        .then((portraits) => {
          res.status(200).json(portraits);
        })
        .catch((err) => res.status(500).json(err));
    });
  /*
        Read
    */
  router.route("/:portraitId").get(async (req, res) => {
    try {
      let portrait = await Portrait.findOne({ _id: req.params.portraitId });
      return res.json(portrait);
    } catch (err) {
      console.log(err);
    }
  });

  /*
        GET: Delete an image from the collection
    */
  router.route("/delete/:portraitId").get((req, res, next) => {
    Portrait.findOne({ _id: req.params.portraitId })
      .then((portrait) => {
        if (portrait) {
          Portrait.deleteOne({ _id: req.params.portraitId })
            .then(() => {
              return res.status(200).json({
                success: true,
                message: `File with ID: ${req.params.portraitId} deleted`,
              });
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        } else {
          res.status(200).json({
            success: false,
            message: `File with ID: ${req.params.portraitId} not found`,
          });
        }
      })
      .catch((err) => res.status(500).json(err));
  });

  // update portrait
  router.patch("/:portraitId", async (req, res) => {
    let filter = { _id: req.params.portraitId}
    let update = req.body
    let updatedPortrait = await Portrait.findOneAndUpdate(filter, update, {
      new: true,
    });
    return res.json(updatedPortrait)
  });

  /*
        GET: Fetches all the files in the uploads collection
    */
  router.route("/files").get((req, res, next) => {
    gfs.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }

      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png" ||
          file.contentType === "image/svg"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });

      res.status(200).json({
        success: true,
        files,
      });
    });
  });

  /*
        GET: Fetches a particular file by filename
    */
  router.route("/file/:filename").get((req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }

      res.status(200).json({
        success: true,
        file: files[0],
      });
    });
  });

  /* 
        GET: Fetches a particular image and render on browser
    */
  router.route("/image/:filename").get((req, res, next) => {
    gfs.find({ filename: req.params.filename }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }

      if (
        files[0].contentType === "image/jpeg" ||
        files[0].contentType === "image/png" ||
        files[0].contentType === "image/svg+xml"
      ) {
        // render image to browser
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  });

  /*
        DELETE: Delete a particular file by an ID
    */
  router.route("/file/del/:id").post((req, res, next) => {
    console.log(req.params.id);
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      res.status(200).json({
        success: true,
        message: `File with ID ${req.params.id} is deleted`,
      });
    });
  });

  return router;
};



// // create portrait
// router.post("/", async (req, res) => {
//     const newPortrait = new Portrait({
//       artist: req.body.artist,
//       description: req.body.description,
//       funFact: req.body.funFact,
//       imgPath: req.body.imgPath,
//     });
//     try{
//       let portrait = await newPortrait.save()
//       return res.json(portrait)
//     } catch (err) {
//       console.log(err)
//     }
// });

// // read portrait
// router.get("/:portraitId", async (req, res) => {
//   try {
//     let portrait = await Portrait.findOne({ _id: req.params.portraitId })
//     return res.json(portrait)
//   } catch (err) {
//     console.log(err);
//   }
// });

// // update portrait
// router.patch("/:portraitId", async (req, res) => {
//   let filter = { _id: req.params.portraitId}
//   let update = req.body
//   let updatedPortrait = await Portrait.findOneAndUpdate(filter, update, {
//     new: true,
//   });
//   return res.json(updatedPortrait)
// });

// // destroy portrait
// router.delete("/:portraitId", async (req, res) => {
//   try {
//     let portrait = await Portrait.deleteOne({_id: req.params.portraitId});
//     return res.json(portrait);
//   } catch (error) {
//     console.log(error);
//   }
// })

// // list portrait
// router.get("/", async (req, res) => {
//   try{
//     let portraits = await Portrait.find();
//     return res.json(portraits);
//   } catch (error) {
//     console.log(error)
//   }
// })

// module.exports = router;
