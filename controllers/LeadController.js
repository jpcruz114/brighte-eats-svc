const leadService = require('../Services/LeadService');

class LeadController {
  async create(req, res) {
    const { name, email, mobile, postcode, services } = req.body;
    if (!name || !email || !mobile || !postcode || !services) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
      const lead = await leadService.createLead({ name, email, mobile, postcode, services });
      res.status(201).json({ success: true, message: 'Interest recorded successfully', data : { lead } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  async index(req, res) {
    try {
      const leads = await leadService.getAllLeads();
      res.status(200).json({ data: { leads } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  async show(req, res) {
    try {
      const lead = await leadService.getLeadById(req.params.id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }
      res.status(200).json({ data: { lead } });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
}

module.exports = new LeadController();