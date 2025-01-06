// Some data to make the trick

import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

/* Here you code */
const browse: RequestHandler = async (req, res, next) => {
  try {
    const categoriesFromDB = await categoryRepository.readAll();
    res.json(categoriesFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number.parseInt(req.params.id);
    const category = await categoryRepository.read(categoryId);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    const affectedRows = await categoryRepository.update(category);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = {
      name: req.body.name,
    };

    const insertId = await categoryRepository.create(newCategory);

    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    await categoryRepository.delete(categoryId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Export them to import them somewhere else

export default {
  browse,
  read,
  edit,
  add,
  destroy,
};
