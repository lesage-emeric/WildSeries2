import type { RequestHandler } from "express";

const sayWelcome: RequestHandler = (req, res) => {
  if (req.query.name != null) {
    res.send(`Welcome to Wild Series, ${req.query.name} !`);
  } else {
    res.send("Welcome to Wild Series !");
  }
};

export default { sayWelcome };
