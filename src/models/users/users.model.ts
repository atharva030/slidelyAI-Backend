import mongoose from 'mongoose';

const familyMemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  aadharCardNumber: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  fatherName: {
    type: String,
    required: false,
  },
  motherName: {
    type: String,
    required: false,
  },
  // first name + last + father + mother
  occupation: {
    type: String, // enum
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String, // enum
    required: true,
  },
  isMahant: {
    type: Boolean,
    required: true,
  },
  address: {
    // type: String, // by frontend
    // permenant and current adddress
    // street , gao , taluka , district , state , pincode
    type: {
      permaentAddress: {
        type: {
          street: { type: String, required: true },
          gao: { type: String, required: true },
          taluka: { type: String, required: true },
          district: { type: String, required: true },
          state: { type: String, required: true },
          pincode: { type: String, required: true },
        },
        required: true,
      },
      currentAddress: {
        type: {
          street: { type: String, required: true },
          gao: { type: String, required: true },
          taluka: { type: String, required: true },
          district: { type: String, required: true },
          state: { type: String, required: true },
          pincode: { type: String, required: true },
        },
        required: true,
      },
    },
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  mailID: {
    type: String,
    required: true,
  },
  education: {
    type: String, // enum
    required: true,
  },
  homeTown: {
    type: String,
    required: true,
  },
  religion: {
    type: String, // enum
    required: true,
  },
  caste: {
    type: String,
    required: false,
  },
  willingnessforseva: {
    type: String, // enum
    required: true,
  },
  isFamilyHead: {
    type: Boolean, // enum
    required: true,
  },
  relationWithFamilyHead: {
    type: String,
    required: true,
  },
});


export const Users = mongoose.model('Users', familyMemberSchema);