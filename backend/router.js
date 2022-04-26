import { Router } from "express";
const router = Router();
import {
  APIconnected,
  getOldestArticles,
  filterArticlesByName,
  getNewestArticles,
  getArticleById,
} from "./controllers/articles.controllers.js";




router.get("/", APIconnected);
router.get("/articles", getOldestArticles);
router.get("/filterByName", filterArticlesByName);
router.get("/newest", getNewestArticles);
router.get("/articles/:id", getArticleById);

export default router;