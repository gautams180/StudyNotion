const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req,res) => {
    try {
        //data fetch
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:"All fields required"
            });
        }

        //create section
        const newSection = await Section.create({sectionName}); 

        //update course with section Object ID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push: {
                                                    courseContent: newSection._id,
                                                }
                                            },
                                            {new:true},
                                        )
                                        .populate(
                                            {
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                },
                                            }
                                        )
                                        .exec();
        //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourseDetails,
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating section",
            error: error.message,
        });
    }
};

exports.updateSection = async (req,res) => {
    try {

        //data input
        const {sectionName, sectionId} = req.body;
        
        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:"All fields required"
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true}); 

        //return res
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update section, please try again",
            error: error.message,
        });
    }
};

exports.deleteSection = async (req,res) => {
    try {
        //get id - assuming that we are sending ID in params
        const {sectionId} = req.params;

        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId);

        //HW : do we need to delete the entry from courseSchema?

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete section, please try again",
            error: error.message,
        });
    }
};