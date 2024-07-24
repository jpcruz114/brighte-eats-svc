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
    const leadData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+639951099257',
      postcode: 3019,
      services: ['delivery']
    };
    LeadRepository.create.mockResolvedValue(leadData);

    const newLead = await leadService.createLead(leadData);

    expect(newLead).toEqual(leadData);
    expect(LeadRepository.create).toHaveBeenCalledWith(leadData);
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

  it('should get lead by id', async () => {
    const lead = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      mobile: '+639951099257',
      postcode: 3019,
      services: ['delivery']
    };
    LeadRepository.findById.mockResolvedValue(lead);

    const result = await leadService.getLeadById(1);

    expect(result).toEqual(lead);
    expect(LeadRepository.findById).toHaveBeenCalledWith(1);
  });
});