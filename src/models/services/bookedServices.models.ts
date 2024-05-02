// models/Service.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'
import Services from './service.models';
interface IBookedService extends Document {
    merchantUserId: string;
    merchantTransactionId: string;
    phoneNumber: number;
    service:typeof Services
}

const BookedserviceSchema = new mongoose.Schema({
    merchantUserId: {
        type: String,
        unique: true
    },
    merchantTransactionId: String,
    phoneNumber: Number,
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Services' }, // Reference to Service model
    // Add other fields as needed
});

BookedserviceSchema.pre<IBookedService>('save', async function(next) {
    if (!this.merchantUserId) {
        this.merchantUserId = uuidv4(); // Generate UUID if service_id is not provided
    }
    next(); // Proceed to save the document
});


const BookedService = mongoose.model('BookedService', BookedserviceSchema);

export default BookedService;
