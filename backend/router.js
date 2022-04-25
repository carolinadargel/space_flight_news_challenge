import { Router } from "express";
const router = Router();
import {
  APIconnected,
  getOldestArticles,
  filterArticlesByName,
  getNewestArticles,
  // getLastId,
} from "./controllers/articles.controllers.js";




router.get("/", APIconnected);
router.get("/articles", getOldestArticles);
router.get("/filterByName", filterArticlesByName);
router.get("/newest", getNewestArticles);

export default router;