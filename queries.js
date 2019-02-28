const queries = {
  storeCustomerAccount: `
  DECLARE
    v_customer_account_rec HZ_CUST_ACCOUNT_V2PUB.cust_account_rec_type;
    v_organization_rec HZ_PARTY_V2PUB.organization_rec_type;
    v_person_rec hz_party_v2pub.person_rec_type;
    v_party_rec HZ_PaRTY_V2PUB.party_rec_type;
    v_customer_profile_rec hz_customer_profile_v2pub.customer_profile_rec_type;

  BEGIN
    mo_global.init('AR');
    mo_global.set_org_context ( 81, NULL, 'AR' ) ;
    MO_GLOBAL.SET_POLICY_CONTEXT('S',81);
    fnd_global.apps_initialize(0, 50703, 222);

    --Customer Account API
    v_organization_rec.organization_name := 'Segundo Nombre';
    v_organization_rec.created_by_module := 'TCA_V2_API'; -- DT: FIJO
    
    --Customer Person
    v_person_rec.person_last_name := 'AAAAAA'; -- Apellidos 
    v_person_rec.person_first_name := 'Nombre1'; -- Nombre
    v_person_rec.tax_reference := '123-12-1234'; -- Seguro social sin guiones
    
    v_customer_account_rec.account_number:= 'ACS005'; -- 'RECO456'; -- DT id en acaasys
    v_customer_account_rec.customer_type := 'R'; --External
    v_customer_account_rec.customer_class_code := '006-RECOBROS / PAGARE';  --Default DT lista de valores
    v_customer_account_rec.status := 'A';
    v_customer_account_rec.created_by_module:='TCA_V2_API';
    v_customer_account_rec.application_id := 222; --Receivables
    
    
    v_customer_profile_rec.profile_class_id := 0; --Default Profile Class
    v_customer_profile_rec.status := 'A';
    v_customer_profile_rec.standard_terms := 1022; --select term_id from ra_terms where name like '12 MTH 45%'
    v_customer_profile_rec.send_statements := 'Y';
    v_customer_profile_rec.dunning_letters := 'Y';
    v_customer_profile_rec.account_status := 'ACTIVE';
    v_customer_profile_rec.created_by_module := 'TCA_V2_API';
    
    HZ_CUST_ACCOUNT_V2PUB.create_cust_account (
      p_init_msg_list =>'T',
      p_cust_account_rec => v_customer_account_rec,     -- Customer Account Record
      p_organization_rec => v_organization_rec,         -- Party Organization Record
      p_customer_profile_rec => v_customer_profile_rec, -- Customer Profile Record
      p_create_profile_amt => 'F',
      x_cust_account_id => :customerAccountId,
      x_account_number => :customerAccountNumber,
      x_party_id => :partyId,
      x_party_number => :partyNumber,
      x_profile_id => :profileId,
      x_return_status => :status,
      x_msg_count => :msgCount,
      x_msg_data => :msgData
    );
  END;
  `,

  storeLocation: `
    --Location API
    v_location_rec.country := 'PR';
    v_location_rec.address1 := 'Address Line11';
    v_location_rec.address2 := 'Address Line21';
    v_location_rec.city := 'BAYAMON';
    v_location_rec.state := 'PR';
    v_location_rec.postal_code := '00959';
    v_location_rec.application_id := 222;
    v_location_rec.created_by_module := 'TCA_V2_API';
    
    hz_location_v2pub.create_location (
      P_INIT_MSG_LIST => 'T',
      P_LOCATION_REC => v_location_rec,
      X_LOCATION_ID => v_location_id,
      X_RETURN_STATUS =>v_status,
      X_MSG_COUNT => v_msg_count,
      X_MSG_DATA => v_msg_data
    );
  `,

  storePartySite: `
    --Party Site
    v_party_site_rec.party_id := v_party_id;
    v_party_site_rec.location_id := v_location_id;
    v_party_site_rec.application_id := 222;
    v_party_site_rec.party_site_number := v_party_site_number;
    v_party_site_rec.identifying_address_flag := 'Y';
    v_party_site_rec.created_by_module := 'TCA_V1_API';
    
    hz_party_site_v2pub.create_party_site (
      P_INIT_MSG_LIST => 'T',
      P_PARTY_SITE_REC => v_party_site_rec,
      X_PARTY_SITE_ID => v_party_site_id,
      X_PARTY_SITE_NUMBER => v_party_site_number,
      X_RETURN_STATUS => v_status,
      X_MSG_COUNT => v_msg_count,
      X_MSG_DATA => v_msg_data
    );
  `,

  storeCustAcctSite: `
    --Account Site
    v_cust_acct_site_rec.cust_account_id := v_customer_account_id;
    v_cust_acct_site_rec.party_site_id := v_party_site_id; 
    v_cust_acct_site_rec.application_id := 222;
    v_cust_acct_site_rec.org_id := v_org_id; 
    v_cust_acct_site_rec.created_by_module := 'TCA_V2_API';
    
    hz_cust_account_site_v2pub.create_cust_acct_site (
      P_INIT_MSG_LIST => 'T',
      P_CUST_ACCT_SITE_REC => v_cust_acct_site_rec,
      X_CUST_ACCT_SITE_ID => v_cust_acct_site_id,
      X_RETURN_STATUS => v_status,
      X_MSG_COUNT => v_msg_count,
      X_MSG_DATA => v_msg_data
    );
  `,

  createCustSiteUse: `
    --Site Use (bill to)
    v_customer_site_use_rec.cust_acct_site_id := v_cust_acct_site_id;
    v_customer_site_use_rec.site_use_code := 'BILL_TO';
    v_customer_site_use_rec.created_by_module := 'TCA_V1_API';
   
    hz_cust_account_site_v2pub.create_cust_site_use (
      p_init_msg_list => 'T',
      p_cust_site_use_rec => v_customer_site_use_rec,
      p_customer_profile_rec => v_customer_profile_rec,
      p_create_profile => '',
      p_create_profile_amt => '',
      X_SITE_USE_ID => v_site_use_id,
      X_RETURN_STATUS => v_status,
      X_MSG_COUNT => v_msg_count,
      X_MSG_DATA => v_msg_data
    );
  `,

  storeInvoice: `
  `,

  storeRecipe: `

  `,
};

module.exports = queries;
