const LeadService = require('../Services/LeadService');
const LeadRepository = require('../repositories/LeadRepository');

const leadService = new LeadService(LeadRepository);
const defaultSort = 'createdAt,desc';

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
  const filters = req.query;
  const sort = filters.sort || defaultSort;
  delete filters.sort;

  if (req.query.postcode) {
    filters.postcode = parseInt(req.query.postcode);
  }

  try {
    const leads = await leadService.getAllLeads(filters, sort);
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

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, postcode, services } = req.body;

  if (!name && !email && !mobile && !postcode && !services) {
    return res.status(400).json({ success: false, message: 'At least one field is required to update' });
  }

  try {
    const leads = await leadService.updateLead(parseInt(id), { name, email, mobile, postcode, services });
    if (!leads) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.status(200).json({ success: true, message: 'Lead updated successfully', data: { leads }});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  create,
  index,
  show,
  update
};