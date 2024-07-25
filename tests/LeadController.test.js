const request = require('supertest');
const app = require('../app');
const LeadService = require('../Services/LeadService');

// Mock the LeadService class and its methods
jest.mock('../Services/LeadService');

describe('LeadController', () => {
  let leadService;

  beforeEach(() => {
    // Reset mock implementation before each test
    LeadService.mockClear();
    leadService = new LeadService(); // Create an instance of the mocked LeadService
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
    LeadService.prototype.createLead.mockResolvedValue(leads); // Mock the instance method

    const response = await request(app)
      .post('/api/register')
      .send(leads);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, message: 'Interest recorded successfully', data: { leads } });
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
    LeadService.prototype.getAllLeads.mockResolvedValue(leads); // Mock the instance method

    const response = await request(app).get('/api/leads');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { leads } });
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
    LeadService.prototype.getAllLeads.mockResolvedValue(leads);

    const response = await request(app)
      .get('/api/leads')
      .query(filters);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { leads } });
    expect(LeadService.prototype.getAllLeads).toHaveBeenCalledWith(filters);
  });

  it('should get lead by id', async () => {
    const leads = { 
      id: 1,
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      mobile: '+639951099257', 
      postcode: 3019, 
      services: ['delivery']
    };
    LeadService.prototype.getLeadById.mockResolvedValue(leads); // Mock the instance method

    const response = await request(app).get('/api/leads/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { leads } });
  });

  it('should update an existing lead', async () => {
    const updatedLead = { 
      name: 'Jane Doe', 
      email: 'jane.doe@example.com' 
    };
    const leadId = 1;
  
    // Mock the update method
    LeadService.prototype.updateLead.mockResolvedValue({ ...updatedLead, id: leadId });
  
    const response = await request(app)
      .put(`/api/leads/${leadId}`)
      .send(updatedLead);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true, message: 'Lead updated successfully', data: { leads: { ...updatedLead, id: leadId } } });
    expect(LeadService.prototype.updateLead).toHaveBeenCalledWith(leadId, updatedLead);
  });
});