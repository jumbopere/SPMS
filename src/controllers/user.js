import moment from 'moment';
import crypto from 'crypto'
import User from '../models/user';
import { generateToken, userAge,  } from '../utils';
import { sendCreationEmail, sendForgotEmail } from '../utils/sendmail';
import { registerValidator , loginValidator, resetPasswordValidator} from "../utils/userValidate";

// CREATE - POST /api/users
export const register = async (req, res) => {
    try {
      const { firstName, lastName, email, password,dob, nin, phone, gender } = req.body;
      const { errors, isValid } = registerValidator(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
      }

  
      // Create the new user
      const newUser = new User({ lastName, firstName, email, password, dob, nin, phone,gender, age:userAge(dob) });
      const savedUser = await newUser.save()
  //  sendCreationEmail(savedUser.email, savedUser.firstName);


  
      // Create and return the JWT token
      const token = generateToken({ userId: savedUser._id } );
      res.status(201).json({ token });
    } catch (error) {
     console.log(error)
     return res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    const {errors, isValid}= loginValidator(req.body)

    try {
      // Check if the user exists
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const user = await User.findOne({email});
      if (!user) {
   
        return res.status(401).json({ error: 'Failed to authenticate user' });
      }
  
      // Check if the password is correct
  
      if (!user.comparePassword(password)) {
        return res.status(400).send({ error: 'Failed to authenticate user' });
      }
  
      // Create and return the JWT token
      const token = generateToken({ userId: user._id });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
   return res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const getOneUser = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).send({  success: false,error: 'User not found' });
    }
  
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).send({ success: false, error: 'User not found' });
    }
   return res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const updateUser = async (req, res) => {
  try {

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).send({success: false, error: 'User not found' });
    }
    const user = await User.findOne({ _id: req.params.id.toLowerCase() });
    if (!user) {
      return res.status(404).send({ success: false,error: 'User not found' });
    }
    const query = {
      _id: req.params.id,
    };
    const userObj = {
      $set: {
        ...req.body,
      },
    };
    const updatedUser = await User.findOneAndUpdate(query, userObj, {
      new: true,
    }).select('-password');
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {

    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).send({ error: 'User not found' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
    return  res.status(404).send({ error: 'User not found' });
    }
   return res.status(200).json({ success: true,  });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const forgotPassword = async (req, res) => {
  const {email}= req.body
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const expiresTime = moment().add(1, 'hour').calendar()
    // Generate a password reset token and save it to the user's document
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires =   Date.now() + 3600000;  // 1 hour from now
    await user.save();
    const linkHost=  `http://localhost:8080/user/reset-password/${token}`
// sendForgotEmail(user.email, linkHost, expiresTime )
    return res.status(200).json({ message: 'Password reset email sent', linkHost, expiresTime });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export const resetPassword =async (req, res) => {
  const password = req.body.password
  try {
    const { errors, isValid } = resetPasswordValidator(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the user's password and reset the token and expiration date
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};