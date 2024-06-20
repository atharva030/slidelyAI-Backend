import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  github_link: {
    type: String,
    required: false,
  },
  stopwatch_time: {
    type: String,
    required: false,
  },
});


export const Tasks = mongoose.model('Tasks', TaskSchema);