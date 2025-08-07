// const dotenv = require('dotenv');
// dotenv.config();
// const morgan = require('morgan');

// const AppError = require('./utils/appError');

// const express = require('express');
// const app = express();
// app.use(morgan("dev"));
// const errorController = require('./utils/errorController');
// app.use(express.json());


// const userRouter = require("./user/user.router");//yha par user.router ko import kiya gya hai sara data
// //sara data useRouter me save kiya gya hai 
// app.use("/api/user",userRouter);

// const bank= require('./bank/user.routs');
// app.use('/',bank)

// /*app.get("/",(req,res)=> {
//     res.json({
//         success:1,
//         massage: 'this rest api is working'
//     })
// });*/

// //ERROR HANDEL
// // app.all('*', (req, res) => {
// //     const err = new Error(`Requested URL ${req.path} not found!`);
// //     res.status(404).json({
// //       success: 0,
// //       message: err.message,
// //       stack: err.stack,
// //     });
// //   })
// app.use((req, res, next) => {
//     const err = new AppError(`Route ${req.originalUrl} not found!`);
//     //err.statusCode = 404;
//     next(err);
//  });

// app.use(errorController);

//   const PORT = process.env.PORT || 6000;
    
// app.listen(process.env.PORT ,() => {
//     // console.log(`server running on  ${process.env.PORT}`);    
//     console.log(`Server running on ${PORT}`);
// }) ;
    
// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors');
// const morgan = require('morgan');
// const AppError = require('./utils/appError');
// const express = require('express');
// const app = express();
// app.use(cors());
// app.use(morgan("dev"));
// const errorController = require('./utils/errorController');
// app.use(express.json());

// // const userRouter = require("./user/user.router");
// // app.use("/api/user", userRouter);


// const bank = require('./bank/user.routs');
// app.use('/', bank);

// app.get("/", (req, res) => {
//   res.json({
//     success: 1,
//     message: "This REST API is working!",
//   });
// });

// app.use((req, res, next) => {
//     const err = new AppError(`Route ${req.originalUrl} not found!`);
//     next(err);
// });

// app.use(errorController);



// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// });
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const errorController = require('./utils/errorController');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: '*', // or use ['http://localhost:5173'] for more control
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev"));  // Log HTTP requests

// ✅ Routes
const bank = require('./bank/user.routs');
app.use('/', bank); // All your signup/login APIs

// ✅ Root route (test)
app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "This REST API is working!",
  });
});

// ✅ 404 for undefined routes
app.use((req, res, next) => {
  const err = new AppError(`Route ${req.originalUrl} not found!`);
  next(err);
});

// ✅ Global error handler
app.use(errorController);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
