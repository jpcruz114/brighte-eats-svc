const leadRepository = require('../repositories/LeadRepository');

class LeadService {
  async createLead(leadData) {
    return await leadRepository.create(leadData);
  }

  async getAllLeads() {
    return await leadRepository.findAll();
  }

  async getLeadById(id) {
    return await leadRepository.findById(id);
  }
}

module.exports = new LeadService();