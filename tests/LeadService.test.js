const LeadService = require('../Services/LeadService');
const LeadRepository = require('../repositories/LeadRepository');

jest.mock('../repositories/LeadRepository');

describe('LeadService', () => {
  let leadService;

  beforeEach(() => {
    leadService = new LeadService(LeadRepository); // Ensure the import and usage is correct
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new lead', async () => {
    const leads = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+639951099257',
      postcode: 3019,
      services: ['delivery']
    };
    LeadRepository.create.mockResolvedValue(leads);

    const newLead = await leadService.createLead(leads);

    expect(newLead).toEqual(leads);
    expect(LeadRepository.create).toHaveBeenCalledWith(leads);
  });

  it('should get all leads', async () => {
    const leads = [{
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+639951099257',
      postcode: 3019,
      services: ['delivery']
    }];
    LeadRepository.findAll.mockResolvedValue(leads);

    const result = await leadService.getAllLeads();

    expect(result).toEqual(leads);
    expect(LeadRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should get all leads with filters', async () => {
    const filters = { name: 'John Doe', postcode: 3019 };
    const leads = [{
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+639951099257',
      postcode: 3019,
      services: ['delivery']
    }];
    LeadRepository.findAll.mockResolvedValue(leads);

    const result = await leadService.getAllLeads(filters);

    expect(result).toEqual(leads);
    expect(LeadRepository.findAll).toHaveBeenCalledTimes(1);
    expect(LeadRepository.findAll).toHaveBeenCalledWith(filters);
  });

  it('should get lead by id', async () => {
    const leads = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+639951099257',
      postcode: 3019,
      services: ['delivery']
    };
    LeadRepository.findById.mockResolvedValue(leads);

    const result = await leadService.getLeadById(1);

    expect(result).toEqual(leads);
    expect(LeadRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should update an existing lead', async () => {
    const leadId = 1;
    const updatedData = { name: 'Jane Doe', email: 'jane.doe@example.com' };

    // Mock the update method
    LeadRepository.update = jest.fn().mockResolvedValue({ id: leadId, ...updatedData });

    const result = await leadService.updateLead(leadId, updatedData);

    expect(result).toEqual({ id: leadId, ...updatedData });
    expect(LeadRepository.update).toHaveBeenCalledWith(leadId, updatedData);
  });

  it('should throw an error if no data is provided', async () => {
    const leadId = 1;

    await expect(leadService.updateLead(leadId, {})).rejects.toThrow('No data provided for update');
  });

  it('should handle errors from the repository', async () => {
    const leadId = 1;
    const updatedData = { name: 'Jane Doe' };

    // Mock the update method to throw an error
    LeadRepository.update = jest.fn().mockRejectedValue(new Error('Database error'));

    await expect(leadService.updateLead(leadId, updatedData)).rejects.toThrow('Database error');
  });
});