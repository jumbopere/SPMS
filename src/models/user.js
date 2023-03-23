import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import timestampPlugin from './plugins/timestamp';


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  gender: {
    type: String,
    required: true
},
  nin: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type:Number,
    required:true
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  if (!candidatePassword || !this.password) {
    return false;
  }
  return bcrypt.compareSync(candidatePassword, this.password);
};
userSchema.plugin(timestampPlugin)
const User = mongoose.model('User', userSchema);

export default User;