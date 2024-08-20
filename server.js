const express = require("express");
require("dotenv").config();

const cors = require("cors");
const app = express();

const http = require("http");
const server = http.createServer(app);

const mainRouter = express.Router();
const port = process.env.PORT;

const firebaseConfig = require("./config/firebase.config.js");
const { initializeApp } = require("firebase/app");

initializeApp(firebaseConfig);

/* Connect To Database */
const database = require("./database/database");

database();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://admin.socket.io",
    ],
    credentials: true,
  })
);

/* Routers */
const authRouter = require("./routes/auth.router.js");
const userRouter = require("./routes/user.router.js");
const reviewRouter = require("./routes/review.router.js");
const bookRouter = require("./routes/book.router.js");

/* Repositories */
const AuthRepository = require("./repositories/auth.repository.js");
const UserRepository = require("./repositories/user.repository.js");
const ReviewRepository = require("./repositories/review.repositories.js");
const BookRepository = require("./repositories/book.reppsitory.js");

/* Controllers */
const AuthController = require("./controllers/auth.controller.js");
const UserController = require("./controllers/user.controller.js");
const ReviewController = require("./controllers/review.controller.js");
const BookController = require("./controllers/book.controller.js");

/* Middlewares */
const AuthMiddleware = require("./middlewares/auth.middleware.js");
const PaginationMiddleware = require("./middlewares/pagination.middleware");
const MulterMiddleware = require("./middlewares/multer.middleware");
const errorMiddleware = require("./middlewares/error.middleware.js");

/* Repositories Instances */
const authRepository = new AuthRepository();
const userRepository = new UserRepository();
const reviewRepository = new ReviewRepository();
const bookRepository = new BookRepository();

/* Controllers Instances */
const authController = new AuthController(authRepository);
const userController = new UserController(userRepository, authRepository);
const reviewController = new ReviewController(reviewRepository, authRepository);
const bookController = new BookController(bookRepository, authRepository);

/* Middlewares Instances */
const authMiddleware = new AuthMiddleware(authRepository);
const paginationMiddleware = new PaginationMiddleware();
const multerMiddleware = new MulterMiddleware();

/* --------------------- */
mainRouter.use("/authentication", authRouter(authController, authMiddleware));
mainRouter.use(
  "/user",
  userRouter(userController, authMiddleware, paginationMiddleware)
);
mainRouter.use(
  "/reviews",
  reviewRouter(reviewController, authMiddleware, paginationMiddleware)
);
mainRouter.use(
  "/book",
  bookRouter(
    bookController,
    authMiddleware,
    multerMiddleware,
    paginationMiddleware
  )
);
/* --------------------- */

app.use("/api/v1", mainRouter);
app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
