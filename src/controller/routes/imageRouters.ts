import express from "express";
import { ImageController } from "../ImageController";


export const imageRouter = express.Router()

const imageController = new ImageController()

imageRouter.post("/create", imageController.createImage)
imageRouter.post("/tag", imageController.createTag)
imageRouter.get("/all", imageController.getAllImages)
imageRouter.get("/:id", imageController.getImageById)
