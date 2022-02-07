const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const userRoute = require('./routers/users');
const authRoute = require('./routers/auth');
const postRoute = require('./routers/posts');
const multer = require('multer');
const path = require('path');



const app = express();

//db connection
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("DATABASE CONNECTED");
});


app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "public/images");
       
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
       
    }
    
})



const upload = multer({storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully")
        
    } catch (error) {
        res.status(500).json(error)
    }
})




//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});