const SchoolSchema = require('./Schema.js')
const cloudinary = require('cloudinary') 
const  cloudinaryUse = cloudinary.v2;

exports.AddSchool = async (req, res) => {
  try {
    const{name,email_id,contact_number,city,state,address} = req.body
    const imageFile = req.files.image

    const alreadyExist = await SchoolSchema.findOne({email_id});
    console.log(alreadyExist)
    if(alreadyExist){
      return res.status(409).json({message:"Email Id Already Exists"})
    }
    let imageUrl;
    try{
      const options = {folder:"StackOverflowimage"}
      options.resource_type="auto";
      const imageRes = await cloudinaryUse.uploader.upload(imageFile.tempFilePath,options)
      imageUrl = imageRes.secure_url
      }
      catch(err){
        console.log("Can't Upload image to Cloudinary",err);
      }
    
      const data = await SchoolSchema.create({name,email_id,contact_number,city,state,address,imageUrl})

      return res.status(200).json({
        success:'true',
        data:data,
        message:'Data Added Successfully',
      })
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
}
exports.DeleteSchool = async (req, res) => {
    try {
        const {email_id} = req.body
        const getDetails = await SchoolSchema.findOne({email_id})
        await SchoolSchema.findByIdAndRemove(getDetails._id)
        return res.status(200).json({
            success:'true',
            message:'Data Removed Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }
  exports.GetSchool = async (req, res) => {
    try {
        const data = await SchoolSchema.find({}).sort({ loginAt: -1 });
        return res.status(200).json({
            success:'true',
            data:data,
            message:'Data Fetched Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }
  exports.EditSchool = async (req, res) => {
    try {
        const {name,email_id,contact_number,city,state,address} = req.body
        const getDetails = await SchoolSchema.findOne({email_id})
        if(!getDetails){
          return res.status(409).json({message:"Email Id Doesn't Exists"})
        }
        const data = await SchoolSchema.findByIdAndUpdate(getDetails._id,{name,email_id,contact_number,city,state,address})
        return res.status(200).json({
            success:'true',
            data:data,
            message:'Data Updated Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }