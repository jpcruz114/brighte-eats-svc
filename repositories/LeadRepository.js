const { Lead } = require('../models');
const { Op } = require('sequelize');

class LeadRepository {
  async create(leadData) {
    return await Lead.create(leadData);
  }

  async findAll(filters = {}, sort) {
    const whereClause = {};

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          whereClause[key] = {
            [Op.in]: filters[key] // Use Op.in for arrays
          };
        } else {
          whereClause[key] = {
            [Op.eq]: filters[key] // Use Op.eq for single values
          };
        }
      }
    });

    const [sortColumn, sortOrder] = sort.split(',');

    return Lead.findAll({ 
      where: whereClause,
      order: [[sortColumn, sortOrder]]
    });
  }

  async findById(id) {
    return await Lead.findByPk(id);
  }

  async update(id, data) {
    const lead = await this.findById(id);
    if (!lead) {
      return null; // Lead not found
    }
    return lead.update(data);
  }
}

module.exports = new LeadRepository();