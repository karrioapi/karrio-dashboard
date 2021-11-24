

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_address_templates
// ====================================================

export interface get_address_templates_address_templates_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_address_templates_address_templates_edges_node_address {
  company_name: string | null;
  person_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  postal_code: string | null;
  residential: boolean | null;
  city: string | null;
  state_code: string | null;
  country_code: AddressCountryCode;
  email: string | null;
  phone_number: string | null;
  validation: any | null;
  validate_location: boolean | null;
}

export interface get_address_templates_address_templates_edges_node {
  id: string;  // The ID of the object.
  is_default: boolean;
  label: string;
  address: get_address_templates_address_templates_edges_node_address;
  created_at: any;
  updated_at: any;
}

export interface get_address_templates_address_templates_edges {
  node: get_address_templates_address_templates_edges_node | null;  // The item at the end of the edge
}

export interface get_address_templates_address_templates {
  pageInfo: get_address_templates_address_templates_pageInfo;       // Pagination data for this connection.
  edges: (get_address_templates_address_templates_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_address_templates {
  address_templates: get_address_templates_address_templates | null;
}

export interface get_address_templatesVariables {
  offset?: number | null;
  first?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_customs_info_templates
// ====================================================

export interface get_customs_info_templates_customs_templates_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_customs_info_templates_customs_templates_edges_node_customs_duty_bill_to {
  company_name: string | null;
  person_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  postal_code: string | null;
  residential: boolean | null;
  city: string | null;
  state_code: string | null;
  country_code: AddressCountryCode;
  email: string | null;
  phone_number: string | null;
  validation: any | null;
  validate_location: boolean | null;
}

export interface get_customs_info_templates_customs_templates_edges_node_customs_duty {
  paid_by: string | null;
  currency: string | null;
  account_number: string | null;
  declared_value: number | null;
  bill_to: get_customs_info_templates_customs_templates_edges_node_customs_duty_bill_to | null;
  id: string | null;
}

export interface get_customs_info_templates_customs_templates_edges_node_customs_commodities {
  id: string;
  sku: string | null;
  weight: number | null;
  quantity: number | null;
  weight_unit: CommodityWeightUnit | null;
  description: string | null;
  value_amount: number | null;
  value_currency: CommodityValueCurrency | null;
  origin_country: CommodityOriginCountry | null;
}

export interface get_customs_info_templates_customs_templates_edges_node_customs {
  incoterm: CustomsIncoterm;
  content_type: string | null;
  commercial_invoice: boolean | null;
  content_description: string | null;
  duty: get_customs_info_templates_customs_templates_edges_node_customs_duty | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  certify: boolean | null;
  commodities: (get_customs_info_templates_customs_templates_edges_node_customs_commodities | null)[] | null;
  options: any | null;
}

export interface get_customs_info_templates_customs_templates_edges_node {
  id: string;  // The ID of the object.
  label: string;
  is_default: boolean;
  customs: get_customs_info_templates_customs_templates_edges_node_customs;
}

export interface get_customs_info_templates_customs_templates_edges {
  node: get_customs_info_templates_customs_templates_edges_node | null;  // The item at the end of the edge
}

export interface get_customs_info_templates_customs_templates {
  pageInfo: get_customs_info_templates_customs_templates_pageInfo;       // Pagination data for this connection.
  edges: (get_customs_info_templates_customs_templates_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_customs_info_templates {
  customs_templates: get_customs_info_templates_customs_templates | null;
}

export interface get_customs_info_templatesVariables {
  offset?: number | null;
  first?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_default_templates
// ====================================================

export interface get_default_templates {
  default_templates: any | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_connection
// ====================================================

export interface create_connection_create_connection_errors {
  field: string;
  messages: string[];
}

export interface create_connection_create_connection {
  id: string | null;
  errors: (create_connection_create_connection_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface create_connection {
  create_connection: create_connection_create_connection | null;
}

export interface create_connectionVariables {
  data: CreateConnectionInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_connection
// ====================================================

export interface update_connection_update_connection_errors {
  field: string;
  messages: string[];
}

export interface update_connection_update_connection {
  id: string | null;
  errors: (update_connection_update_connection_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_connection {
  update_connection: update_connection_update_connection | null;
}

export interface update_connectionVariables {
  data: UpdateConnectionInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_organizations
// ====================================================

export interface get_organizations_organizations_user {
  email: string;
  full_name: string;
  is_admin: boolean;
}

export interface get_organizations_organizations_users {
  email: string;
  full_name: string;
  is_admin: boolean;
}

export interface get_organizations_organizations {
  id: string;
  name: string;  // The name of the organization
  slug: string;  // The name in all lowercase, suitable for URL identification
  token: string;
  user: get_organizations_organizations_user;
  users: get_organizations_organizations_users[];
}

export interface get_organizations {
  organizations: (get_organizations_organizations | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_connection
// ====================================================

export interface delete_connection_delete_connection {
  id: string | null;
}

export interface delete_connection {
  delete_connection: delete_connection_delete_connection | null;
}

export interface delete_connectionVariables {
  data: DeleteConnectionInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_organization
// ====================================================

export interface create_organization_create_organization_errors {
  field: string;
  messages: string[];
}

export interface create_organization_create_organization {
  id: string | null;
  errors: (create_organization_create_organization_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface create_organization {
  create_organization: create_organization_create_organization | null;
}

export interface create_organizationVariables {
  data: CreateOrganizationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_organization
// ====================================================

export interface update_organization_update_organization_errors {
  field: string;
  messages: string[];
}

export interface update_organization_update_organization {
  id: string | null;
  errors: (update_organization_update_organization_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_organization {
  update_organization: update_organization_update_organization | null;
}

export interface update_organizationVariables {
  data: UpdateOrganizationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_log
// ====================================================

export interface get_log_log {
  id: string;           // The ID of the object.
  username_persistent: string | null;
  requested_at: any;
  response_ms: number;
  path: string;         // url path
  view: string | null;  // method called by this endpoint
  view_method: string | null;
  remote_addr: string;
  host: string;
  method: string;
  query_params: string | null;
  data: string | null;
  response: string | null;
  errors: string | null;
  status_code: number | null;
}

export interface get_log {
  log: get_log_log | null;
}

export interface get_logVariables {
  id: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_logs
// ====================================================

export interface get_logs_logs_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_logs_logs_edges_node {
  id: string;           // The ID of the object.
  view: string | null;  // method called by this endpoint
  view_method: string | null;
  path: string;         // url path
  data: string | null;
  method: string;
  response_ms: number;
  remote_addr: string;
  requested_at: any;
  username_persistent: string | null;
  status_code: number | null;
  query_params: string | null;
  host: string;
  errors: string | null;
  response: string | null;
}

export interface get_logs_logs_edges {
  node: get_logs_logs_edges_node | null;  // The item at the end of the edge
}

export interface get_logs_logs {
  pageInfo: get_logs_logs_pageInfo;       // Pagination data for this connection.
  edges: (get_logs_logs_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_logs {
  logs: get_logs_logs | null;
}

export interface get_logsVariables {
  offset?: number | null;
  first?: number | null;
  status?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_parcel_templates
// ====================================================

export interface get_parcel_templates_parcel_templates_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_parcel_templates_parcel_templates_edges_node_parcel {
  width: number | null;
  height: number | null;
  length: number | null;
  dimension_unit: ParcelDimensionUnit | null;
  weight: number | null;
  weight_unit: ParcelWeightUnit | null;
  packaging_type: string | null;
  package_preset: string | null;
}

export interface get_parcel_templates_parcel_templates_edges_node {
  id: string;  // The ID of the object.
  is_default: boolean;
  label: string;
  parcel: get_parcel_templates_parcel_templates_edges_node_parcel;
  created_at: any;
  updated_at: any;
}

export interface get_parcel_templates_parcel_templates_edges {
  node: get_parcel_templates_parcel_templates_edges_node | null;  // The item at the end of the edge
}

export interface get_parcel_templates_parcel_templates {
  pageInfo: get_parcel_templates_parcel_templates_pageInfo;       // Pagination data for this connection.
  edges: (get_parcel_templates_parcel_templates_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_parcel_templates {
  parcel_templates: get_parcel_templates_parcel_templates | null;
}

export interface get_parcel_templatesVariables {
  offset?: number | null;
  first?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_system_connections
// ====================================================

export interface get_system_connections_system_connections {
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  test: boolean;
  active: boolean;
  capabilities: string[];
  carrier_name: string;
  enabled: boolean;
}

export interface get_system_connections {
  system_connections: (get_system_connections_system_connections | null)[] | null;
}

export interface get_system_connectionsVariables {
  test?: boolean | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: mutate_system_connection
// ====================================================

export interface mutate_system_connection_mutate_system_connection_carrier {
  id: string;
  active: boolean;
}

export interface mutate_system_connection_mutate_system_connection {
  carrier: mutate_system_connection_mutate_system_connection_carrier | null;
}

export interface mutate_system_connection {
  mutate_system_connection: mutate_system_connection_mutate_system_connection | null;
}

export interface mutate_system_connectionVariables {
  data: SystemCarrierMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_address_template
// ====================================================

export interface create_address_template_create_address_template_template {
  id: string;  // The ID of the object.
}

export interface create_address_template_create_address_template_errors {
  field: string;
  messages: string[];
}

export interface create_address_template_create_address_template {
  template: create_address_template_create_address_template_template | null;
  errors: (create_address_template_create_address_template_errors | null)[] | null;
}

export interface create_address_template {
  create_address_template: create_address_template_create_address_template | null;
}

export interface create_address_templateVariables {
  data: AddressTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_customs_template
// ====================================================

export interface create_customs_template_create_customs_template_template {
  id: string;  // The ID of the object.
}

export interface create_customs_template_create_customs_template_errors {
  field: string;
  messages: string[];
}

export interface create_customs_template_create_customs_template {
  template: create_customs_template_create_customs_template_template | null;
  errors: (create_customs_template_create_customs_template_errors | null)[] | null;
}

export interface create_customs_template {
  create_customs_template: create_customs_template_create_customs_template | null;
}

export interface create_customs_templateVariables {
  data: CustomsTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_parcel_template
// ====================================================

export interface create_parcel_template_create_parcel_template_template {
  id: string;  // The ID of the object.
}

export interface create_parcel_template_create_parcel_template_errors {
  field: string;
  messages: string[];
}

export interface create_parcel_template_create_parcel_template {
  template: create_parcel_template_create_parcel_template_template | null;
  errors: (create_parcel_template_create_parcel_template_errors | null)[] | null;
}

export interface create_parcel_template {
  create_parcel_template: create_parcel_template_create_parcel_template | null;
}

export interface create_parcel_templateVariables {
  data: ParcelTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_address_template
// ====================================================

export interface update_address_template_update_address_template_template {
  id: string;  // The ID of the object.
}

export interface update_address_template_update_address_template_errors {
  field: string;
  messages: string[];
}

export interface update_address_template_update_address_template {
  template: update_address_template_update_address_template_template | null;
  errors: (update_address_template_update_address_template_errors | null)[] | null;
}

export interface update_address_template {
  update_address_template: update_address_template_update_address_template | null;
}

export interface update_address_templateVariables {
  data: PartialAddressTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_customs_template
// ====================================================

export interface update_customs_template_update_customs_template_template {
  id: string;  // The ID of the object.
}

export interface update_customs_template_update_customs_template_errors {
  field: string;
  messages: string[];
}

export interface update_customs_template_update_customs_template {
  template: update_customs_template_update_customs_template_template | null;
  errors: (update_customs_template_update_customs_template_errors | null)[] | null;
}

export interface update_customs_template {
  update_customs_template: update_customs_template_update_customs_template | null;
}

export interface update_customs_templateVariables {
  data: PartialCustomsTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_parcel_template
// ====================================================

export interface update_parcel_template_update_parcel_template_template {
  id: string;  // The ID of the object.
}

export interface update_parcel_template_update_parcel_template_errors {
  field: string;
  messages: string[];
}

export interface update_parcel_template_update_parcel_template {
  template: update_parcel_template_update_parcel_template_template | null;
  errors: (update_parcel_template_update_parcel_template_errors | null)[] | null;
}

export interface update_parcel_template {
  update_parcel_template: update_parcel_template_update_parcel_template | null;
}

export interface update_parcel_templateVariables {
  data: PartialParcelTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_template
// ====================================================

export interface delete_template_delete_template {
  id: string | null;
}

export interface delete_template {
  delete_template: delete_template_delete_template | null;
}

export interface delete_templateVariables {
  data: DeleteTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: discard_commodity
// ====================================================

export interface discard_commodity_discard_commodity {
  id: string | null;
}

export interface discard_commodity {
  discard_commodity: discard_commodity_discard_commodity | null;
}

export interface discard_commodityVariables {
  data: DiscardCommodityInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: mutate_token
// ====================================================

export interface mutate_token_mutate_token_token {
  key: string;
}

export interface mutate_token_mutate_token {
  token: mutate_token_mutate_token_token | null;
}

export interface mutate_token {
  mutate_token: mutate_token_mutate_token | null;
}

export interface mutate_tokenVariables {
  data: TokenMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetToken
// ====================================================

export interface GetToken_token {
  key: string;
  created: any;
}

export interface GetToken {
  token: GetToken_token | null;
}

export interface GetTokenVariables {
  org_id?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_user_connections
// ====================================================

export interface get_user_connections_user_connections_AramexSettings {
  __typename: "AramexSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  account_pin: string;
  account_entity: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_AustraliaPostSettings {
  __typename: "AustraliaPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  api_key: string;
  password: string;
  account_number: string;
}

export interface get_user_connections_user_connections_CanadaPostSettings {
  __typename: "CanadaPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  customer_number: string;
  contract_id: string;
}

export interface get_user_connections_user_connections_CanparSettings {
  __typename: "CanparSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
}

export interface get_user_connections_user_connections_DHLExpressSettings {
  __typename: "DHLExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  site_id: string;
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_DHLPolandSettings_services {
  id: string;  // The ID of the object.
  service_name: string;
  service_code: string;
  description: string | null;
  cost: number | null;
  currency: ServiceLevelCurrency | null;
  estimated_transit_days: number | null;
  max_weight: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  weight_unit: ServiceLevelWeightUnit | null;
  dimension_unit: ServiceLevelDimensionUnit | null;
  domicile: boolean | null;
  international: boolean | null;
}

export interface get_user_connections_user_connections_DHLPolandSettings {
  __typename: "DHLPolandSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  account_number: string;
  services: (get_user_connections_user_connections_DHLPolandSettings_services | null)[] | null;
}

export interface get_user_connections_user_connections_DHLUniversalSettings {
  __typename: "DHLUniversalSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  consumer_key: string;
  consumer_secret: string;
}

export interface get_user_connections_user_connections_DicomSettings {
  __typename: "DicomSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  billing_account: string;
}

export interface get_user_connections_user_connections_EShipperSettings {
  __typename: "EShipperSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
}

export interface get_user_connections_user_connections_FedexSettings {
  __typename: "FedexSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  account_number: string;
  password: string;
  meter_number: string;
  user_key: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_FreightcomSettings {
  __typename: "FreightcomSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
}

export interface get_user_connections_user_connections_PurolatorSettings {
  __typename: "PurolatorSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  account_number: string;
  user_token: string | null;
}

export interface get_user_connections_user_connections_RoyalMailSettings {
  __typename: "RoyalMailSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  client_id: string;
  client_secret: string;
}

export interface get_user_connections_user_connections_SendleSettings {
  __typename: "SendleSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  sendle_id: string;
  api_key: string;
}

export interface get_user_connections_user_connections_SFExpressSettings {
  __typename: "SFExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  partner_id: string;
  check_word: string;
}

export interface get_user_connections_user_connections_TNTSettings {
  __typename: "TNTSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_UPSSettings {
  __typename: "UPSSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_USPSSettings {
  __typename: "USPSSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  mailer_id: string | null;
  customer_registration_id: string | null;
  logistics_manager_mailer_id: string | null;
}

export interface get_user_connections_user_connections_USPSInternationalSettings {
  __typename: "USPSInternationalSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  username: string;
  password: string;
  mailer_id: string | null;
  customer_registration_id: string | null;
  logistics_manager_mailer_id: string | null;
}

export interface get_user_connections_user_connections_YanwenSettings {
  __typename: "YanwenSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  customer_number: string;
  license_key: string;
}

export interface get_user_connections_user_connections_YunExpressSettings {
  __typename: "YunExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test: boolean;
  active: boolean;
  customer_number: string;
  api_secret: string;
}

export type get_user_connections_user_connections = get_user_connections_user_connections_AramexSettings | get_user_connections_user_connections_AustraliaPostSettings | get_user_connections_user_connections_CanadaPostSettings | get_user_connections_user_connections_CanparSettings | get_user_connections_user_connections_DHLExpressSettings | get_user_connections_user_connections_DHLPolandSettings | get_user_connections_user_connections_DHLUniversalSettings | get_user_connections_user_connections_DicomSettings | get_user_connections_user_connections_EShipperSettings | get_user_connections_user_connections_FedexSettings | get_user_connections_user_connections_FreightcomSettings | get_user_connections_user_connections_PurolatorSettings | get_user_connections_user_connections_RoyalMailSettings | get_user_connections_user_connections_SendleSettings | get_user_connections_user_connections_SFExpressSettings | get_user_connections_user_connections_TNTSettings | get_user_connections_user_connections_UPSSettings | get_user_connections_user_connections_USPSSettings | get_user_connections_user_connections_USPSInternationalSettings | get_user_connections_user_connections_YanwenSettings | get_user_connections_user_connections_YunExpressSettings;

export interface get_user_connections {
  user_connections: (get_user_connections_user_connections | null)[] | null;
}

export interface get_user_connectionsVariables {
  test?: boolean | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  email: string;
  full_name: string;
  is_staff: boolean;  // Designates whether the user can log into this admin site.
  last_login: any | null;
  date_joined: any;
}

export interface GetUser {
  user: GetUser_user | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_user
// ====================================================

export interface update_user_update_user_errors {
  field: string;
  messages: string[];
}

export interface update_user_update_user {
  email: string | null;
  full_name: string | null;
  is_staff: boolean | null;                                  // Designates whether the user can log into this admin site.
  last_login: any | null;
  date_joined: any | null;
  errors: (update_user_update_user_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_user {
  update_user: update_user_update_user | null;
}

export interface update_userVariables {
  data: UpdateUserInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: change_password
// ====================================================

export interface change_password_change_password_errors {
  field: string;
  messages: string[];
}

export interface change_password_change_password {
  errors: (change_password_change_password_errors | null)[] | null;
}

export interface change_password {
  change_password: change_password_change_password | null;
}

export interface change_passwordVariables {
  data: ChangePasswordInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: register_user
// ====================================================

export interface register_user_register_user_user {
  email: string;
  is_staff: boolean;  // Designates whether the user can log into this admin site.
  date_joined: any;
}

export interface register_user_register_user_errors {
  field: string;
  messages: string[];
}

export interface register_user_register_user {
  user: register_user_register_user_user | null;
  errors: (register_user_register_user_errors | null)[] | null;
}

export interface register_user {
  register_user: register_user_register_user | null;
}

export interface register_userVariables {
  data: RegisterUserInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirm_email
// ====================================================

export interface confirm_email_confirm_email {
  success: boolean;
}

export interface confirm_email {
  confirm_email: confirm_email_confirm_email | null;
}

export interface confirm_emailVariables {
  data: ConfirmEmailInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: request_password_reset
// ====================================================

export interface request_password_reset_request_password_reset_errors {
  field: string;
  messages: string[];
}

export interface request_password_reset_request_password_reset {
  errors: (request_password_reset_request_password_reset_errors | null)[] | null;
}

export interface request_password_reset {
  request_password_reset: request_password_reset_request_password_reset | null;
}

export interface request_password_resetVariables {
  data: RequestPasswordResetInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirm_password_reset
// ====================================================

export interface confirm_password_reset_confirm_password_reset_errors {
  field: string;
  messages: string[];
}

export interface confirm_password_reset_confirm_password_reset {
  errors: (confirm_password_reset_confirm_password_reset_errors | null)[] | null;
}

export interface confirm_password_reset {
  confirm_password_reset: confirm_password_reset_confirm_password_reset | null;
}

export interface confirm_password_resetVariables {
  data: ConfirmPasswordResetInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_event
// ====================================================

export interface get_event_event {
  id: string;  // The ID of the object.
  type: string;
  data: any | null;
  test_mode: boolean;
  pending_webhooks: number;
  created_at: any;
}

export interface get_event {
  event: get_event_event | null;
}

export interface get_eventVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_events
// ====================================================

export interface get_events_events_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_events_events_edges_node {
  id: string;  // The ID of the object.
  type: string;
  data: any | null;
  test_mode: boolean;
  pending_webhooks: number;
  created_at: any;
}

export interface get_events_events_edges {
  node: get_events_events_edges_node | null;  // The item at the end of the edge
}

export interface get_events_events {
  pageInfo: get_events_events_pageInfo;       // Pagination data for this connection.
  edges: (get_events_events_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_events {
  events: get_events_events | null;
}

export interface get_eventsVariables {
  offset?: number | null;
  first?: number | null;
  type?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// An enumeration.
export enum AddressCountryCode {
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AN = "AN",
  AO = "AO",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  IC = "IC",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IN = "IN",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KV = "KV",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PR = "PR",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SY = "SY",
  SZ = "SZ",
  TC = "TC",
  TD = "TD",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TL = "TL",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WS = "WS",
  XB = "XB",
  XC = "XC",
  XE = "XE",
  XM = "XM",
  XN = "XN",
  XS = "XS",
  XY = "XY",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}

// An enumeration.
export enum CustomsIncoterm {
  CFR = "CFR",
  CIF = "CIF",
  CIP = "CIP",
  CPT = "CPT",
  DAF = "DAF",
  DDP = "DDP",
  DDU = "DDU",
  DEQ = "DEQ",
  DES = "DES",
  EXW = "EXW",
  FAS = "FAS",
  FCA = "FCA",
  FOB = "FOB",
}

// An enumeration.
export enum CommodityWeightUnit {
  KG = "KG",
  LB = "LB",
}

// An enumeration.
export enum CommodityValueCurrency {
  AED = "AED",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUC = "CUC",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  SSP = "SSP",
  STD = "STD",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TND = "TND",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VEF = "VEF",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  ZAR = "ZAR",
}

// An enumeration.
export enum CommodityOriginCountry {
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AN = "AN",
  AO = "AO",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  IC = "IC",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IN = "IN",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KV = "KV",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PR = "PR",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SY = "SY",
  SZ = "SZ",
  TC = "TC",
  TD = "TD",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TL = "TL",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WS = "WS",
  XB = "XB",
  XC = "XC",
  XE = "XE",
  XM = "XM",
  XN = "XN",
  XS = "XS",
  XY = "XY",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}

// An enumeration.
export enum ParcelDimensionUnit {
  CM = "CM",
  IN = "IN",
}

// An enumeration.
export enum ParcelWeightUnit {
  KG = "KG",
  LB = "LB",
}

// An enumeration.
export enum value_currency {
  AED = "AED",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUC = "CUC",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  SSP = "SSP",
  STD = "STD",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TND = "TND",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VEF = "VEF",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  ZAR = "ZAR",
}

// An enumeration.
export enum origin_country {
  AD = "AD",
  AE = "AE",
  AF = "AF",
  AG = "AG",
  AI = "AI",
  AL = "AL",
  AM = "AM",
  AN = "AN",
  AO = "AO",
  AR = "AR",
  AS = "AS",
  AT = "AT",
  AU = "AU",
  AW = "AW",
  AZ = "AZ",
  BA = "BA",
  BB = "BB",
  BD = "BD",
  BE = "BE",
  BF = "BF",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BJ = "BJ",
  BM = "BM",
  BN = "BN",
  BO = "BO",
  BR = "BR",
  BS = "BS",
  BT = "BT",
  BW = "BW",
  BY = "BY",
  BZ = "BZ",
  CA = "CA",
  CD = "CD",
  CF = "CF",
  CG = "CG",
  CH = "CH",
  CI = "CI",
  CK = "CK",
  CL = "CL",
  CM = "CM",
  CN = "CN",
  CO = "CO",
  CR = "CR",
  CU = "CU",
  CV = "CV",
  CY = "CY",
  CZ = "CZ",
  DE = "DE",
  DJ = "DJ",
  DK = "DK",
  DM = "DM",
  DO = "DO",
  DZ = "DZ",
  EC = "EC",
  EE = "EE",
  EG = "EG",
  ER = "ER",
  ES = "ES",
  ET = "ET",
  FI = "FI",
  FJ = "FJ",
  FK = "FK",
  FM = "FM",
  FO = "FO",
  FR = "FR",
  GA = "GA",
  GB = "GB",
  GD = "GD",
  GE = "GE",
  GF = "GF",
  GG = "GG",
  GH = "GH",
  GI = "GI",
  GL = "GL",
  GM = "GM",
  GN = "GN",
  GP = "GP",
  GQ = "GQ",
  GR = "GR",
  GT = "GT",
  GU = "GU",
  GW = "GW",
  GY = "GY",
  HK = "HK",
  HN = "HN",
  HR = "HR",
  HT = "HT",
  HU = "HU",
  IC = "IC",
  ID = "ID",
  IE = "IE",
  IL = "IL",
  IN = "IN",
  IQ = "IQ",
  IR = "IR",
  IS = "IS",
  IT = "IT",
  JE = "JE",
  JM = "JM",
  JO = "JO",
  JP = "JP",
  KE = "KE",
  KG = "KG",
  KH = "KH",
  KI = "KI",
  KM = "KM",
  KN = "KN",
  KP = "KP",
  KR = "KR",
  KV = "KV",
  KW = "KW",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LB = "LB",
  LC = "LC",
  LI = "LI",
  LK = "LK",
  LR = "LR",
  LS = "LS",
  LT = "LT",
  LU = "LU",
  LV = "LV",
  LY = "LY",
  MA = "MA",
  MC = "MC",
  MD = "MD",
  ME = "ME",
  MG = "MG",
  MH = "MH",
  MK = "MK",
  ML = "ML",
  MM = "MM",
  MN = "MN",
  MO = "MO",
  MP = "MP",
  MQ = "MQ",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MU = "MU",
  MV = "MV",
  MW = "MW",
  MX = "MX",
  MY = "MY",
  MZ = "MZ",
  NA = "NA",
  NC = "NC",
  NE = "NE",
  NG = "NG",
  NI = "NI",
  NL = "NL",
  NO = "NO",
  NP = "NP",
  NR = "NR",
  NU = "NU",
  NZ = "NZ",
  OM = "OM",
  PA = "PA",
  PE = "PE",
  PF = "PF",
  PG = "PG",
  PH = "PH",
  PK = "PK",
  PL = "PL",
  PR = "PR",
  PT = "PT",
  PW = "PW",
  PY = "PY",
  QA = "QA",
  RE = "RE",
  RO = "RO",
  RS = "RS",
  RU = "RU",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SC = "SC",
  SD = "SD",
  SE = "SE",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SV = "SV",
  SY = "SY",
  SZ = "SZ",
  TC = "TC",
  TD = "TD",
  TG = "TG",
  TH = "TH",
  TJ = "TJ",
  TL = "TL",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TT = "TT",
  TV = "TV",
  TW = "TW",
  TZ = "TZ",
  UA = "UA",
  UG = "UG",
  US = "US",
  UY = "UY",
  UZ = "UZ",
  VA = "VA",
  VC = "VC",
  VE = "VE",
  VG = "VG",
  VI = "VI",
  VN = "VN",
  VU = "VU",
  WS = "WS",
  XB = "XB",
  XC = "XC",
  XE = "XE",
  XM = "XM",
  XN = "XN",
  XS = "XS",
  XY = "XY",
  YE = "YE",
  YT = "YT",
  ZA = "ZA",
  ZM = "ZM",
  ZW = "ZW",
}

// An enumeration.
export enum paid_by {
  RECIPIENT = "RECIPIENT",
  SENDER = "SENDER",
  THIRD_PARTY = "THIRD_PARTY",
}

// An enumeration.
export enum currency {
  AED = "AED",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUC = "CUC",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  SSP = "SSP",
  STD = "STD",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TND = "TND",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VEF = "VEF",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  ZAR = "ZAR",
}

// An enumeration.
export enum ServiceLevelCurrency {
  AED = "AED",
  AMD = "AMD",
  ANG = "ANG",
  AOA = "AOA",
  ARS = "ARS",
  AUD = "AUD",
  AWG = "AWG",
  AZN = "AZN",
  BAM = "BAM",
  BBD = "BBD",
  BDT = "BDT",
  BGN = "BGN",
  BHD = "BHD",
  BIF = "BIF",
  BMD = "BMD",
  BND = "BND",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BTN = "BTN",
  BWP = "BWP",
  BYN = "BYN",
  BZD = "BZD",
  CAD = "CAD",
  CDF = "CDF",
  CHF = "CHF",
  CLP = "CLP",
  CNY = "CNY",
  COP = "COP",
  CRC = "CRC",
  CUC = "CUC",
  CVE = "CVE",
  CZK = "CZK",
  DJF = "DJF",
  DKK = "DKK",
  DOP = "DOP",
  DZD = "DZD",
  EGP = "EGP",
  ERN = "ERN",
  ETB = "ETB",
  EUR = "EUR",
  FJD = "FJD",
  GBP = "GBP",
  GEL = "GEL",
  GHS = "GHS",
  GMD = "GMD",
  GNF = "GNF",
  GTQ = "GTQ",
  GYD = "GYD",
  HKD = "HKD",
  HNL = "HNL",
  HRK = "HRK",
  HTG = "HTG",
  HUF = "HUF",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  IRR = "IRR",
  ISK = "ISK",
  JMD = "JMD",
  JOD = "JOD",
  JPY = "JPY",
  KES = "KES",
  KGS = "KGS",
  KHR = "KHR",
  KMF = "KMF",
  KPW = "KPW",
  KRW = "KRW",
  KWD = "KWD",
  KYD = "KYD",
  KZT = "KZT",
  LAK = "LAK",
  LKR = "LKR",
  LRD = "LRD",
  LSL = "LSL",
  LYD = "LYD",
  MAD = "MAD",
  MDL = "MDL",
  MGA = "MGA",
  MKD = "MKD",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MRO = "MRO",
  MUR = "MUR",
  MVR = "MVR",
  MWK = "MWK",
  MXN = "MXN",
  MYR = "MYR",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  NIO = "NIO",
  NOK = "NOK",
  NPR = "NPR",
  NZD = "NZD",
  OMR = "OMR",
  PEN = "PEN",
  PGK = "PGK",
  PHP = "PHP",
  PKR = "PKR",
  PLN = "PLN",
  PYG = "PYG",
  QAR = "QAR",
  RSD = "RSD",
  RUB = "RUB",
  RWF = "RWF",
  SAR = "SAR",
  SBD = "SBD",
  SCR = "SCR",
  SDG = "SDG",
  SEK = "SEK",
  SGD = "SGD",
  SHP = "SHP",
  SLL = "SLL",
  SOS = "SOS",
  SRD = "SRD",
  SSP = "SSP",
  STD = "STD",
  SYP = "SYP",
  SZL = "SZL",
  THB = "THB",
  TJS = "TJS",
  TND = "TND",
  TOP = "TOP",
  TRY = "TRY",
  TTD = "TTD",
  TWD = "TWD",
  TZS = "TZS",
  UAH = "UAH",
  USD = "USD",
  UYU = "UYU",
  UZS = "UZS",
  VEF = "VEF",
  VND = "VND",
  VUV = "VUV",
  WST = "WST",
  XAF = "XAF",
  XCD = "XCD",
  XOF = "XOF",
  XPF = "XPF",
  YER = "YER",
  ZAR = "ZAR",
}

// An enumeration.
export enum ServiceLevelWeightUnit {
  KG = "KG",
  LB = "LB",
}

// An enumeration.
export enum ServiceLevelDimensionUnit {
  CM = "CM",
  IN = "IN",
}

// null
export interface CreateConnectionInput {
  id?: string | null;
  aramexsettings?: AramexSettingsInput | null;
  australiapostsettings?: AustraliaPostSettingsInput | null;
  canadapostsettings?: CanadaPostSettingsInput | null;
  canparsettings?: CanparSettingsInput | null;
  dhlexpresssettings?: DHLExpressSettingsInput | null;
  dhlpolandsettings?: DHLPolandSettingsInput | null;
  dhluniversalsettings?: DHLUniversalSettingsInput | null;
  dicomsettings?: DicomSettingsInput | null;
  eshippersettings?: EShipperSettingsInput | null;
  fedexsettings?: FedexSettingsInput | null;
  freightcomsettings?: FreightcomSettingsInput | null;
  purolatorsettings?: PurolatorSettingsInput | null;
  royalmailsettings?: RoyalMailSettingsInput | null;
  sendlesettings?: SendleSettingsInput | null;
  sfexpresssettings?: SFExpressSettingsInput | null;
  tntsettings?: TNTSettingsInput | null;
  upssettings?: UPSSettingsInput | null;
  uspssettings?: USPSSettingsInput | null;
  uspsinternationalsettings?: USPSInternationalSettingsInput | null;
  yanwensettings?: YanwenSettingsInput | null;
  yunexpresssettings?: YunExpressSettingsInput | null;
  clientMutationId?: string | null;
}

// null
export interface AramexSettingsInput {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  account_pin: string;
  account_entity: string;
  account_number: string;
}

// null
export interface AustraliaPostSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  api_key: string;
  password: string;
  account_number: string;
}

// null
export interface CanadaPostSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  customer_number?: string | null;
  contract_id?: string | null;
}

// null
export interface CanparSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
}

// null
export interface DHLExpressSettingsInput {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  site_id: string;
  password: string;
  account_number?: string | null;
}

// null
export interface DHLPolandSettingsInput {
  id?: string | null;
  services?: (ServiceLevelModelSerializerInput | null)[] | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  account_number?: string | null;
}

// null
export interface ServiceLevelModelSerializerInput {
  id?: string | null;
  dimension_unit?: string | null;
  weight_unit?: string | null;
  currency?: string | null;
  service_name: string;
  service_code: string;
  description?: string | null;
  cost?: number | null;
  estimated_transit_days?: number | null;
  max_weight?: number | null;
  max_width?: number | null;
  max_height?: number | null;
  max_length?: number | null;
  domicile?: boolean | null;
  international?: boolean | null;
}

// null
export interface DHLUniversalSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  consumer_key: string;
  consumer_secret: string;
}

// null
export interface DicomSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  billing_account: string;
}

// null
export interface EShipperSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
}

// null
export interface FedexSettingsInput {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  password: string;
  meter_number: string;
  account_number: string;
  user_key?: string | null;
}

// null
export interface FreightcomSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
}

// null
export interface PurolatorSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  account_number: string;
  user_token?: string | null;
}

// null
export interface RoyalMailSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  client_id: string;
  client_secret: string;
}

// null
export interface SendleSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  sendle_id: string;
  api_key: string;
}

// null
export interface SFExpressSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  partner_id: string;
  check_word: string;
}

// null
export interface TNTSettingsInput {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  account_number: string;
}

// null
export interface UPSSettingsInput {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
}

// null
export interface USPSSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface USPSInternationalSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  username: string;
  password: string;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface YanwenSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  customer_number: string;
  license_key: string;
}

// null
export interface YunExpressSettingsInput {
  id?: string | null;
  carrier_id: string;
  test?: boolean | null;
  active?: boolean | null;
  customer_number: string;
  api_secret: string;
}

// null
export interface UpdateConnectionInput {
  id?: string | null;
  aramexsettings?: PartialAramexSettingsInput | null;
  australiapostsettings?: PartialAustraliaPostSettingsInput | null;
  canadapostsettings?: PartialCanadaPostSettingsInput | null;
  canparsettings?: PartialCanparSettingsInput | null;
  dhlexpresssettings?: PartialDHLExpressSettingsInput | null;
  dhlpolandsettings?: PartialDHLPolandSettingsInput | null;
  dhluniversalsettings?: PartialDHLUniversalSettingsInput | null;
  dicomsettings?: PartialDicomSettingsInput | null;
  eshippersettings?: PartialEShipperSettingsInput | null;
  fedexsettings?: PartialFedexSettingsInput | null;
  freightcomsettings?: PartialFreightcomSettingsInput | null;
  purolatorsettings?: PartialPurolatorSettingsInput | null;
  royalmailsettings?: PartialRoyalMailSettingsInput | null;
  sendlesettings?: PartialSendleSettingsInput | null;
  sfexpresssettings?: PartialSFExpressSettingsInput | null;
  tntsettings?: PartialTNTSettingsInput | null;
  upssettings?: PartialUPSSettingsInput | null;
  uspssettings?: PartialUSPSSettingsInput | null;
  uspsinternationalsettings?: PartialUSPSInternationalSettingsInput | null;
  yanwensettings?: PartialYanwenSettingsInput | null;
  yunexpresssettings?: PartialYunExpressSettingsInput | null;
  clientMutationId?: string | null;
}

// null
export interface PartialAramexSettingsInput {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  account_pin?: string | null;
  account_entity?: string | null;
  account_number?: string | null;
}

// null
export interface PartialAustraliaPostSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  api_key?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface PartialCanadaPostSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  customer_number?: string | null;
  contract_id?: string | null;
}

// null
export interface PartialCanparSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
}

// null
export interface PartialDHLExpressSettingsInput {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  site_id?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface PartialDHLPolandSettingsInput {
  id?: string | null;
  services?: (PartialServiceLevelModelSerializerInput | null)[] | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface PartialServiceLevelModelSerializerInput {
  id?: string | null;
  dimension_unit?: string | null;
  weight_unit?: string | null;
  currency?: string | null;
  service_name?: string | null;
  service_code?: string | null;
  description?: string | null;
  cost?: number | null;
  estimated_transit_days?: number | null;
  max_weight?: number | null;
  max_width?: number | null;
  max_height?: number | null;
  max_length?: number | null;
  domicile?: boolean | null;
  international?: boolean | null;
}

// null
export interface PartialDHLUniversalSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  consumer_key?: string | null;
  consumer_secret?: string | null;
}

// null
export interface PartialDicomSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  billing_account?: string | null;
}

// null
export interface PartialEShipperSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
}

// null
export interface PartialFedexSettingsInput {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  password?: string | null;
  meter_number?: string | null;
  account_number?: string | null;
  user_key?: string | null;
}

// null
export interface PartialFreightcomSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
}

// null
export interface PartialPurolatorSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
  user_token?: string | null;
}

// null
export interface PartialRoyalMailSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  client_id?: string | null;
  client_secret?: string | null;
}

// null
export interface PartialSendleSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  sendle_id?: string | null;
  api_key?: string | null;
}

// null
export interface PartialSFExpressSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  partner_id?: string | null;
  check_word?: string | null;
}

// null
export interface PartialTNTSettingsInput {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface PartialUPSSettingsInput {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  access_license_number?: string | null;
  account_number?: string | null;
}

// null
export interface PartialUSPSSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface PartialUSPSInternationalSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  username?: string | null;
  password?: string | null;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface PartialYanwenSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  customer_number?: string | null;
  license_key?: string | null;
}

// null
export interface PartialYunExpressSettingsInput {
  id?: string | null;
  carrier_id?: string | null;
  test?: boolean | null;
  active?: boolean | null;
  customer_number?: string | null;
  api_secret?: string | null;
}

// null
export interface DeleteConnectionInput {
  id: string;
  clientMutationId?: string | null;
}

// null
export interface CreateOrganizationInput {
  id?: string | null;
  name: string;
  slug: string;
  clientMutationId?: string | null;
}

// null
export interface UpdateOrganizationInput {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
  clientMutationId?: string | null;
}

// null
export interface SystemCarrierMutationInput {
  id: string;
  enable: boolean;
  clientMutationId?: string | null;
}

// null
export interface AddressTemplateInput {
  address: AddressTemplate;
  label: string;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface AddressTemplate {
  country_code?: string | null;
  postal_code?: string | null;
  city?: string | null;
  federal_tax_id?: string | null;
  state_tax_id?: string | null;
  person_name?: string | null;
  company_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  state_code?: string | null;
  suburb?: string | null;
  residential?: boolean | null;
  address_line1?: string | null;
  address_line2?: string | null;
  validate_location?: boolean | null;
  validation?: any | null;
}

// null
export interface CustomsTemplateInput {
  customs: CustomsTemplate;
  label: string;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface CustomsTemplate {
  incoterm?: string | null;
  commodities?: (PartialCommodityModelSerializerInput | null)[] | null;
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: string | null;
  content_description?: string | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: DutyInput | null;
  options?: any | null;
}

// null
export interface PartialCommodityModelSerializerInput {
  id?: string | null;
  weight_unit: string;
  weight?: number | null;
  description?: string | null;
  quantity?: number | null;
  sku?: string | null;
  value_amount?: number | null;
  value_currency?: value_currency | null;
  origin_country?: origin_country | null;
}

// null
export interface DutyInput {
  paid_by?: paid_by | null;
  currency?: currency | null;
  declared_value?: number | null;
  account_number?: string | null;
  bill_to?: string | null;
}

// null
export interface ParcelTemplateInput {
  parcel: ParcelTemplate;
  label: string;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface ParcelTemplate {
  weight_unit?: string | null;
  dimension_unit?: string | null;
  weight?: number | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
}

// null
export interface PartialAddressTemplateInput {
  id: string;
  address: PartialAddressTemplate;
  label?: string | null;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface PartialAddressTemplate {
  country_code?: string | null;
  postal_code?: string | null;
  city?: string | null;
  federal_tax_id?: string | null;
  state_tax_id?: string | null;
  person_name?: string | null;
  company_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  state_code?: string | null;
  suburb?: string | null;
  residential?: boolean | null;
  address_line1?: string | null;
  address_line2?: string | null;
  validate_location?: boolean | null;
  validation?: any | null;
}

// null
export interface PartialCustomsTemplateInput {
  id: string;
  customs: PartialCustomsTemplate;
  label?: string | null;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface PartialCustomsTemplate {
  incoterm?: string | null;
  commodities?: (PartialCommodityModelSerializerInput | null)[] | null;
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: string | null;
  content_description?: string | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: DutyInput | null;
  options?: any | null;
}

// null
export interface PartialParcelTemplateInput {
  id: string;
  parcel: PartialParcelTemplate;
  label?: string | null;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface PartialParcelTemplate {
  weight_unit?: string | null;
  dimension_unit?: string | null;
  weight?: number | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
}

// null
export interface DeleteTemplateInput {
  id: string;
  clientMutationId?: string | null;
}

// null
export interface DiscardCommodityInput {
  id: string;
  clientMutationId?: string | null;
}

// null
export interface TokenMutationInput {
  refresh?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface UpdateUserInput {
  email?: string | null;
  full_name?: string | null;
  is_active?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface ChangePasswordInput {
  old_password: string;
  new_password1: string;
  new_password2: string;
  clientMutationId?: string | null;
}

// null
export interface RegisterUserInput {
  email: string;
  full_name?: string | null;
  password1: string;
  password2: string;
  clientMutationId?: string | null;
}

// null
export interface ConfirmEmailInput {
  token: string;
  clientMutationId?: string | null;
}

// null
export interface RequestPasswordResetInput {
  email: string;
  redirect_url: string;
  clientMutationId?: string | null;
}

// null
export interface ConfirmPasswordResetInput {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================