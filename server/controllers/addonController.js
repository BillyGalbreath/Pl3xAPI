import Addon from "../models/addonModel.js";
import mongoose from "mongoose";

export const getAddons = async (req, res) => {
    try {
        //const user_id = req.user._id;
        const addons = await Addon.find({}).sort({createdAt: -1});
        res.status(200).json(addons);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const getAddon = async (req, res) => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such addon"});
        }
        const addon = await Addon.findById(id);
        if (!addon) {
            return res.status(404).json({error: "No such addon"});
        }
        res.status(200).json(addon);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const createAddon = async (req, res) => {
    const {title, load, reps} = req.body;

    let emptyFields = [];
    if (!title) emptyFields.push('title');
    if (!load) emptyFields.push('load');
    if (!reps) emptyFields.push('reps');
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all required fields', emptyFields});
    }

    try {
        const user_id = req.user._id;
        const addon = await Addon.create({title, load, reps, user_id});
        res.status(200).json(addon);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const deleteAddon = async (req, res) => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such addon"});
        }
        const addon = await Addon.findOneAndDelete({_id: id});
        if (!addon) {
            return res.status(404).json({error: "No such addon"});
        }
        res.status(200).json(addon);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const updateAddon = async (req, res) => {
    const {id} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such addon"});
        }
        const addon = await Addon.findOneAndUpdate({_id: id}, {...req.body});
        if (!addon) {
            return res.status(404).json({error: "No such addon"});
        }
        res.status(200).json(addon);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
