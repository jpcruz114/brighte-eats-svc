class LeadService {
  constructor(leadRepository) {
    this.leadRepository = leadRepository;
  }

  async createLead(data) {
    return this.leadRepository.create(data);
  }

  async getAllLeads() {
    return this.leadRepository.findAll();
  }

  async getLeadById(id) {
    return this.leadRepository.findById(id);
  }
}

module.exports = LeadService;