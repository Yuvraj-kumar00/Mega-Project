import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registration = asyncHandler( async (req, res) => {
    // get data from body
    // validate data
    // find user in database it is already exist or not
    // send message if user already exist in database
    // check for images, check for avatar  
    // send message if avatar is not exist
    // upload on cloudinary
    // send message if avatar not upload on cloudinary
    // create user
    // remove password and refresh token field from response
    // validate user
    // return response

    const { userName, email, password, fullName } = req.body;
    console.log(userName, email, password, fullName);

    if (!userName || !email || !password || !fullName) {
        throw new ApiError(400, "all data is required!!")
    };

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    });
    console.log(existingUser);
    
    if (existingUser) {
        throw new ApiError(400, "user already exist")
    };

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(avatarLocalPath, coverImageLocalPath);
    console.log(req.files);
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required for multer")
    };
   
  
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
   console.log(avatar, coverImage);

    if (!avatar) {
        throw new ApiError(400, "something went wrong while uploading avatar on cloudinary")
    };

    const user = await User.create({
        userName: userName.toLowerCase(), 
        email, 
        password, 
        fullName, 
        avatar: avatar.url, 
        coverImage: coverImage?.url || ""
    });
    console.log(user);
    
    if (!user) {
        throw new ApiError(500, "something went wrong while registering user in database")
    }

    return res.status(201).json(
        new ApiResponse(200, "user registration successfully!!", user)
    )
    
    
} );

export { registration }