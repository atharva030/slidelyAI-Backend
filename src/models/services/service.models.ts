// models/Service.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'

interface IService extends Document {
    service_id: string;
    service_price: number;
    // Add other fields as needed
}

const serviceSchema = new mongoose.Schema({
    service_id: {
        type: String,
        unique: true
    },
    service_price: Number,
    // Add other fields as needed
});

serviceSchema.pre<IService>('save', async function(next) {
    if (!this.service_id) {
        this.service_id = uuidv4(); // Generate UUID if service_id is not provided
    }
    next(); // Proceed to save the document
}); 


const Services = mongoose.model('Service', serviceSchema);

export default Services;
