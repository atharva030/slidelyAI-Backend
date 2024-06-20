import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import { Tasks } from '../../models/users/Tasks.model';
import https from 'https';

export const createUser = async (req: Request, res: Response) => {
    const {
        name,
        email,
        phoneNumber,
        github_link,
        stopwatch_time,
    } = req.body;
    // Create a new family member instance
    const student = new Tasks({
        name,
        email,
        phoneNumber,
        github_link,
        stopwatch_time,
    });

    try {
        // Save the new family member to the database
        await student.save();
        res.status(httpStatusCodes.OK).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};
export const getUser = async (req: Request, res: Response) => {
    try {
        // Save the new family member to the database
        const user = await Tasks.find()
        return res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error);
    }
};
export const deleteEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
console.log(id)
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ message: 'ID parameter missing in request body' });
        }

        // Find the user by ID
        const task = await Tasks.findById(id);
        
        // Check if task/user exists
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Delete the user/task
        const deleted = await Tasks.deleteOne({ _id: id }); // Ensure to use _id for MongoDB
        
        // Check if deletion was successful
        if (deleted.deletedCount > 0) {
            return res.status(200).json({ message: "Deleted successfully" });
        } else {
            return res.status(404).json({ message: "Task not found or could not be deleted" });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

