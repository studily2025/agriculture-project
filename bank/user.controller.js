const { create, getRoomBYId, UpdateRoom, getUserByName, getUserByEmail, updateSessionData,updatePasswordByEmail} = require('./user.service');
const { sign } = require('jsonwebtoken');
const { genSaltSync, hashSync ,compareSync} = require("bcrypt");
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports = {

  // createRoom: catchAsync(async (req, res) => {
  //   console.log("Request body:", req.body);/////////
  //   const body = req.body;
  //   const existing = await getUserByName(body.name);///check duplicate
  //   if (existing) {
  //     return res.status(400).json({
  //       success: 0,
  //       message: "Name or Email already exists",
  //     });
  //   }
  //   const salt = genSaltSync(10);
  //   body.password = hashSync(body.password, salt);
  //   // create session id
  //   // const session_Id = sign({ name: body.name }, "qw123", {
  //   //   expiresIn: "1d",
  //   // });
  //   // body.session_Id = session_Id;
  //   // const results = await create(body);
  //   // return res.json({
  //   //   success: 1,
  //   //   data: results,
  //   //   token: session_Id
  //   // })
  //   const results = await create(body);
  //    // respond without session id
  // return res.json({
  //   success: 1,
  //   data: results,
  // });

  // }),
//   createRoom: catchAsync(async (req, res) => {
//   console.log("Request body:", req.body);
//   const body = req.body;

//   // check for existing user
//   const existing = await getUserByName(body.name);
//   if (existing) {
//     return res.status(400).json({
//       success: 0,
//       message: "Name or Email already exists",
//     });
//   }

//   // hash password
//   const salt = genSaltSync(10);
//   body.password = hashSync(body.password, salt);

//   // call DB insert function
//   const results = await create(body);

//   // respond without session id
//   return res.json({
//     success: 1,
//     data: results,
//   });
// }),
createRoom: catchAsync(async (req, res) => {
  console.log("Request body:", req.body);
  const body = req.body;
  // ✅ Check required fields
  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({
      success: 0,
      message: "Name, Email and Password are required"
    });
  }
  // check for existing user
  const existing = await getUserByName(body.name);
  if (existing) {
    return res.status(400).json({
      success: 0,
      message: "Name or Email already exists",
    });
  }

  // 🔒 check if password is present
  if (!body.password) {
    return res.status(400).json({
      success: 0,
      message: "Password is required"
    });
  }

  // hash password
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  // call DB insert function
  const results = await create(body);

  // respond without session id
  return res.json({
    success: 1,
    data: results,
  });
}),


  getRoomBYroomId: catchAsync(async (req, res) => {

    console.log(result.password);

    const id = req.params.id;
    const results = await getRoomBYId(id);
    return res.status(200).json({
      success: 1,
      data: results
    })

  }),



  UpdateRoomById: catchAsync(async (req, res) => {
    console.log("Incoming payload:", req.body);
    const data = req.body;
    const body = req.body;

    
    const existing = await getUserByName(body.name);
    if (existing) {
      return res.status(400).json({
        success: 0,
        message: "Name or Email already exists",
      });
    }


    const id = req.params.id;
    data.id = id;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt)
    const session_Id = sign({ name: body.name }, "qw123", { expiresIn: "1d" })
    body.session_Id = session_Id;

    const result = await UpdateRoom(data);
    return res.status(200).json({
      success: 1,
      message: "upadte data",
      data: result, body,
      token: session_Id
    })

  }),
  login: catchAsync(async (req, res) => {
    const body = req.body;
    const mail = body.email
    const data= body.data;
    const password = body.password;

    const existing = await getUserByEmail(mail);///check duplicate
    console.log("User from DB:", existing);
    if (!existing) {
      return res.status(400).json({
        success: 0,
        message: "Name or Email already  not exists",
      });

    }
    console.log("Password from body:", password);
    console.log("Password from DB:", existing.password);
    const result = compareSync(password, existing.password);
    if (!result) {
      return res.json({
        success: 0,
        message: "Invalid password"
      });
    }
    existing.password = undefined;

    const jsontoken = sign({ result: existing }, "qw123", {
      expiresIn: '1d'
    });
    


    const update = await updateSessionData(jsontoken,mail)
    if(!update){
      console.log("token save err")
    }
    return res.json({
      success: 1,
      message: 'Login successful',
      token  : jsontoken,
      session_Id : jsontoken
    });
  }),

  forgotPassword: catchAsync( async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: 0,
        message: "Email not found"
      });
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    await updatePasswordByEmail(hashedPassword, email);

    const token = sign({ id: user.id }, process.env.JWT_SECRET || "qw123", {
      expiresIn: "1d"
    });

    return res.status(200).json({
      success: 1,
      message: "Password reset successfully",
      token: token
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({
      success: 0,
      message: "Server error"
    });
  }
})

}

