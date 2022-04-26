import articles from "../models/article.model.js";


export const APIconnected = async (req, res) => {
  try {
    res
      .status(200)
      .send("Fullstack Challenge 2021 🏅 - Space Flight News")
      .end();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const getNewestArticles = async (req, res) => {
  const start = req.query._start || 0;

  try {
    const dbArticles = await articles.find({}).sort({ "publishedAt": "desc" }).limit(10).skip(start);
    res.status(200).send(dbArticles);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const filterArticlesByName = async (req, res) => {

  const start = req.query._start || 0;
  const search = req.query._title;
  const sort = req.query._sort;
  const regex = new RegExp(search, 'i') 
7
  try {
    const dbArticles = await articles.find({title: {$regex: regex}}).sort({ "publishedAt": sort }).limit(10).skip(start);

    res.status(200).send(dbArticles);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

export const getOldestArticles = async (req, res) => {
  const start = req.query._start || 0;
  try {
    const dbArticles = await articles.find({}).sort({ "publishedAt": "asc" }).limit(10).skip(start);
    res.status(200).send(dbArticles);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const getArticleById = async (req, res) => {

  try {
    const articleById = await articles.find({ id: parseInt(req.params.id)}).limit(1);

    console.log(articleById, parseInt(req.params.id))
    res.status(200).send(articleById);
    
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

