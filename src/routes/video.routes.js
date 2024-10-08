import { Router } from 'express';
import {
    deleteVideo,
    getAllUserVideos,
    getAllVideos,
    getRandomVideos,
    getVideoById,
    incrementVideoView,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    updateVideoThumbnail,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
// const freeRouter=Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/upload-videos")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );
    router.route("/get-User-Videos").get(getAllUserVideos)

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideoThumbnail);

router.route("/update-video-details/:videoId").patch(updateVideo)

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);
router.route("/incrementViews/:videoId").get(incrementVideoView)


export default router
