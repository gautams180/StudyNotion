const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");

//create course ka handler function
exports.createCourse = async (req,res) => {
    try {

        //fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;
     
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ",instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category Details not found",
            });
        }
        console.log(categoryDetails);

        //Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            instructor: instructorDetails._id,                   // isliye instructor details nikala tha
            whatYouWillLearn: whatYouWillLearn,
            price,
            category:categoryDetails._id ,
            thumbnail: thumbnailImage.secure_url,
        });

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {                         //used ot insert it into courses array of instructors
                    courses: newCourse._id,
                }
            },
            {new:true},
        );

        //TODO: HW
        //update the Category ka schema
        await Category.findByIdAndUpdate(
            {_id:Category},
            {
                $push: {
                    course: newCourse._id,
                }
            },
            {new:true},
        )

        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course",
            error: error.message,
        })
    }
};



//get all courses handler function

exports.showAllCourses = async (req,res) => {
    try {
        const allCourses = await Course.find({});
        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot Fetch course data",
            error: error.message,
        })
    }
}

//get course details
exports.getCourseDetails = async (req,res) => {
    try {
        const {courseId} = req.body;

        const courseDetails = await Course.find({_id:courseId})
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails",
                                                        },
                                                    }
                                                )
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate(
                                                    {
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection",
                                                        },
                                                    }
                                                )
                                                .exec();

        //validation
        if(!courseDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            });
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails,
        })
    }   
    catch(error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
