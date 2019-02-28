/* eslint-disable no-await-in-loop */
require('dotenv').config();

const EBusiness = require('./EBusiness');

const index = async () => {
  // Initialize interface
  const ebusinessInstance = new EBusiness();

  // Get connection
  await ebusinessInstance.connect();

  // Sample data
  const person = {
    account: 'ACS007',
  }

  // Step 1: Register new accounts
  const ebusinessId = await ebusinessInstance.storeAccount(person);

  console.log('ebusinessId', ebusinessId);

  // Close connection
  await ebusinessInstance.disconnect();
};

index().then(() => console.log('END'));
