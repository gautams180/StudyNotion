const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res) => {
    try {
        //get course id from req body and user id from payload in req body appended during auth
        const {course_id} = req.body;
        const userId = req.user.id;

        //validation
        //valid courseID
        if(!course_id) {
            return res.status(400).json({
                success:false,
                message:'Please provide valid course ID',
            })
        };

        //valid courseDetail
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course) {
                return res.json({
                    success:false,
                    message:'Could not find the course',
                });
            }

            //user already pay for same course
            const uid = new mongoose.Types.ObjectId.createFromHexString(userId);           //convert userId from string form to ObjectId form
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success:false,
                    message:'Student is already enrolled',
                });
            }

        }
        catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
        
        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{                                    //this is passed to be used after authorization to assign course to student for which we need courseId and userId 
                courseId:course_id,
                userId,
            }
        };

        try {
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            //return response
            return res.status(200).json({
                success:true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail, 
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount:paymentResponse.amount, 
            });

        }catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"Could not initiate order"
            });
        }

        //return response
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while capturing payment"
        })
    }
};

//Verify Signatuer of Razorpay and Server

exports.verifySignature = async (req,res) => {
    try { 
        const webhookSecret = "12345678";           //secret in server

        const signature = req.header["x-razorpay-signature"];          //secret from razorpay in encrypted form

        //3 steps to encrypt webhookSecret
        const shasum = crypto.createHmac("sha256",webhookSecret);            //Hmac object
        shasum.update(JSON.stringify(req.body));                             //convert Hmac object to string
        const digest = shasum.digest("hex");                                 //convert string in hexadecimal format

        if(signature === digest) {
            console.log("Payment is Authorized");

            const {courseId, userId} = req.body.payload.payment.entity.notes

            try {
                //FULFILL THE ACTION

                //find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                                                                    {_id: courseId},
                                                                    {$push:{studentsEnrolled: userId}},
                                                                    {new:true},
                );

                if(!enrolledCourse) {
                    return res.status(500).json({
                        success:false,
                        message:"Course not found",
                    });
                }

                console.log(enrolledCourse);

                //find the student and add course to their list of enrolled courses
                const enrolledStudent = await User.findOneAndUpdate(
                                                                    {_id:userId},
                                                                    {$push:{courses:courseId}},
                                                                    {new:true},
                );

                console.log(enrolledStudent);

                //mail send kro confirmation wala
                const emailResponse = await mailSender(
                                            enrolledStudent.email,
                                            "Congratulations from StudyNotion",
                                            courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName),
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and Course Added"
                });

            }catch(error) {
                console.log(error);
                return res.status(200).json({
                    success:false,
                    message:error.message,
                })
            }


        }
        else {
            return res.status(400).json({
                success:false,
                message:"Invalid request"
            })
        }

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while verifying signature"
        })
    }
};