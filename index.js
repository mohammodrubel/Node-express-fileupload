const express = require('express')
const multer = require('multer')
const path = require('path')
const uploadFolter= "./uploads"
// multar storage 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadFolter)
    },
    filename:(req,file,cb)=>{
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname      
                              .replace(fileExt,"")
                              .toLowerCase()
                              .split(" ")
                              .join("-") + "-" + Date.now()
        cb(null,fileName + fileExt)
                              
    }
})
var upload = multer({
    storage:storage,
    limits:{
        fileSize:1000000,
    },
   fileFilter:(req,file,cb)=>{
        if(file.fieldname === "avator"){
                if(
                    file.mimetype === "image/png" || 
                    file.mimetype === "image/jpg" || 
                    file.mimetype === "image/jpeg" 
                ){
                    cb(null,true)
                }else{
                    cb(new Error ("Only jpg,png,jpeg formad allowed !"))
                }
        }else if(file.fieldname === "doc"){
                if(file.mimetype === "application/pdf"){
                    cb(null , true)
                }else{
                    cb(new Error ("only pdf is allowed, this is not pdf file"))
                }
        }else{
            cb(new Error ("thare are a unnown Error ! , dont worry we will solve it"))
        }


   }
})
const app = express()


// সিঙ্গেল ফাইল আপলোড করার নিয়ম 
// app.post('/',upload.single('avator'),(req,res)=>{
//     res.send('file upload Complete')
// })

// Genarel error 
// app.use((err,req,res,next)=>{
//     if(err){
//         res.status(500).send(err.message)
//     }else{
//         res.send("success")
//     }
// })


//MUlter error 
// app.use((err,req,res,next)=>{
//     if(err){
//         if(err instanceof multer.MulterError){
//             res.status(500).send(err.message)
//         }else{
//             res.status(500).send(err.message)
//         }
//     }else{
//         res.send("success")
//     }
// })


// মাল্টিপল ফাইল আপলোড করার নিয়ম 
// app.post('/',upload.array('avator',3),(req,res)=>{
//     res.send('file upload Complete')
// })

// এভাটারে একটা ফাইল আপলোড হবে এবং গ্যালারী তে দুইটা ফাইল আপলোড করা যাবে 

app.post('/',upload.fields([
    {name:"avator",maxCount:1},
    {name:"doc",maxCount:1}
]),(req,res)=>{
    res.send('file upload Complete')
})

app.listen(3000,()=>{
    console.log('server is running........')
})