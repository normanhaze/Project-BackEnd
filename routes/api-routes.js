const apiRouter = require("express").Router();
const home = require("../controllers/home");
const journeyRouter = require("./journey-routes");
const userRouter = require("./user-routes");

apiRouter.route("/").get(home);
apiRouter.use("/journeys", journeyRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;
