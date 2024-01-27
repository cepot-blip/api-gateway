import express from "express";
import cors from "cors";
import helmet from "helmet";
import media_routes from "./api/routes/Media/media_routes";
import users_routes from "./api/routes/Users/users_routes";
import chapters_routes from "./api/routes/Chapters/ChapterRoutes";
import courses_routes from "./api/routes/Courses/CoursesRoutes";
import image_courses_routes from "./api/routes/Image_courses/ImageCoursesRoutes";
import leassons_routes from "./api/routes/Leassons/LeassonsRoutes";
import mentors_routes from "./api/routes/Mentors/MentorRoutes";
import mycourses_routes from "./api/routes/MyCourses/MyCoursesRoutes";
import reviews_routes from "./api/routes/Reviews/ReviewsRoutes";

export const app = express();

// MIDDLEWARE
app.use((req, res, next) => {
  // WEBSITE YOU WISH TO ALLOW TO CONNECT
  res.setHeader("Access-Control-Allow-Origin", "*");

  // REQUEST METHODS YOU WISH TO ALLOW
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD"
  );

  // REQUEST HEADERS YOU WISH TO ALLOW
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // PASS TO NEXT LAYER OF MIDDLEWARE
  next();
});

app.set("trust proxy", true);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 201,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// app.use(limiter);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api", media_routes);
app.use("/api", users_routes);
app.use("/api", chapters_routes);
app.use("/api", courses_routes);
app.use("/api", image_courses_routes);
app.use("/api", leassons_routes);
app.use("/api", mentors_routes);
app.use("/api", mycourses_routes);
app.use("/api", reviews_routes);


// Handle errors
app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app