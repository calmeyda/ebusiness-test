const oracledb = require('oracledb');

class Oracle {
  // Return an oracle connection
  async connect(data) {
    this.connection = await oracledb.getConnection({
      user: data.user,
      password: data.password,
      connectString: `${data.host}:${data.port}/${data.db}`,
    });

    return null;
  }

  // Kill connection
  disconnect() {
    return this.connection.close();
  }

  async query(sql, binds = {}) {
    // console.log('Query: ', sql);
    // console.log('Binds: ', binds);
    // For a complete list of options see the documentation.
    const options = {
      outFormat: oracledb.OBJECT, // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };

    const result = await this.connection.execute(sql, binds, options);

    // console.log("Column metadata: ", result.metaData);
    // console.log("Query results: ");
    // console.log(result.rows);
    return result.rows;
  }

  // Execute store procedure
  exec(q, binds, options = {}) {
    // console.log(q);
    // console.log(binds);
    return this.connection.execute(q, binds, options);
  }
}

module.exports = Oracle;
