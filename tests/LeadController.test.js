const request = require('supertest');
const app = require('../app');
const LeadService = require('../Services/LeadService');

jest.mock('../Services/LeadService');

describe('LeadController', () => {
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
    LeadService.createLead.mockResolvedValue(leadData);

    const response = await request(app)
      .post('/api/interest')
      .send(leadData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true, message: 'Interest recorded successfully', data: { leadData } });
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
    LeadService.getAllLeads.mockResolvedValue(leads);

    const response = await request(app).get('/api/leads');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { leads } });
  });

  it('should get lead by id', async () => {
    const lead = { 
        name: 'John Doe', 
        email: 'john.doe@example.com', 
        mobile: '+639951099257', 
        postcode: 3019, 
        services: ['delivery']
    };
    LeadService.getLeadById.mockResolvedValue(lead);

    const response = await request(app).get('/api/leads/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: { lead } });
  });
});