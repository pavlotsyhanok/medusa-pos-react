export default async function createLocation () {
    const location = await stripe.terminal.locations.create({
      display_name: 'HQ',
      address: {
        line1: '3040 Bur Oak Ave',
        city: 'Markham',
        state: 'ON',
        country: 'CA',
        postal_code: 'L6B 0R1',
      }
    });
  
    return location;
};