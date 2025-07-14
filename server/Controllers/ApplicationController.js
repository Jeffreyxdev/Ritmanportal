import Application from '../models/Application.js';

export const submitApplication = async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllApplications = async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const app = await Application.findByIdAndUpdate(id, { status }, { new: true });
  res.json(app);
};
