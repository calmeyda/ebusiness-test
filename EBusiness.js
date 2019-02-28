
const oracledb = require('oracledb');

const Oracle = require('./Oracle');
const queries = require('./queries');

class EBusiness {
  async connect() {
    this.oracle = new Oracle();
    await this.oracle.connect({
      user: process.env.ORA_EB_USER,
      password: process.env.ORA_EB_PASSWORD,
      host: process.env.ORA_EB_HOST,
      port: process.env.ORA_EB_PORT,
      db: process.env.ORA_EB_DBNAME,
    });
  }

  disconnect() {
    return this.oracle.disconnect();
  }

  async storeAccount(person) {
    //

    // Store account
    const resAccount = await this.oracle.exec(
      queries.storeCustomerAccount,
      {
        accountNumber: { dir: oracledb.BIND_IN, type: oracledb.DEFAULT, val: person.account },
        customerAccountId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        customerAccountNumber: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        partyId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        partyNumber: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 2000 },
        profileId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        status: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 2000 },
        msgCount: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        msgData: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 2000 },
      },
      { outFormat: oracledb.OBJECT },
    ).catch((err) => {
      console.log('err', err);
    });

    console.log('res', resAccount);

    return resAccount;
  }

  async storeInvoice(data) {
    
  }

  async storeRecipe(data) {
    
  }
}

module.exports = EBusiness;
