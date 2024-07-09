const Category = require("../models/Category");

exports.createCategory = async (req,res) => {
    try {

        //fetch data
        const {name, description } = req.body;

        //validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }

        //check if category already exists
        const checkCategory = await Category.findOne({name:name});
        if(checkCategory) {
            return res.status(500).json({
                success:false,
                message:"Category already exists",
            })
        }

        //create entry in DB
        const CategorysDetails = await Category.create({
            name:name,
            description:description
        });
        console.log(CategorysDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully"
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}

exports.showAllCategories = async (req, res) => {
    try {
        const allCategorys = await Category.find({}, {name:true, description:true});   //since no criteria, so return all tags, given name and description, are present
        res.status(200).json({
            success:true,
            message:"All category returned successfully",
            allCategorys,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

exports.categoryPageDetails = async (req,res) => {
    try {
        // get category id
        const {categoryId} = req.body;
        // get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
                                                    .populate("courses")
                                                    .exec();
        // validation
        if( !selectedCategory) {
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            })
        }
        // get courses for different categories
        const differentCategories = await Category.find({
                                        _id: {$ne: categoryId},
                                        })
                                        .populate("courses")
                                        .exec();
        // get top 10 selling courses
        //HW - which course sold the most
        
        // return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
            },
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}