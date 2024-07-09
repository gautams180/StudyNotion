const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req,res) => {
    try {
        //fetch data
        const { title, timeDuration, description, sectionId} = req.body;

        //extract video file
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"All fields required"
            });
        }

        //upload video to cloudinary to get url in response
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: uploadDetails.secure_url,
        });

        //update section with this subsection ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                               {
                                                                    $push: {
                                                                        subSection: subSectionDetails._id,
                                                                    }
                                                               },
                                                               {new:true},  
                                                            )
                                                            .populate("subSection").exec();
                                                        
        //HW: log updated section here, after adding populate query  
        console.log(updatedSection);

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully",
            updatedSection,
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating sub-section",
            error: error.message,
        });
    }
};

//HW: update subSection and delete subSection

exports.updateSubSection = async (req,res) => {
    try {
        //fetch data
        const { title, timeDuration, description, subSectionId} = req.body;

        //extract video
        const video = req.files.videoFile;

        //validation
        if(!subSectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"All fields required"
            });
        };
        
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //update data
        const subSectionDetails = await SubSection.findById(subSectionId);

        subSectionDetails.title = title;
        subSectionDetails.timeDuration = timeDuration;
        subSectionDetails.description = description;
        subSectionDetails.videoUrl = uploadDetails.secure_url;

        await subSectionDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection Updated Successfully",
            subSectionDetails,
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating sub-section",
            error: error.message,
        });
    }
};

exports.deleteSubSection = async (req,res) => {
    try {
        //get id - assuming that we are sending ID in params
        const {subSectionId} = req.params;

        //use findByIdAndDelete
        await SubSection.findByIdAndDelete(subSectionId);

        //TODO: do we need to delete the entry from sectionSchema?

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection Deleted Successfully",
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete sub-section, please try again",
            error: error.message,
        });
    }
};