const pool = require('../config/database.js')
//const { create, updateSessionData } = require('../user/user.service')
const catchAsync = require('../utils/catchAsync')




module.exports={
    getUserByName :(name)=>{
    return new Promise((resolve,reject)=>{
      pool.query(

            `select * from bank where name = ?`,
            [name],
            (error,results,field)=>{
                if (error){
                   return reject (error);
            }
            return resolve( results[0]||null);

            }
        );
    })
},
create : (data)=>{
    return new Promise((resolve,reject)=>{
     pool.query(
        `insert into bank (id,name,email,password)
       values(?,?,?,?)`,
       [
        data.id,
        data.name,
        data.email,
        data.password
       ],
       (err,result,filds)=>{
        if(err){
            return reject(err);
        }
        return resolve(result)
       }
     )
    })
},
getRoomBYId:(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(
            `select * from room where id=?`,
        [id],
        (err,result,filds)=>{
            if(err){
                return reject(err)
            }return resolve(result)
        }
    )
    })
},        
UpdateRoom:(data)=>{
    return new Promise((resolve,reject)=>{
        pool.query(
            `update room set name=?,email=?,password=? where id=?`,
            [data.name,
            data.email,
            data.password,
            data.id
            ],
           (err,result,filds)=>{
            if(err){
                return reject(err)
            } return resolve(result)
           } 
        )
    })
},
getUserByEmail:(email)=>{
    return new Promise ((resolve,reject)=>{
        pool.query(
            `select * from bank where email=?`,
            [email],
            (err,results)=>{
                if(err){
                    return reject(err)
                }return resolve (results[0]);
            }
        )
    })
},
updateSessionData:(Session_Id,email)=>{
    return new Promise ((resolve,reject)=>{
        pool.query(
            `update bank set Session_Id=? where email=?`,
            [Session_Id,email],
            (err,result)=>{
                if(err){
                    return reject(err)
                } return resolve(result)
            }
        )
    })
},
updatePasswordByEmail: (hashedPassword, email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE bank SET password = ? WHERE email = ?`,
        [hashedPassword, email],
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        }
      );
    });
  }

}