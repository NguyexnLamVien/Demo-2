import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';
import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
});
const test = mongoose.model('Test', testSchema, 'Test');

describe('Mongoose connection', () => {

    let connection: typeof mongoose | null = null;

    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGODB_URI!);
        console.log('MongoDB connected');
    });

    afterAll(async () => {
        await mongoose.connection.();
        console.log('MongoDB disconnected');
    });

    it('should connect to MongoDB', () => {
        expect(connection?.connection.readyState).toBe(1);
    });

    it('should save a document to the database', async () => {
        const user = new test({ name: 'John Doe', age: 30, address: '123 Main St' });
        await user.save();

        expect(user.isNew).toBe(false);
    })

    it('should find a document in the database', async () => {
        const user = await test.findOne({ name: 'John Doe' });
        expect(user).toBeDefined();
        expect(user?.name).toBe('John Doe');
    })

});