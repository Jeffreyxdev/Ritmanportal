import Application from '../models/Application.js';
export const submitApplication = async (req, res) => {
  try {
    const exists = await Application.findOne({ email: req.body.email });
    if (exists) return res.status(400).json({ message: 'Application already exists for this email' });

    const newApp = await Application.create(req.body);
    res.status(201).json({ message: 'Application submitted', application: newApp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: 'Application not found' });
  res.json(app);
};

export const updateApplicationStatus = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: 'Application not found' });

  app.status = req.body.status || app.status;
  await app.save();
  res.json(app);
};

export const deleteApplication = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Application deleted' });
};
