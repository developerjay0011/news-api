const NewType = require('../models/newTypeModel');

const createNewType = async (req, res) => {
    const { name, status } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const newtype = await NewType.create({ name, status, image });
        res.status(201).json(newtype);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

const updateNewType = async (req, res) => {
    const { id, name, status } = req.body;
    const fields = {};

    if (name) fields.name = name;
    if (status !== undefined) fields.status = status;
    if (req.file) fields.image = req.file.filename;

    try {
        const existingNewType = await NewType.findById(id);
        if (!existingNewType) {
            return res.status(404).json({ message: 'Type not found' });
        }

        const updatedFields = { ...existingNewType, ...fields };
        await NewType.update(id, updatedFields);
        res.status(200).json(updatedFields);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteNewType = async (req, res) => {
    const { id } = req.params;

    try {
        await NewType.delete(id);
        res.json({ message: 'New Type deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const setNewTypeStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        await NewType.setStatus(id, status);
        res.json({ message: `NewType ${status ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllNewTypes = async (req, res) => {
    try {
        const NewTypes = await NewType.findAll();
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const NewTypesWithFullImageUrl = NewTypes.map(item => ({
            ...item,
            image: item.image ? `${baseUrl}${item.image}` : null
        }));
        res.json(NewTypesWithFullImageUrl);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createNewType, updateNewType, deleteNewType, setNewTypeStatus, getAllNewTypes };
