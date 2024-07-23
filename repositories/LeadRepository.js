const { Lead } = require('../models');

class LeadRepository {
  async create(leadData) {
    return await Lead.create(leadData);
  }

  async findAll() {
    return await Lead.findAll();
  }

  async findById(id) {
    return await Lead.findByPk(id);
  }
}

module.exports = new LeadRepository();