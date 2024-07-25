class LeadService {
  constructor(leadRepository) {
    this.leadRepository = leadRepository;
  }

  async createLead(data) {
    return this.leadRepository.create(data);
  }

  async getAllLeads(filters = {}) {
    return this.leadRepository.findAll(filters);
  }

  async getLeadById(id) {
    return this.leadRepository.findById(id);
  }

  async updateLead(id, data) {
    // Ensure you have data to update
    if (Object.keys(data).length === 0) {
      throw new Error('No data provided for update');
    }
    return this.leadRepository.update(id, data);
  }
}

module.exports = LeadService;