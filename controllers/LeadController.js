const LeadService = require('../Services/LeadService');
const LeadRepository = require('../repositories/LeadRepository');

const leadService = new LeadService(LeadRepository);

const create = async (req, res) => {
  const { name, email, mobile, postcode, services } = req.body;
  if (!name || !email || !mobile || !postcode || !services) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const leads = await leadService.createLead({ name, email, mobile, postcode, services });
    res.status(201).json({ success: true, message: 'Interest recorded successfully', data : { leads } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const index = async (req, res)  => {
  try {
    const leads = await leadService.getAllLeads();
    res.status(200).json({ data: { leads } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const show = async (req, res) => {
  try {
    const leads = await leadService.getLeadById(req.params.id);
    if (!leads) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ data: { leads } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  create,
  index,
  show
};