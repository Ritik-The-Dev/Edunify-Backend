const express = require("express")
const cors = require("cors") 
const dotenv = require("dotenv") 
const connectDB = require("./database.js") 
const {cloudinaryConnect} = require("./cloudinary.js")
const fileUpload = require("express-fileupload")
const router = require("./route.js")

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());


//  fileUploadAllow
app.use(fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use("/api/v1", router);

const PORT = process.env.PORT || 5000;

//connect to cloudinary
cloudinaryConnect();

app.listen(PORT,'0.0.0.0',() => {
  console.log(`server running on port ${PORT}`);
});
app.get("/",(req,res)=>{
  res.send("This is a School API")
})