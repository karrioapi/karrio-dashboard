

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
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_address_templates_address_templates_edges_node {
  id: string;  // The ID of the object.
  is_default: boolean;
  label: string;
  address: get_address_templates_address_templates_edges_node_address;
}

export interface get_address_templates_address_templates_edges {
  node: get_address_templates_address_templates_edges_node | null;  // The item at the end of the edge
}

export interface get_address_templates_address_templates {
  pageInfo: get_address_templates_address_templates_pageInfo;       // Pagination data for this connection.
  edges: (get_address_templates_address_templates_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_address_templates {
  address_templates: get_address_templates_address_templates;
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

export interface get_customs_info_templates_customs_templates_edges_node_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface get_customs_info_templates_customs_templates_edges_node_customs {
  incoterm: IncotermCodeEnum | null;
  content_type: CustomsContentTypeEnum | null;
  commercial_invoice: boolean | null;
  content_description: string | null;
  duty: get_customs_info_templates_customs_templates_edges_node_customs_duty | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  certify: boolean | null;
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
  customs_templates: get_customs_info_templates_customs_templates;
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

export interface get_default_templates_default_templates_default_address_address {
  company_name: string | null;
  person_name: string | null;
  address_line1: string | null;
  address_line2: string | null;
  postal_code: string | null;
  residential: boolean | null;
  city: string | null;
  state_code: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_default_templates_default_templates_default_address {
  id: string;  // The ID of the object.
  is_default: boolean;
  label: string;
  address: get_default_templates_default_templates_default_address_address;
}

export interface get_default_templates_default_templates_default_customs_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface get_default_templates_default_templates_default_customs_customs {
  incoterm: IncotermCodeEnum | null;
  content_type: CustomsContentTypeEnum | null;
  commercial_invoice: boolean | null;
  content_description: string | null;
  duty: get_default_templates_default_templates_default_customs_customs_duty | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  certify: boolean | null;
  options: any | null;
}

export interface get_default_templates_default_templates_default_customs {
  id: string;  // The ID of the object.
  label: string;
  is_default: boolean;
  customs: get_default_templates_default_templates_default_customs_customs;
}

export interface get_default_templates_default_templates_default_parcel_parcel {
  width: number | null;
  height: number | null;
  length: number | null;
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  is_document: boolean | null;
}

export interface get_default_templates_default_templates_default_parcel {
  id: string;  // The ID of the object.
  is_default: boolean;
  label: string;
  parcel: get_default_templates_default_templates_default_parcel_parcel;
}

export interface get_default_templates_default_templates {
  default_address: get_default_templates_default_templates_default_address | null;
  default_customs: get_default_templates_default_templates_default_customs | null;
  default_parcel: get_default_templates_default_templates_default_parcel | null;
}

export interface get_default_templates {
  default_templates: get_default_templates_default_templates;
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
// GraphQL query operation: get_organizations
// ====================================================

export interface get_organizations_organizations_current_user {
  email: string;
  full_name: string;
  is_admin: boolean;
  is_staff: boolean;  // Designates whether the user can log into this admin site.
  is_owner: boolean | null;
  last_login: any | null;
}

export interface get_organizations_organizations_members_invitation {
  id: string;
  guid: any;
  invitee_identifier: string;  // The contact identifier for the invitee, email, phone number, social media handle, etc.
  created: any;
  modified: any;
}

export interface get_organizations_organizations_members {
  email: string;
  full_name: string | null;
  is_admin: boolean;
  is_owner: boolean | null;
  invitation: get_organizations_organizations_members_invitation | null;
  last_login: any | null;
}

export interface get_organizations_organizations {
  id: string;
  name: string;  // The name of the organization
  slug: string;  // The name in all lowercase, suitable for URL identification
  token: string;
  current_user: get_organizations_organizations_current_user;
  members: get_organizations_organizations_members[];
}

export interface get_organizations {
  organizations: (get_organizations_organizations | null)[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_organization
// ====================================================

export interface create_organization_create_organization_organization {
  id: string;
}

export interface create_organization_create_organization_errors {
  field: string;
  messages: string[];
}

export interface create_organization_create_organization {
  organization: create_organization_create_organization_organization | null;
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

export interface update_organization_update_organization_organization {
  id: string;
}

export interface update_organization_update_organization_errors {
  field: string;
  messages: string[];
}

export interface update_organization_update_organization {
  organization: update_organization_update_organization_organization | null;
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
// GraphQL mutation operation: change_organization_owner
// ====================================================

export interface change_organization_owner_change_organization_owner_organization {
  id: string;
}

export interface change_organization_owner_change_organization_owner_errors {
  field: string;
  messages: string[];
}

export interface change_organization_owner_change_organization_owner {
  organization: change_organization_owner_change_organization_owner_organization | null;
  errors: (change_organization_owner_change_organization_owner_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface change_organization_owner {
  change_organization_owner: change_organization_owner_change_organization_owner | null;
}

export interface change_organization_ownerVariables {
  data: ChangeOrganizationOwnerInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: set_organization_user_roles
// ====================================================

export interface set_organization_user_roles_set_organization_user_roles_organization {
  id: string;
}

export interface set_organization_user_roles_set_organization_user_roles_errors {
  field: string;
  messages: string[];
}

export interface set_organization_user_roles_set_organization_user_roles {
  organization: set_organization_user_roles_set_organization_user_roles_organization | null;
  errors: (set_organization_user_roles_set_organization_user_roles_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface set_organization_user_roles {
  set_organization_user_roles: set_organization_user_roles_set_organization_user_roles | null;
}

export interface set_organization_user_rolesVariables {
  data: SetOrganizationUserRolesInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: send_organization_invites
// ====================================================

export interface send_organization_invites_send_organization_invites_errors {
  field: string;
  messages: string[];
}

export interface send_organization_invites_send_organization_invites {
  errors: (send_organization_invites_send_organization_invites_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface send_organization_invites {
  send_organization_invites: send_organization_invites_send_organization_invites | null;
}

export interface send_organization_invitesVariables {
  data: SendOrganizationInvitesInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_organization_invitation
// ====================================================

export interface get_organization_invitation_organization_invitation_invitee {
  email: string;
}

export interface get_organization_invitation_organization_invitation {
  invitee_identifier: string;  // The contact identifier for the invitee, email, phone number, social media handle, etc.
  organization_name: string;
  invitee: get_organization_invitation_organization_invitation_invitee | null;
}

export interface get_organization_invitation {
  organization_invitation: get_organization_invitation_organization_invitation | null;
}

export interface get_organization_invitationVariables {
  guid: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: accept_organization_invitation
// ====================================================

export interface accept_organization_invitation_accept_organization_invitation_organization {
  id: string;
}

export interface accept_organization_invitation_accept_organization_invitation_errors {
  field: string;
  messages: string[];
}

export interface accept_organization_invitation_accept_organization_invitation {
  organization: accept_organization_invitation_accept_organization_invitation_organization | null;
  errors: (accept_organization_invitation_accept_organization_invitation_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface accept_organization_invitation {
  accept_organization_invitation: accept_organization_invitation_accept_organization_invitation | null;
}

export interface accept_organization_invitationVariables {
  data: AcceptOrganizationInvitationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_organization_invitation
// ====================================================

export interface delete_organization_invitation_delete_organization_invitation {
  id: string | null;
}

export interface delete_organization_invitation {
  delete_organization_invitation: delete_organization_invitation_delete_organization_invitation | null;
}

export interface delete_organization_invitationVariables {
  data: DeleteOrganizationInvitationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_log
// ====================================================

export interface get_log_log {
  id: string;    // The ID of the object.
  username_persistent: string | null;
  requested_at: any;
  response_ms: number;
  path: string;  // url path
  remote_addr: string;
  host: string;
  method: string;
  query_params: any | null;
  data: any | null;
  response: any | null;
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
  id: string;    // The ID of the object.
  path: string;  // url path
  data: any | null;
  method: string;
  response_ms: number;
  remote_addr: string;
  requested_at: any;
  username_persistent: string | null;
  status_code: number | null;
  query_params: any | null;
  host: string;
  response: any | null;
}

export interface get_logs_logs_edges {
  node: get_logs_logs_edges_node | null;  // The item at the end of the edge
}

export interface get_logs_logs {
  pageInfo: get_logs_logs_pageInfo;       // Pagination data for this connection.
  edges: (get_logs_logs_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_logs {
  logs: get_logs_logs;
}

export interface get_logsVariables {
  offset?: number | null;
  first?: number | null;
  status?: string | null;
  api_endpoint?: string | null;
  date_after?: any | null;
  date_before?: any | null;
  entity_id?: string | null;
  method?: (string | null)[] | null;
  status_code?: (string | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_shipment
// ====================================================

export interface get_shipment_shipment_created_by {
  email: string;
  full_name: string;
}

export interface get_shipment_shipment_recipient {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_shipment_shipment_shipper {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_shipment_shipment_parcels_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_shipment_shipment_parcels {
  id: string;
  width: number | null;
  height: number | null;
  length: number | null;
  is_document: boolean | null;
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  freight_class: string | null;
  reference_number: string | null;
  items: get_shipment_shipment_parcels_items[];
}

export interface get_shipment_shipment_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface get_shipment_shipment_customs_commodities {
  id: string;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_shipment_shipment_customs {
  id: string;
  certify: boolean | null;
  commercial_invoice: boolean | null;
  content_type: CustomsContentTypeEnum | null;
  content_description: string | null;
  incoterm: IncotermCodeEnum | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  duty: get_shipment_shipment_customs_duty | null;
  options: any | null;
  commodities: get_shipment_shipment_customs_commodities[];
}

export interface get_shipment_shipment_payment {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
}

export interface get_shipment_shipment_selected_rate_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_shipment_shipment_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  duties_and_taxes: number | null;
  extra_charges: get_shipment_shipment_selected_rate_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_shipment_shipment_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_shipment_shipment_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  duties_and_taxes: number | null;
  extra_charges: get_shipment_shipment_rates_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_shipment_shipment_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface get_shipment_shipment {
  id: string;  // The ID of the object.
  carrier_id: string | null;
  carrier_name: string | null;
  created_at: any;
  updated_at: any;
  created_by: get_shipment_shipment_created_by;
  status: ShipmentStatusEnum;
  recipient: get_shipment_shipment_recipient;
  shipper: get_shipment_shipment_shipper;
  parcels: get_shipment_shipment_parcels[];
  label_type: LabelTypeEnum | null;
  tracking_number: string | null;
  shipment_identifier: string | null;
  label_url: string | null;
  invoice_url: string | null;
  tracking_url: string | null;
  tracker_id: string | null;
  test_mode: boolean;
  service: string | null;
  reference: string | null;
  customs: get_shipment_shipment_customs | null;
  payment: get_shipment_shipment_payment | null;
  selected_rate_id: string | null;
  selected_rate: get_shipment_shipment_selected_rate | null;
  carrier_ids: string[];
  rates: get_shipment_shipment_rates[] | null;
  options: any | null;
  metadata: any;
  meta: any | null;
  messages: get_shipment_shipment_messages[];
}

export interface get_shipment {
  shipment: get_shipment_shipment | null;
}

export interface get_shipmentVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_shipments
// ====================================================

export interface get_shipments_shipments_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_shipments_shipments_edges_node_created_by {
  email: string;
  full_name: string;
}

export interface get_shipments_shipments_edges_node_recipient {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_shipments_shipments_edges_node_shipper {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_shipments_shipments_edges_node_parcels_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_shipments_shipments_edges_node_parcels {
  id: string;
  width: number | null;
  height: number | null;
  length: number | null;
  is_document: boolean | null;
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  freight_class: string | null;
  reference_number: string | null;
  items: get_shipments_shipments_edges_node_parcels_items[];
}

export interface get_shipments_shipments_edges_node_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface get_shipments_shipments_edges_node_customs_commodities {
  id: string;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_shipments_shipments_edges_node_customs {
  id: string;
  certify: boolean | null;
  commercial_invoice: boolean | null;
  content_type: CustomsContentTypeEnum | null;
  content_description: string | null;
  incoterm: IncotermCodeEnum | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  duty: get_shipments_shipments_edges_node_customs_duty | null;
  options: any | null;
  commodities: get_shipments_shipments_edges_node_customs_commodities[];
}

export interface get_shipments_shipments_edges_node_payment {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
}

export interface get_shipments_shipments_edges_node_selected_rate_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_shipments_shipments_edges_node_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_shipments_shipments_edges_node_selected_rate_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_shipments_shipments_edges_node_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_shipments_shipments_edges_node_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_shipments_shipments_edges_node_rates_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_shipments_shipments_edges_node_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface get_shipments_shipments_edges_node {
  id: string;  // The ID of the object.
  carrier_id: string | null;
  carrier_name: string | null;
  created_at: any;
  updated_at: any;
  created_by: get_shipments_shipments_edges_node_created_by;
  status: ShipmentStatusEnum;
  recipient: get_shipments_shipments_edges_node_recipient;
  shipper: get_shipments_shipments_edges_node_shipper;
  parcels: get_shipments_shipments_edges_node_parcels[];
  label_type: LabelTypeEnum | null;
  tracking_number: string | null;
  shipment_identifier: string | null;
  label_url: string | null;
  invoice_url: string | null;
  tracking_url: string | null;
  tracker_id: string | null;
  test_mode: boolean;
  service: string | null;
  reference: string | null;
  customs: get_shipments_shipments_edges_node_customs | null;
  payment: get_shipments_shipments_edges_node_payment | null;
  selected_rate_id: string | null;
  selected_rate: get_shipments_shipments_edges_node_selected_rate | null;
  carrier_ids: string[];
  rates: get_shipments_shipments_edges_node_rates[] | null;
  options: any | null;
  metadata: any;
  meta: any | null;
  messages: get_shipments_shipments_edges_node_messages[];
}

export interface get_shipments_shipments_edges {
  node: get_shipments_shipments_edges_node | null;  // The item at the end of the edge
}

export interface get_shipments_shipments {
  pageInfo: get_shipments_shipments_pageInfo;       // Pagination data for this connection.
  edges: (get_shipments_shipments_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_shipments {
  shipments: get_shipments_shipments;
}

export interface get_shipmentsVariables {
  offset?: number | null;
  first?: number | null;
  status?: (string | null)[] | null;
  address?: string | null;
  created_after?: any | null;
  created_before?: any | null;
  carrier_name?: (string | null)[] | null;
  reference?: string | null;
  service?: (string | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: partial_shipment_update
// ====================================================

export interface partial_shipment_update_partial_shipment_update_shipment_created_by {
  email: string;
  full_name: string;
}

export interface partial_shipment_update_partial_shipment_update_shipment_recipient {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_shipper {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_parcels_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_parcels {
  id: string;
  width: number | null;
  height: number | null;
  length: number | null;
  is_document: boolean | null;
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  freight_class: string | null;
  reference_number: string | null;
  items: partial_shipment_update_partial_shipment_update_shipment_parcels_items[];
}

export interface partial_shipment_update_partial_shipment_update_shipment_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_customs_commodities_parent {
  id: string;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_customs_commodities {
  id: string;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
  parent: partial_shipment_update_partial_shipment_update_shipment_customs_commodities_parent | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_customs {
  id: string;
  certify: boolean | null;
  commercial_invoice: boolean | null;
  content_type: CustomsContentTypeEnum | null;
  content_description: string | null;
  incoterm: IncotermCodeEnum | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  duty: partial_shipment_update_partial_shipment_update_shipment_customs_duty | null;
  options: any | null;
  commodities: partial_shipment_update_partial_shipment_update_shipment_customs_commodities[];
}

export interface partial_shipment_update_partial_shipment_update_shipment_payment {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_selected_rate_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: partial_shipment_update_partial_shipment_update_shipment_selected_rate_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: partial_shipment_update_partial_shipment_update_shipment_rates_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment {
  id: string;  // The ID of the object.
  carrier_id: string | null;
  carrier_name: string | null;
  created_by: partial_shipment_update_partial_shipment_update_shipment_created_by;
  status: ShipmentStatusEnum;
  recipient: partial_shipment_update_partial_shipment_update_shipment_recipient;
  shipper: partial_shipment_update_partial_shipment_update_shipment_shipper;
  parcels: partial_shipment_update_partial_shipment_update_shipment_parcels[];
  label_type: LabelTypeEnum | null;
  tracking_number: string | null;
  shipment_identifier: string | null;
  label_url: string | null;
  invoice_url: string | null;
  tracking_url: string | null;
  tracker_id: string | null;
  test_mode: boolean;
  service: string | null;
  reference: string | null;
  customs: partial_shipment_update_partial_shipment_update_shipment_customs | null;
  payment: partial_shipment_update_partial_shipment_update_shipment_payment | null;
  selected_rate_id: string | null;
  selected_rate: partial_shipment_update_partial_shipment_update_shipment_selected_rate | null;
  carrier_ids: string[];
  rates: partial_shipment_update_partial_shipment_update_shipment_rates[] | null;
  options: any | null;
  metadata: any;
  meta: any | null;
  messages: partial_shipment_update_partial_shipment_update_shipment_messages[];
}

export interface partial_shipment_update_partial_shipment_update_errors {
  field: string;
  messages: string[];
}

export interface partial_shipment_update_partial_shipment_update {
  shipment: partial_shipment_update_partial_shipment_update_shipment | null;
  errors: (partial_shipment_update_partial_shipment_update_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface partial_shipment_update {
  partial_shipment_update: partial_shipment_update_partial_shipment_update | null;
}

export interface partial_shipment_updateVariables {
  data: PartialShipmentUpdateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_tracker
// ====================================================

export interface get_tracker_tracker_events {
  description: string | null;
  location: string | null;
  code: string | null;
  date: string | null;
  time: string | null;
}

export interface get_tracker_tracker_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface get_tracker_tracker_created_by {
  email: string;
  full_name: string;
}

export interface get_tracker_tracker_shipment_shipper {
  city: string | null;
  country_code: CountryCodeEnum;
}

export interface get_tracker_tracker_shipment_recipient {
  city: string | null;
  country_code: CountryCodeEnum;
}

export interface get_tracker_tracker_shipment {
  id: string;  // The ID of the object.
  service: string | null;
  shipper: get_tracker_tracker_shipment_shipper;
  recipient: get_tracker_tracker_shipment_recipient;
  meta: any | null;
  reference: string | null;
}

export interface get_tracker_tracker {
  id: string;  // The ID of the object.
  tracking_number: string;
  carrier_id: string;
  carrier_name: string;
  status: TrackerStatusEnum;
  events: get_tracker_tracker_events[] | null;
  delivered: boolean | null;
  estimated_delivery: any | null;
  meta: any | null;
  metadata: any | null;
  messages: get_tracker_tracker_messages[] | null;
  created_at: any;
  updated_at: any;
  created_by: get_tracker_tracker_created_by;
  test_mode: boolean;
  shipment: get_tracker_tracker_shipment | null;
}

export interface get_tracker {
  tracker: get_tracker_tracker | null;
}

export interface get_trackerVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_trackers
// ====================================================

export interface get_trackers_trackers_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_trackers_trackers_edges_node_created_by {
  email: string;
  full_name: string;
}

export interface get_trackers_trackers_edges_node_events {
  description: string | null;
  location: string | null;
  code: string | null;
  date: string | null;
  time: string | null;
}

export interface get_trackers_trackers_edges_node_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface get_trackers_trackers_edges_node_shipment_shipper {
  city: string | null;
  country_code: CountryCodeEnum;
}

export interface get_trackers_trackers_edges_node_shipment_recipient {
  city: string | null;
  country_code: CountryCodeEnum;
}

export interface get_trackers_trackers_edges_node_shipment {
  id: string;  // The ID of the object.
  service: string | null;
  shipper: get_trackers_trackers_edges_node_shipment_shipper;
  recipient: get_trackers_trackers_edges_node_shipment_recipient;
  meta: any | null;
  reference: string | null;
}

export interface get_trackers_trackers_edges_node {
  id: string;  // The ID of the object.
  created_at: any;
  updated_at: any;
  created_by: get_trackers_trackers_edges_node_created_by;
  status: TrackerStatusEnum;
  tracking_number: string;
  events: get_trackers_trackers_edges_node_events[] | null;
  delivered: boolean | null;
  estimated_delivery: any | null;
  test_mode: boolean;
  messages: get_trackers_trackers_edges_node_messages[] | null;
  carrier_id: string;
  carrier_name: string;
  meta: any | null;
  metadata: any | null;
  shipment: get_trackers_trackers_edges_node_shipment | null;
}

export interface get_trackers_trackers_edges {
  node: get_trackers_trackers_edges_node | null;  // The item at the end of the edge
}

export interface get_trackers_trackers {
  pageInfo: get_trackers_trackers_pageInfo;       // Pagination data for this connection.
  edges: (get_trackers_trackers_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_trackers {
  trackers: get_trackers_trackers;
}

export interface get_trackersVariables {
  offset?: number | null;
  first?: number | null;
  status?: (string | null)[] | null;
  created_after?: any | null;
  created_before?: any | null;
  carrier_name?: (string | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_webhook
// ====================================================

export interface get_webhook_webhook_created_by {
  email: string;
  full_name: string;
}

export interface get_webhook_webhook {
  id: string;  // The ID of the object.
  created_by: get_webhook_webhook_created_by;
  enabled_events: (EventTypes | null)[] | null;
  url: string;
  test_mode: boolean;
  disabled: boolean | null;
  description: string | null;
  last_event_at: any | null;
}

export interface get_webhook {
  webhook: get_webhook_webhook | null;
}

export interface get_webhookVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_webhooks
// ====================================================

export interface get_webhooks_webhooks_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_webhooks_webhooks_edges_node_created_by {
  email: string;
  full_name: string;
}

export interface get_webhooks_webhooks_edges_node {
  id: string;  // The ID of the object.
  created_at: any;
  updated_at: any;
  created_by: get_webhooks_webhooks_edges_node_created_by;
  enabled_events: (EventTypes | null)[] | null;
  url: string;
  test_mode: boolean;
  disabled: boolean | null;
  description: string | null;
  last_event_at: any | null;
}

export interface get_webhooks_webhooks_edges {
  node: get_webhooks_webhooks_edges_node | null;  // The item at the end of the edge
}

export interface get_webhooks_webhooks {
  pageInfo: get_webhooks_webhooks_pageInfo;       // Pagination data for this connection.
  edges: (get_webhooks_webhooks_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_webhooks {
  webhooks: get_webhooks_webhooks;
}

export interface get_webhooksVariables {
  offset?: number | null;
  first?: number | null;
  description?: string | null;
  created_after?: any | null;
  created_before?: any | null;
  events?: (string | null)[] | null;
  disabled?: boolean | null;
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
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  is_document: boolean | null;
}

export interface get_parcel_templates_parcel_templates_edges_node {
  id: string;  // The ID of the object.
  is_default: boolean;
  label: string;
  parcel: get_parcel_templates_parcel_templates_edges_node_parcel;
}

export interface get_parcel_templates_parcel_templates_edges {
  node: get_parcel_templates_parcel_templates_edges_node | null;  // The item at the end of the edge
}

export interface get_parcel_templates_parcel_templates {
  pageInfo: get_parcel_templates_parcel_templates_pageInfo;       // Pagination data for this connection.
  edges: (get_parcel_templates_parcel_templates_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_parcel_templates {
  parcel_templates: get_parcel_templates_parcel_templates;
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
  carrier_id: string;      // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  test_mode: boolean;      // Toggle carrier connection mode
  active: boolean;         // Disable/Hide carrier from clients
  capabilities: string[];  // Select the capabilities of the carrier that you want to enable
  carrier_name: string;
  enabled: boolean;
}

export interface get_system_connections {
  system_connections: get_system_connections_system_connections[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: mutate_system_connection
// ====================================================

export interface mutate_system_connection_mutate_system_connection_carrier {
  id: string;
  active: boolean;  // Disable/Hide carrier from clients
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
  errors: (create_address_template_create_address_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface create_address_template {
  create_address_template: create_address_template_create_address_template | null;
}

export interface create_address_templateVariables {
  data: CreateAddressTemplateInput;
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
  errors: (create_customs_template_create_customs_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface create_customs_template {
  create_customs_template: create_customs_template_create_customs_template | null;
}

export interface create_customs_templateVariables {
  data: CreateCustomsTemplateInput;
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
  errors: (create_parcel_template_create_parcel_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface create_parcel_template {
  create_parcel_template: create_parcel_template_create_parcel_template | null;
}

export interface create_parcel_templateVariables {
  data: CreateParcelTemplateInput;
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
  errors: (update_address_template_update_address_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_address_template {
  update_address_template: update_address_template_update_address_template | null;
}

export interface update_address_templateVariables {
  data: UpdateAddressTemplateInput;
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
  errors: (update_customs_template_update_customs_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_customs_template {
  update_customs_template: update_customs_template_update_customs_template | null;
}

export interface update_customs_templateVariables {
  data: UpdateCustomsTemplateInput;
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
  errors: (update_parcel_template_update_parcel_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_parcel_template {
  update_parcel_template: update_parcel_template_update_parcel_template | null;
}

export interface update_parcel_templateVariables {
  data: UpdateParcelTemplateInput;
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
// GraphQL mutation operation: discard_customs
// ====================================================

export interface discard_customs_discard_customs {
  id: string | null;
}

export interface discard_customs {
  discard_customs: discard_customs_discard_customs | null;
}

export interface discard_customsVariables {
  data: DiscardCustomsInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: discard_parcel
// ====================================================

export interface discard_parcel_discard_parcel {
  id: string | null;
}

export interface discard_parcel {
  discard_parcel: discard_parcel_discard_parcel | null;
}

export interface discard_parcelVariables {
  data: DiscardParcelInput;
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

export interface get_user_connections_user_connections_GenericSettings {
  __typename: "GenericSettings";
}

export interface get_user_connections_user_connections_AmazonMwsSettings {
  __typename: "AmazonMwsSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  seller_id: string;
  developer_id: string;
  mws_auth_token: string;
  aws_region: string;
}

export interface get_user_connections_user_connections_AramexSettings {
  __typename: "AramexSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
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
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  api_key: string;
  password: string;
  account_number: string;
}

export interface get_user_connections_user_connections_CanadaPostSettings {
  __typename: "CanadaPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  customer_number: string;
  contract_id: string;
  metadata: any | null;
}

export interface get_user_connections_user_connections_CanparSettings {
  __typename: "CanparSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
}

export interface get_user_connections_user_connections_ChronopostSettings {
  __typename: "ChronopostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_DHLExpressSettings {
  __typename: "DHLExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  site_id: string;
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_user_connections_DHLPolandSettings_services {
  id: string;  // The ID of the object.
  active: boolean | null;
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
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  account_number: string;
  services: get_user_connections_user_connections_DHLPolandSettings_services[] | null;
}

export interface get_user_connections_user_connections_DHLUniversalSettings {
  __typename: "DHLUniversalSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  consumer_key: string;
  consumer_secret: string;
}

export interface get_user_connections_user_connections_DicomSettings {
  __typename: "DicomSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  billing_account: string;
}

export interface get_user_connections_user_connections_DPDHLSettings {
  __typename: "DPDHLSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  app_id: string;
  username: string;
  password: string;
  signature: string;
  account_number: string;
}

export interface get_user_connections_user_connections_EShipperSettings {
  __typename: "EShipperSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
}

export interface get_user_connections_user_connections_EasyPostSettings {
  __typename: "EasyPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  api_key: string;
  metadata: any | null;
}

export interface get_user_connections_user_connections_FedexSettings {
  __typename: "FedexSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  account_number: string;
  password: string;
  meter_number: string;
  user_key: string;
  account_country_code: string;
  metadata: any | null;
}

export interface get_user_connections_user_connections_FreightcomSettings {
  __typename: "FreightcomSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
}

export interface get_user_connections_user_connections_PurolatorSettings {
  __typename: "PurolatorSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  account_number: string;
  user_token: string | null;
  metadata: any | null;
}

export interface get_user_connections_user_connections_RoyalMailSettings {
  __typename: "RoyalMailSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  client_id: string;
  client_secret: string;
}

export interface get_user_connections_user_connections_SendleSettings {
  __typename: "SendleSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  sendle_id: string;
  api_key: string;
}

export interface get_user_connections_user_connections_SFExpressSettings {
  __typename: "SFExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  partner_id: string;
  check_word: string;
}

export interface get_user_connections_user_connections_TNTSettings {
  __typename: "TNTSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
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
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  account_country_code: string;
  metadata: any | null;
}

export interface get_user_connections_user_connections_UPSFreightSettings {
  __typename: "UPSFreightSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  account_country_code: string;
  metadata: any | null;
}

export interface get_user_connections_user_connections_USPSSettings {
  __typename: "USPSSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
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
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
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
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  customer_number: string;
  license_key: string;
}

export interface get_user_connections_user_connections_YunExpressSettings {
  __typename: "YunExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  customer_number: string;
  api_secret: string;
}

export type get_user_connections_user_connections = get_user_connections_user_connections_GenericSettings | get_user_connections_user_connections_AmazonMwsSettings | get_user_connections_user_connections_AramexSettings | get_user_connections_user_connections_AustraliaPostSettings | get_user_connections_user_connections_CanadaPostSettings | get_user_connections_user_connections_CanparSettings | get_user_connections_user_connections_ChronopostSettings | get_user_connections_user_connections_DHLExpressSettings | get_user_connections_user_connections_DHLPolandSettings | get_user_connections_user_connections_DHLUniversalSettings | get_user_connections_user_connections_DicomSettings | get_user_connections_user_connections_DPDHLSettings | get_user_connections_user_connections_EShipperSettings | get_user_connections_user_connections_EasyPostSettings | get_user_connections_user_connections_FedexSettings | get_user_connections_user_connections_FreightcomSettings | get_user_connections_user_connections_PurolatorSettings | get_user_connections_user_connections_RoyalMailSettings | get_user_connections_user_connections_SendleSettings | get_user_connections_user_connections_SFExpressSettings | get_user_connections_user_connections_TNTSettings | get_user_connections_user_connections_UPSSettings | get_user_connections_user_connections_UPSFreightSettings | get_user_connections_user_connections_USPSSettings | get_user_connections_user_connections_USPSInternationalSettings | get_user_connections_user_connections_YanwenSettings | get_user_connections_user_connections_YunExpressSettings;

export interface get_user_connections {
  user_connections: get_user_connections_user_connections[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_user_connections_with_generics
// ====================================================

export interface get_user_connections_with_generics_user_connections_AmazonMwsSettings {
  __typename: "AmazonMwsSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  seller_id: string;
  developer_id: string;
  mws_auth_token: string;
  aws_region: string;
}

export interface get_user_connections_with_generics_user_connections_AramexSettings {
  __typename: "AramexSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  account_pin: string;
  account_entity: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_with_generics_user_connections_AustraliaPostSettings {
  __typename: "AustraliaPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  api_key: string;
  password: string;
  account_number: string;
}

export interface get_user_connections_with_generics_user_connections_CanadaPostSettings {
  __typename: "CanadaPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  customer_number: string;
  contract_id: string;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_CanparSettings {
  __typename: "CanparSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
}

export interface get_user_connections_with_generics_user_connections_ChronopostSettings {
  __typename: "ChronopostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_with_generics_user_connections_DHLExpressSettings {
  __typename: "DHLExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  site_id: string;
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_with_generics_user_connections_DHLPolandSettings_services {
  id: string;  // The ID of the object.
  active: boolean | null;
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

export interface get_user_connections_with_generics_user_connections_DHLPolandSettings {
  __typename: "DHLPolandSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  account_number: string;
  services: get_user_connections_with_generics_user_connections_DHLPolandSettings_services[] | null;
}

export interface get_user_connections_with_generics_user_connections_DHLUniversalSettings {
  __typename: "DHLUniversalSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  consumer_key: string;
  consumer_secret: string;
}

export interface get_user_connections_with_generics_user_connections_DicomSettings {
  __typename: "DicomSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  billing_account: string;
}

export interface get_user_connections_with_generics_user_connections_DPDHLSettings {
  __typename: "DPDHLSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  app_id: string;
  username: string;
  password: string;
  signature: string;
  account_number: string;
}

export interface get_user_connections_with_generics_user_connections_EShipperSettings {
  __typename: "EShipperSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
}

export interface get_user_connections_with_generics_user_connections_EasyPostSettings {
  __typename: "EasyPostSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  api_key: string;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_FedexSettings {
  __typename: "FedexSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  account_number: string;
  password: string;
  meter_number: string;
  user_key: string;
  account_country_code: string;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_FreightcomSettings {
  __typename: "FreightcomSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
}

export interface get_user_connections_with_generics_user_connections_GenericSettings_services {
  id: string;  // The ID of the object.
  active: boolean | null;
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

export interface get_user_connections_with_generics_user_connections_GenericSettings_label_template {
  id: string;  // The ID of the object.
  slug: string;
  template: string;
  template_type: LabelTemplateTypeEnum | null;
  shipment_sample: any | null;
  width: number | null;
  height: number | null;
}

export interface get_user_connections_with_generics_user_connections_GenericSettings {
  __typename: "GenericSettings";
  id: string;
  carrier_id: string;           // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  display_name: string;         // Carrier display name
  custom_carrier_name: string;  // Unique carrier slug, lowercase alphanumeric characters and underscores only
  account_number: string;
  test_mode: boolean;           // Toggle carrier connection mode
  active: boolean;              // Disable/Hide carrier from clients
  account_country_code: string;
  services: get_user_connections_with_generics_user_connections_GenericSettings_services[] | null;
  label_template: get_user_connections_with_generics_user_connections_GenericSettings_label_template | null;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_PurolatorSettings {
  __typename: "PurolatorSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  account_number: string;
  user_token: string | null;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_RoyalMailSettings {
  __typename: "RoyalMailSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  client_id: string;
  client_secret: string;
}

export interface get_user_connections_with_generics_user_connections_SendleSettings {
  __typename: "SendleSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  sendle_id: string;
  api_key: string;
}

export interface get_user_connections_with_generics_user_connections_SFExpressSettings {
  __typename: "SFExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  partner_id: string;
  check_word: string;
}

export interface get_user_connections_with_generics_user_connections_TNTSettings {
  __typename: "TNTSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  account_number: string;
  account_country_code: string;
}

export interface get_user_connections_with_generics_user_connections_UPSSettings {
  __typename: "UPSSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  account_country_code: string;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_UPSFreightSettings {
  __typename: "UPSFreightSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  account_country_code: string;
  metadata: any | null;
}

export interface get_user_connections_with_generics_user_connections_USPSSettings {
  __typename: "USPSSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  mailer_id: string | null;
  customer_registration_id: string | null;
  logistics_manager_mailer_id: string | null;
}

export interface get_user_connections_with_generics_user_connections_USPSInternationalSettings {
  __typename: "USPSInternationalSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  username: string;
  password: string;
  mailer_id: string | null;
  customer_registration_id: string | null;
  logistics_manager_mailer_id: string | null;
}

export interface get_user_connections_with_generics_user_connections_YanwenSettings {
  __typename: "YanwenSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  customer_number: string;
  license_key: string;
}

export interface get_user_connections_with_generics_user_connections_YunExpressSettings {
  __typename: "YunExpressSettings";
  id: string;
  carrier_id: string;  // eg. canadapost, dhl_express, fedex, purolator_courrier, ups...
  carrier_name: string;
  test_mode: boolean;  // Toggle carrier connection mode
  active: boolean;     // Disable/Hide carrier from clients
  customer_number: string;
  api_secret: string;
}

export type get_user_connections_with_generics_user_connections = get_user_connections_with_generics_user_connections_AmazonMwsSettings | get_user_connections_with_generics_user_connections_AramexSettings | get_user_connections_with_generics_user_connections_AustraliaPostSettings | get_user_connections_with_generics_user_connections_CanadaPostSettings | get_user_connections_with_generics_user_connections_CanparSettings | get_user_connections_with_generics_user_connections_ChronopostSettings | get_user_connections_with_generics_user_connections_DHLExpressSettings | get_user_connections_with_generics_user_connections_DHLPolandSettings | get_user_connections_with_generics_user_connections_DHLUniversalSettings | get_user_connections_with_generics_user_connections_DicomSettings | get_user_connections_with_generics_user_connections_DPDHLSettings | get_user_connections_with_generics_user_connections_EShipperSettings | get_user_connections_with_generics_user_connections_EasyPostSettings | get_user_connections_with_generics_user_connections_FedexSettings | get_user_connections_with_generics_user_connections_FreightcomSettings | get_user_connections_with_generics_user_connections_GenericSettings | get_user_connections_with_generics_user_connections_PurolatorSettings | get_user_connections_with_generics_user_connections_RoyalMailSettings | get_user_connections_with_generics_user_connections_SendleSettings | get_user_connections_with_generics_user_connections_SFExpressSettings | get_user_connections_with_generics_user_connections_TNTSettings | get_user_connections_with_generics_user_connections_UPSSettings | get_user_connections_with_generics_user_connections_UPSFreightSettings | get_user_connections_with_generics_user_connections_USPSSettings | get_user_connections_with_generics_user_connections_USPSInternationalSettings | get_user_connections_with_generics_user_connections_YanwenSettings | get_user_connections_with_generics_user_connections_YunExpressSettings;

export interface get_user_connections_with_generics {
  user_connections: get_user_connections_with_generics_user_connections[];
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

export interface update_user_update_user_user {
  full_name: string;
  is_staff: boolean;  // Designates whether the user can log into this admin site.
  last_login: any | null;
  date_joined: any;
}

export interface update_user_update_user_errors {
  field: string;
  messages: string[];
}

export interface update_user_update_user {
  user: update_user_update_user_user | null;
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
// GraphQL mutation operation: request_email_change
// ====================================================

export interface request_email_change_request_email_change_errors {
  field: string;
  messages: string[];
}

export interface request_email_change_request_email_change {
  errors: (request_email_change_request_email_change_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface request_email_change {
  request_email_change: request_email_change_request_email_change | null;
}

export interface request_email_changeVariables {
  data: RequestEmailChangeInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirm_email_change
// ====================================================

export interface confirm_email_change_confirm_email_change_user {
  email: string;
}

export interface confirm_email_change_confirm_email_change_errors {
  field: string;
  messages: string[];
}

export interface confirm_email_change_confirm_email_change {
  user: confirm_email_change_confirm_email_change_user | null;
  errors: (confirm_email_change_confirm_email_change_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface confirm_email_change {
  confirm_email_change: confirm_email_change_confirm_email_change | null;
}

export interface confirm_email_changeVariables {
  data: ConfirmEmailChangeInput;
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
  type: EventTypes | null;
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
  type: EventTypes | null;
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
  events: get_events_events;
}

export interface get_eventsVariables {
  offset?: number | null;
  first?: number | null;
  entity_id?: string | null;
  type?: (string | null)[] | null;
  date_after?: any | null;
  date_before?: any | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_order
// ====================================================

export interface get_order_order_shipping_to {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_order_order_shipping_from {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_order_order_billing_address {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_order_order_line_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  unfulfilled_quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_order_order_created_by {
  email: string;
  full_name: string;
}

export interface get_order_order_shipments_created_by {
  email: string;
  full_name: string;
}

export interface get_order_order_shipments_recipient {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_order_order_shipments_shipper {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_order_order_shipments_parcels_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_order_order_shipments_parcels {
  id: string;
  width: number | null;
  height: number | null;
  length: number | null;
  is_document: boolean | null;
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  freight_class: string | null;
  reference_number: string | null;
  items: get_order_order_shipments_parcels_items[];
}

export interface get_order_order_shipments_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface get_order_order_shipments_customs_commodities {
  id: string;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_order_order_shipments_customs {
  id: string;
  certify: boolean | null;
  commercial_invoice: boolean | null;
  content_type: CustomsContentTypeEnum | null;
  content_description: string | null;
  incoterm: IncotermCodeEnum | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  duty: get_order_order_shipments_customs_duty | null;
  options: any | null;
  commodities: get_order_order_shipments_customs_commodities[];
}

export interface get_order_order_shipments_payment {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
}

export interface get_order_order_shipments_selected_rate_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_order_order_shipments_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_order_order_shipments_selected_rate_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_order_order_shipments_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_order_order_shipments_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_order_order_shipments_rates_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_order_order_shipments_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface get_order_order_shipments {
  id: string;  // The ID of the object.
  carrier_id: string | null;
  carrier_name: string | null;
  created_at: any;
  updated_at: any;
  created_by: get_order_order_shipments_created_by;
  status: ShipmentStatusEnum;
  recipient: get_order_order_shipments_recipient;
  shipper: get_order_order_shipments_shipper;
  parcels: get_order_order_shipments_parcels[];
  label_type: LabelTypeEnum | null;
  tracking_number: string | null;
  shipment_identifier: string | null;
  label_url: string | null;
  invoice_url: string | null;
  tracking_url: string | null;
  test_mode: boolean;
  service: string | null;
  reference: string | null;
  customs: get_order_order_shipments_customs | null;
  payment: get_order_order_shipments_payment | null;
  selected_rate_id: string | null;
  selected_rate: get_order_order_shipments_selected_rate | null;
  carrier_ids: string[];
  rates: get_order_order_shipments_rates[] | null;
  metadata: any;
  meta: any | null;
  messages: get_order_order_shipments_messages[];
}

export interface get_order_order {
  id: string;  // The ID of the object.
  order_id: string;
  source: string | null;
  status: OrderStatus;
  shipping_to: get_order_order_shipping_to;
  shipping_from: get_order_order_shipping_from | null;
  billing_address: get_order_order_billing_address | null;
  line_items: get_order_order_line_items[];
  created_at: any;
  updated_at: any;
  created_by: get_order_order_created_by;
  test_mode: boolean;
  options: any | null;
  metadata: any | null;
  shipments: get_order_order_shipments[];
}

export interface get_order {
  order: get_order_order | null;
}

export interface get_orderVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_orders
// ====================================================

export interface get_orders_orders_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_orders_orders_edges_node_shipping_to {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_orders_orders_edges_node_shipping_from {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_orders_orders_edges_node_billing_address {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_orders_orders_edges_node_line_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  unfulfilled_quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_orders_orders_edges_node_created_by {
  email: string;
  full_name: string;
}

export interface get_orders_orders_edges_node_shipments_created_by {
  email: string;
  full_name: string;
}

export interface get_orders_orders_edges_node_shipments_recipient {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_orders_orders_edges_node_shipments_shipper {
  id: string;
  postal_code: string | null;
  city: string | null;
  person_name: string | null;
  company_name: string | null;
  country_code: CountryCodeEnum;
  email: string | null;
  phone_number: string | null;
  state_code: string | null;
  suburb: string | null;
  residential: boolean | null;
  address_line1: string | null;
  address_line2: string | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  validate_location: boolean | null;
}

export interface get_orders_orders_edges_node_shipments_parcels_items {
  id: string;
  weight: number | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_orders_orders_edges_node_shipments_parcels {
  id: string;
  width: number | null;
  height: number | null;
  length: number | null;
  is_document: boolean | null;
  dimension_unit: DimensionUnitEnum | null;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  packaging_type: string | null;
  package_preset: string | null;
  freight_class: string | null;
  reference_number: string | null;
  items: get_orders_orders_edges_node_shipments_parcels_items[];
}

export interface get_orders_orders_edges_node_shipments_customs_duty {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
  declared_value: number | null;
}

export interface get_orders_orders_edges_node_shipments_customs_commodities {
  id: string;
  weight: number | null;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any | null;
  parent_id: string | null;
}

export interface get_orders_orders_edges_node_shipments_customs {
  id: string;
  certify: boolean | null;
  commercial_invoice: boolean | null;
  content_type: CustomsContentTypeEnum | null;
  content_description: string | null;
  incoterm: IncotermCodeEnum | null;
  invoice: string | null;
  invoice_date: any | null;
  signer: string | null;
  duty: get_orders_orders_edges_node_shipments_customs_duty | null;
  options: any | null;
  commodities: get_orders_orders_edges_node_shipments_customs_commodities[];
}

export interface get_orders_orders_edges_node_shipments_payment {
  paid_by: PaidByEnum | null;
  currency: CurrencyCodeEnum | null;
  account_number: string | null;
}

export interface get_orders_orders_edges_node_shipments_selected_rate_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_orders_orders_edges_node_shipments_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_orders_orders_edges_node_shipments_selected_rate_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_orders_orders_edges_node_shipments_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum | null;
}

export interface get_orders_orders_edges_node_shipments_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum | null;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_orders_orders_edges_node_shipments_rates_extra_charges[] | null;
  test_mode: boolean;
  meta: any | null;
}

export interface get_orders_orders_edges_node_shipments_messages {
  carrier_name: string | null;
  carrier_id: string | null;
  message: string | null;
  code: string | null;
  details: any | null;
}

export interface get_orders_orders_edges_node_shipments {
  id: string;  // The ID of the object.
  carrier_id: string | null;
  carrier_name: string | null;
  created_at: any;
  updated_at: any;
  created_by: get_orders_orders_edges_node_shipments_created_by;
  status: ShipmentStatusEnum;
  recipient: get_orders_orders_edges_node_shipments_recipient;
  shipper: get_orders_orders_edges_node_shipments_shipper;
  parcels: get_orders_orders_edges_node_shipments_parcels[];
  label_type: LabelTypeEnum | null;
  tracking_number: string | null;
  shipment_identifier: string | null;
  label_url: string | null;
  invoice_url: string | null;
  tracking_url: string | null;
  test_mode: boolean;
  service: string | null;
  reference: string | null;
  customs: get_orders_orders_edges_node_shipments_customs | null;
  payment: get_orders_orders_edges_node_shipments_payment | null;
  selected_rate_id: string | null;
  selected_rate: get_orders_orders_edges_node_shipments_selected_rate | null;
  carrier_ids: string[];
  rates: get_orders_orders_edges_node_shipments_rates[] | null;
  metadata: any;
  meta: any | null;
  messages: get_orders_orders_edges_node_shipments_messages[];
}

export interface get_orders_orders_edges_node {
  id: string;  // The ID of the object.
  order_id: string;
  source: string | null;
  status: OrderStatus;
  shipping_to: get_orders_orders_edges_node_shipping_to;
  shipping_from: get_orders_orders_edges_node_shipping_from | null;
  billing_address: get_orders_orders_edges_node_billing_address | null;
  line_items: get_orders_orders_edges_node_line_items[];
  created_at: any;
  updated_at: any;
  created_by: get_orders_orders_edges_node_created_by;
  test_mode: boolean;
  options: any | null;
  metadata: any | null;
  shipments: get_orders_orders_edges_node_shipments[];
}

export interface get_orders_orders_edges {
  node: get_orders_orders_edges_node | null;  // The item at the end of the edge
}

export interface get_orders_orders {
  pageInfo: get_orders_orders_pageInfo;       // Pagination data for this connection.
  edges: (get_orders_orders_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_orders {
  orders: get_orders_orders;
}

export interface get_ordersVariables {
  offset?: number | null;
  first?: number | null;
  id?: (string | null)[] | null;
  order_id?: (string | null)[] | null;
  source?: (string | null)[] | null;
  status?: (string | null)[] | null;
  address?: string | null;
  created_after?: any | null;
  created_before?: any | null;
  option_key?: (string | null)[] | null;
  option_value?: string | null;
  metadata_value?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: mutate_metadata
// ====================================================

export interface mutate_metadata_mutate_metadata_errors {
  field: string;
  messages: string[];
}

export interface mutate_metadata_mutate_metadata {
  id: string | null;
  metadata: any | null;
  errors: (mutate_metadata_mutate_metadata_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface mutate_metadata {
  mutate_metadata: mutate_metadata_mutate_metadata | null;
}

export interface mutate_metadataVariables {
  data: MutateMetadataInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_document_template
// ====================================================

export interface get_document_template_document_template {
  id: string;  // The ID of the object.
  slug: string;
  name: string;
  template: string;
  description: string | null;
  related_object: TemplateRelatedObject | null;
}

export interface get_document_template {
  document_template: get_document_template_document_template | null;
}

export interface get_document_templateVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_document_templates
// ====================================================

export interface get_document_templates_document_templates_pageInfo {
  hasNextPage: boolean;        // When paginating forwards, are there more items?
  hasPreviousPage: boolean;    // When paginating backwards, are there more items?
  startCursor: string | null;  // When paginating backwards, the cursor to continue.
  endCursor: string | null;    // When paginating forwards, the cursor to continue.
}

export interface get_document_templates_document_templates_edges_node {
  id: string;  // The ID of the object.
  slug: string;
  name: string;
  template: string;
  description: string | null;
  related_object: TemplateRelatedObject | null;
}

export interface get_document_templates_document_templates_edges {
  node: get_document_templates_document_templates_edges_node | null;  // The item at the end of the edge
}

export interface get_document_templates_document_templates {
  pageInfo: get_document_templates_document_templates_pageInfo;       // Pagination data for this connection.
  edges: (get_document_templates_document_templates_edges | null)[];  // Contains the nodes in this connection.
}

export interface get_document_templates {
  document_templates: get_document_templates_document_templates;
}

export interface get_document_templatesVariables {
  offset?: number | null;
  first?: number | null;
  related_object?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_document_template
// ====================================================

export interface create_document_template_create_document_template_template {
  id: string;  // The ID of the object.
}

export interface create_document_template_create_document_template_errors {
  field: string;
  messages: string[];
}

export interface create_document_template_create_document_template {
  template: create_document_template_create_document_template_template | null;
  errors: (create_document_template_create_document_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface create_document_template {
  create_document_template: create_document_template_create_document_template | null;
}

export interface create_document_templateVariables {
  data: CreateDocumentTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_document_template
// ====================================================

export interface update_document_template_update_document_template_template {
  id: string;  // The ID of the object.
}

export interface update_document_template_update_document_template_errors {
  field: string;
  messages: string[];
}

export interface update_document_template_update_document_template {
  template: update_document_template_update_document_template_template | null;
  errors: (update_document_template_update_document_template_errors | null)[] | null;  // May contain more than one error for same field.
}

export interface update_document_template {
  update_document_template: update_document_template_update_document_template | null;
}

export interface update_document_templateVariables {
  data: UpdateDocumentTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_document_template
// ====================================================

export interface delete_document_template_delete_document_template {
  id: string | null;
}

export interface delete_document_template {
  delete_document_template: delete_document_template_delete_document_template | null;
}

export interface delete_document_templateVariables {
  data: DeleteDocumentTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: search_data
// ====================================================

export interface search_data_shipment_results_edges_node_recipient {
  id: string;
  city: string | null;
  address_line1: string | null;
  address_line2: string | null;
  country_code: CountryCodeEnum;
  postal_code: string | null;
  person_name: string | null;
  phone_number: string | null;
  company_name: string | null;
  state_code: string | null;
}

export interface search_data_shipment_results_edges_node {
  id: string;  // The ID of the object.
  status: ShipmentStatusEnum;
  tracking_number: string | null;
  recipient: search_data_shipment_results_edges_node_recipient;
  created_at: any;
}

export interface search_data_shipment_results_edges {
  node: search_data_shipment_results_edges_node | null;  // The item at the end of the edge
}

export interface search_data_shipment_results {
  edges: (search_data_shipment_results_edges | null)[];  // Contains the nodes in this connection.
}

export interface search_data_trackers_results_edges_node {
  id: string;  // The ID of the object.
  status: TrackerStatusEnum;
  tracking_number: string;
  created_at: any;
}

export interface search_data_trackers_results_edges {
  node: search_data_trackers_results_edges_node | null;  // The item at the end of the edge
}

export interface search_data_trackers_results {
  edges: (search_data_trackers_results_edges | null)[];  // Contains the nodes in this connection.
}

export interface search_data {
  shipment_results: search_data_shipment_results;
  trackers_results: search_data_trackers_results;
}

export interface search_dataVariables {
  keyword?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: search_data_extended
// ====================================================

export interface search_data_extended_shipment_results_edges_node_recipient {
  id: string;
  city: string | null;
  address_line1: string | null;
  address_line2: string | null;
  country_code: CountryCodeEnum;
  postal_code: string | null;
  person_name: string | null;
  phone_number: string | null;
  company_name: string | null;
  state_code: string | null;
}

export interface search_data_extended_shipment_results_edges_node {
  id: string;  // The ID of the object.
  status: ShipmentStatusEnum;
  tracking_number: string | null;
  recipient: search_data_extended_shipment_results_edges_node_recipient;
  created_at: any;
}

export interface search_data_extended_shipment_results_edges {
  node: search_data_extended_shipment_results_edges_node | null;  // The item at the end of the edge
}

export interface search_data_extended_shipment_results {
  edges: (search_data_extended_shipment_results_edges | null)[];  // Contains the nodes in this connection.
}

export interface search_data_extended_order_results_edges_node_shipping_to {
  id: string;
  city: string | null;
  address_line1: string | null;
  address_line2: string | null;
  country_code: CountryCodeEnum;
  postal_code: string | null;
  person_name: string | null;
  phone_number: string | null;
  company_name: string | null;
  state_code: string | null;
}

export interface search_data_extended_order_results_edges_node {
  id: string;  // The ID of the object.
  status: OrderStatus;
  order_id: string;
  shipping_to: search_data_extended_order_results_edges_node_shipping_to;
  created_at: any;
}

export interface search_data_extended_order_results_edges {
  node: search_data_extended_order_results_edges_node | null;  // The item at the end of the edge
}

export interface search_data_extended_order_results {
  edges: (search_data_extended_order_results_edges | null)[];  // Contains the nodes in this connection.
}

export interface search_data_extended_tracker_results_edges_node {
  id: string;  // The ID of the object.
  status: TrackerStatusEnum;
  tracking_number: string;
  created_at: any;
}

export interface search_data_extended_tracker_results_edges {
  node: search_data_extended_tracker_results_edges_node | null;  // The item at the end of the edge
}

export interface search_data_extended_tracker_results {
  edges: (search_data_extended_tracker_results_edges | null)[];  // Contains the nodes in this connection.
}

export interface search_data_extended {
  shipment_results: search_data_extended_shipment_results;
  order_results: search_data_extended_order_results;
  tracker_results: search_data_extended_tracker_results;
}

export interface search_data_extendedVariables {
  keyword?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// An enumeration.
export enum CountryCodeEnum {
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
export enum IncotermCodeEnum {
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
export enum CustomsContentTypeEnum {
  documents = "documents",
  gift = "gift",
  merchandise = "merchandise",
  other = "other",
  return_merchandise = "return_merchandise",
  sample = "sample",
}

// An enumeration.
export enum PaidByEnum {
  recipient = "recipient",
  sender = "sender",
  third_party = "third_party",
}

// An enumeration.
export enum CurrencyCodeEnum {
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
export enum DimensionUnitEnum {
  CM = "CM",
  IN = "IN",
}

// An enumeration.
export enum WeightUnitEnum {
  KG = "KG",
  LB = "LB",
}

// An enumeration.
export enum LabelTemplateTypeEnum {
  SVG = "SVG",
  ZPL = "ZPL",
}

// An enumeration.
export enum OrganizationUserRole {
  admin = "admin",
  developer = "developer",
  member = "member",
}

// An enumeration.
export enum ShipmentStatusEnum {
  cancelled = "cancelled",
  delivered = "delivered",
  draft = "draft",
  in_transit = "in_transit",
  purchased = "purchased",
  shipped = "shipped",
}

// An enumeration.
export enum LabelTypeEnum {
  PDF = "PDF",
  PNG = "PNG",
  ZPL = "ZPL",
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
export enum TrackerStatusEnum {
  delivered = "delivered",
  in_transit = "in_transit",
  incident = "incident",
  pending = "pending",
  unknown = "unknown",
}

// An enumeration.
export enum EventTypes {
  all = "all",
  batch_completed = "batch_completed",
  batch_failed = "batch_failed",
  batch_queued = "batch_queued",
  batch_running = "batch_running",
  order_cancelled = "order_cancelled",
  order_created = "order_created",
  order_delivered = "order_delivered",
  order_fulfilled = "order_fulfilled",
  order_updated = "order_updated",
  shipment_cancelled = "shipment_cancelled",
  shipment_fulfilled = "shipment_fulfilled",
  shipment_purchased = "shipment_purchased",
  tracker_created = "tracker_created",
  tracker_updated = "tracker_updated",
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

// An enumeration.
export enum OrderStatus {
  cancelled = "cancelled",
  delivered = "delivered",
  fulfilled = "fulfilled",
  partial = "partial",
  unfulfilled = "unfulfilled",
}

// An enumeration.
export enum MetadataObjectType {
  app = "app",
  carrier = "carrier",
  commodity = "commodity",
  order = "order",
  shipment = "shipment",
  tracker = "tracker",
}

export enum TemplateRelatedObject {
  order = "order",
  shipment = "shipment",
}

// null
export interface CreateConnectionInput {
  amazonmwssettings?: CreateAmazonMwsSettings | null;
  aramexsettings?: CreateAramexSettings | null;
  australiapostsettings?: CreateAustraliaPostSettings | null;
  canadapostsettings?: CreateCanadaPostSettings | null;
  canparsettings?: CreateCanparSettings | null;
  chronopostsettings?: CreateChronopostSettings | null;
  dhlexpresssettings?: CreateDHLExpressSettings | null;
  dhlpolandsettings?: CreateDHLPolandSettings | null;
  dhluniversalsettings?: CreateDHLUniversalSettings | null;
  dicomsettings?: CreateDicomSettings | null;
  dpdhlsettings?: CreateDPDHLSettings | null;
  easypostsettings?: CreateEasyPostSettings | null;
  eshippersettings?: CreateEShipperSettings | null;
  fedexsettings?: CreateFedexSettings | null;
  freightcomsettings?: CreateFreightcomSettings | null;
  genericsettings?: CreateGenericSettings | null;
  purolatorsettings?: CreatePurolatorSettings | null;
  royalmailsettings?: CreateRoyalMailSettings | null;
  sendlesettings?: CreateSendleSettings | null;
  sfexpresssettings?: CreateSFExpressSettings | null;
  tntsettings?: CreateTNTSettings | null;
  upssettings?: CreateUPSSettings | null;
  upsfreightsettings?: CreateUPSFreightSettings | null;
  uspssettings?: CreateUSPSSettings | null;
  uspsinternationalsettings?: CreateUSPSInternationalSettings | null;
  yanwensettings?: CreateYanwenSettings | null;
  yunexpresssettings?: CreateYunExpressSettings | null;
  clientMutationId?: string | null;
}

// null
export interface CreateAmazonMwsSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  seller_id: string;
  developer_id: string;
  mws_auth_token: string;
  aws_region?: string | null;
}

// null
export interface CreateAramexSettings {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_pin: string;
  account_entity: string;
  account_number: string;
}

// null
export interface CreateAustraliaPostSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  api_key: string;
  password: string;
  account_number: string;
}

// null
export interface CreateCanadaPostSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  customer_number?: string | null;
  contract_id?: string | null;
}

// null
export interface CreateCanparSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
}

// null
export interface CreateChronopostSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  password: string;
  account_number?: string | null;
}

// null
export interface CreateDHLExpressSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  site_id: string;
  password: string;
  account_number?: string | null;
}

// null
export interface CreateDHLPolandSettings {
  id?: string | null;
  services?: (ServiceLevel | null)[] | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_number?: string | null;
}

// null
export interface ServiceLevel {
  dimension_unit?: DimensionUnitEnum | null;
  weight_unit?: WeightUnitEnum | null;
  currency?: string | null;
  service_name: string;
  service_code: string;
  description?: string | null;
  active?: boolean | null;
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
export interface CreateDHLUniversalSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  consumer_key: string;
  consumer_secret: string;
}

// null
export interface CreateDicomSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  billing_account: string;
}

// null
export interface CreateDPDHLSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  app_id: string;
  username: string;
  password: string;
  signature: string;
  account_number?: string | null;
}

// null
export interface CreateEasyPostSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  api_key: string;
}

// null
export interface CreateEShipperSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
}

// null
export interface CreateFedexSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  password: string;
  meter_number: string;
  account_number: string;
  user_key?: string | null;
}

// null
export interface CreateFreightcomSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
}

// null
export interface CreateGenericSettings {
  id?: string | null;
  account_country_code?: string | null;
  services?: (ServiceLevel | null)[] | null;
  label_template?: LabelTemplate | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  display_name: string;
  custom_carrier_name: string;
  account_number?: string | null;
}

// null
export interface LabelTemplate {
  template_type?: LabelTemplateTypeEnum | null;
  slug: string;
  template: string;
  width?: number | null;
  height?: number | null;
  shipment_sample?: any | null;
}

// null
export interface CreatePurolatorSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_number: string;
  user_token?: string | null;
}

// null
export interface CreateRoyalMailSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  client_id: string;
  client_secret: string;
}

// null
export interface CreateSendleSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  sendle_id: string;
  api_key: string;
}

// null
export interface CreateSFExpressSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  partner_id: string;
  check_word: string;
}

// null
export interface CreateTNTSettings {
  id?: string | null;
  account_country_code: string;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_number: string;
}

// null
export interface CreateUPSSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
}

// null
export interface CreateUPSFreightSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
}

// null
export interface CreateUSPSSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface CreateUSPSInternationalSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface CreateYanwenSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  customer_number: string;
  license_key: string;
}

// null
export interface CreateYunExpressSettings {
  id?: string | null;
  carrier_id: string;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  customer_number: string;
  api_secret: string;
}

// null
export interface UpdateConnectionInput {
  amazonmwssettings?: UpdateAmazonMwsSettings | null;
  aramexsettings?: UpdateAramexSettings | null;
  australiapostsettings?: UpdateAustraliaPostSettings | null;
  canadapostsettings?: UpdateCanadaPostSettings | null;
  canparsettings?: UpdateCanparSettings | null;
  chronopostsettings?: UpdateChronopostSettings | null;
  dhlexpresssettings?: UpdateDHLExpressSettings | null;
  dhlpolandsettings?: UpdateDHLPolandSettings | null;
  dhluniversalsettings?: UpdateDHLUniversalSettings | null;
  dicomsettings?: UpdateDicomSettings | null;
  dpdhlsettings?: UpdateDPDHLSettings | null;
  easypostsettings?: UpdateEasyPostSettings | null;
  eshippersettings?: UpdateEShipperSettings | null;
  fedexsettings?: UpdateFedexSettings | null;
  freightcomsettings?: UpdateFreightcomSettings | null;
  genericsettings?: UpdateGenericSettings | null;
  purolatorsettings?: UpdatePurolatorSettings | null;
  royalmailsettings?: UpdateRoyalMailSettings | null;
  sendlesettings?: UpdateSendleSettings | null;
  sfexpresssettings?: UpdateSFExpressSettings | null;
  tntsettings?: UpdateTNTSettings | null;
  upssettings?: UpdateUPSSettings | null;
  upsfreightsettings?: UpdateUPSFreightSettings | null;
  uspssettings?: UpdateUSPSSettings | null;
  uspsinternationalsettings?: UpdateUSPSInternationalSettings | null;
  yanwensettings?: UpdateYanwenSettings | null;
  yunexpresssettings?: UpdateYunExpressSettings | null;
  id: string;
  clientMutationId?: string | null;
}

// null
export interface UpdateAmazonMwsSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  seller_id?: string | null;
  developer_id?: string | null;
  mws_auth_token?: string | null;
  aws_region?: string | null;
}

// null
export interface UpdateAramexSettings {
  id?: string | null;
  account_country_code: string;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_pin?: string | null;
  account_entity?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateAustraliaPostSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  api_key?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateCanadaPostSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  customer_number?: string | null;
  contract_id?: string | null;
}

// null
export interface UpdateCanparSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
}

// null
export interface UpdateChronopostSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateDHLExpressSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  site_id?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateDHLPolandSettings {
  id?: string | null;
  services?: (PartialServiceLevel | null)[] | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface PartialServiceLevel {
  id?: string | null;
  dimension_unit?: DimensionUnitEnum | null;
  weight_unit?: WeightUnitEnum | null;
  currency?: string | null;
  service_name?: string | null;
  service_code?: string | null;
  description?: string | null;
  active?: boolean | null;
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
export interface UpdateDHLUniversalSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  consumer_key?: string | null;
  consumer_secret?: string | null;
}

// null
export interface UpdateDicomSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  billing_account?: string | null;
}

// null
export interface UpdateDPDHLSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  app_id?: string | null;
  username?: string | null;
  password?: string | null;
  signature?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateEasyPostSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  api_key?: string | null;
}

// null
export interface UpdateEShipperSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
}

// null
export interface UpdateFedexSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  password?: string | null;
  meter_number?: string | null;
  account_number?: string | null;
  user_key?: string | null;
}

// null
export interface UpdateFreightcomSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
}

// null
export interface UpdateGenericSettings {
  id?: string | null;
  account_country_code?: string | null;
  services?: (PartialServiceLevel | null)[] | null;
  label_template?: PartialLabelTemplate | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  display_name?: string | null;
  custom_carrier_name?: string | null;
  account_number?: string | null;
}

// null
export interface PartialLabelTemplate {
  id?: string | null;
  template_type?: LabelTemplateTypeEnum | null;
  slug?: string | null;
  template?: string | null;
  width?: number | null;
  height?: number | null;
  shipment_sample?: any | null;
}

// null
export interface UpdatePurolatorSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
  user_token?: string | null;
}

// null
export interface UpdateRoyalMailSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  client_id?: string | null;
  client_secret?: string | null;
}

// null
export interface UpdateSendleSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  sendle_id?: string | null;
  api_key?: string | null;
}

// null
export interface UpdateSFExpressSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  partner_id?: string | null;
  check_word?: string | null;
}

// null
export interface UpdateTNTSettings {
  id?: string | null;
  account_country_code: string;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateUPSSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  access_license_number?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateUPSFreightSettings {
  id?: string | null;
  account_country_code?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  access_license_number?: string | null;
  account_number?: string | null;
}

// null
export interface UpdateUSPSSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface UpdateUSPSInternationalSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
}

// null
export interface UpdateYanwenSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
  customer_number?: string | null;
  license_key?: string | null;
}

// null
export interface UpdateYunExpressSettings {
  id?: string | null;
  carrier_id?: string | null;
  test_mode?: boolean | null;
  active?: boolean | null;
  metadata?: any | null;
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
  name: string;
  clientMutationId?: string | null;
}

// null
export interface UpdateOrganizationInput {
  id: string;
  name?: string | null;
  clientMutationId?: string | null;
}

// null
export interface ChangeOrganizationOwnerInput {
  org_id: string;
  email: string;
  password: string;
  clientMutationId?: string | null;
}

// null
export interface SetOrganizationUserRolesInput {
  org_id: string;
  user_id: string;
  roles: OrganizationUserRole[];
  clientMutationId?: string | null;
}

// null
export interface SendOrganizationInvitesInput {
  org_id: string;
  emails: (string | null)[];
  redirect_url: string;
  clientMutationId?: string | null;
}

// null
export interface AcceptOrganizationInvitationInput {
  guid: string;
  clientMutationId?: string | null;
}

// null
export interface DeleteOrganizationInvitationInput {
  id: string;
  clientMutationId?: string | null;
}

// null
export interface PartialShipmentUpdateInput {
  id: string;
  recipient?: PartialAddress | null;
  shipper?: PartialAddress | null;
  customs?: PartialCustoms | null;
  parcels?: (PartialParcel | null)[] | null;
  payment?: PartialPayment | null;
  options?: any | null;
  reference?: string | null;
  metadata?: any | null;
  clientMutationId?: string | null;
}

// null
export interface PartialAddress {
  id?: string | null;
  country_code?: CountryCodeEnum | null;
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
}

// null
export interface PartialCustoms {
  id?: string | null;
  incoterm?: IncotermCodeEnum | null;
  commodities?: (PartialCommodity | null)[] | null;
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: CustomsContentTypeEnum | null;
  content_description?: string | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: PartialDuty | null;
  options?: any | null;
}

// null
export interface PartialCommodity {
  id?: string | null;
  weight_unit?: WeightUnitEnum | null;
  value_currency?: CurrencyCodeEnum | null;
  origin_country?: CountryCodeEnum | null;
  weight?: number | null;
  description?: string | null;
  quantity?: number | null;
  sku?: string | null;
  hs_code?: string | null;
  value_amount?: number | null;
  metadata?: any | null;
  parent_id?: string | null;
}

// null
export interface PartialDuty {
  paid_by?: PaidByEnum | null;
  currency?: CurrencyCodeEnum | null;
  declared_value?: number | null;
  account_number?: string | null;
  bill_to?: PartialAddress | null;
}

// null
export interface PartialParcel {
  id?: string | null;
  weight_unit?: WeightUnitEnum | null;
  dimension_unit?: DimensionUnitEnum | null;
  weight?: number | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
  reference_number?: string | null;
  freight_class?: string | null;
  options?: any | null;
  items?: (PartialCommodity | null)[] | null;
}

// null
export interface PartialPayment {
  paid_by?: PaidByEnum | null;
  currency?: currency | null;
  account_number?: string | null;
}

// null
export interface SystemCarrierMutationInput {
  id: string;
  enable: boolean;
  clientMutationId?: string | null;
}

// null
export interface CreateAddressTemplateInput {
  address: CreateAddressTemplate;
  label: string;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface CreateAddressTemplate {
  country_code: CountryCodeEnum;
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
}

// null
export interface CreateCustomsTemplateInput {
  customs: CreateCustomsTemplate;
  label: string;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface CreateCustomsTemplate {
  id?: string | null;
  incoterm?: IncotermCodeEnum | null;
  commodities?: (Commodity | null)[] | null;
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: CustomsContentTypeEnum | null;
  content_description?: string | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: PartialDuty | null;
  options?: any | null;
}

// null
export interface Commodity {
  weight_unit?: WeightUnitEnum | null;
  value_currency?: CurrencyCodeEnum | null;
  origin_country?: CountryCodeEnum | null;
  weight?: number | null;
  description?: string | null;
  quantity?: number | null;
  sku?: string | null;
  hs_code?: string | null;
  value_amount?: number | null;
  metadata?: any | null;
  parent_id?: string | null;
}

// null
export interface CreateParcelTemplateInput {
  parcel: CreateParcelTemplate;
  label: string;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface CreateParcelTemplate {
  weight_unit?: WeightUnitEnum | null;
  dimension_unit?: DimensionUnitEnum | null;
  weight?: number | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
  reference_number?: string | null;
  freight_class?: string | null;
  options?: any | null;
  items?: (Commodity | null)[] | null;
}

// null
export interface UpdateAddressTemplateInput {
  id: string;
  address?: UpdateAddressTemplate | null;
  label?: string | null;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface UpdateAddressTemplate {
  id?: string | null;
  country_code?: CountryCodeEnum | null;
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
}

// null
export interface UpdateCustomsTemplateInput {
  id: string;
  customs?: UpdateCustomsTemplate | null;
  label?: string | null;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface UpdateCustomsTemplate {
  id?: string | null;
  incoterm?: IncotermCodeEnum | null;
  commodities?: (PartialCommodity | null)[] | null;
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: CustomsContentTypeEnum | null;
  content_description?: string | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: PartialDuty | null;
  options?: any | null;
}

// null
export interface UpdateParcelTemplateInput {
  id: string;
  parcel?: UpdateParcelTemplate | null;
  label?: string | null;
  is_default?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface UpdateParcelTemplate {
  id?: string | null;
  weight_unit?: WeightUnitEnum | null;
  dimension_unit?: DimensionUnitEnum | null;
  weight?: number | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
  reference_number?: string | null;
  freight_class?: string | null;
  options?: any | null;
  items?: (PartialCommodity | null)[] | null;
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
export interface DiscardCustomsInput {
  id: string;
  clientMutationId?: string | null;
}

// null
export interface DiscardParcelInput {
  id: string;
  clientMutationId?: string | null;
}

// null
export interface TokenMutationInput {
  refresh?: boolean | null;
  password?: string | null;
  clientMutationId?: string | null;
}

// null
export interface UpdateUserInput {
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
  redirect_url: string;
  clientMutationId?: string | null;
}

// null
export interface ConfirmEmailInput {
  token: string;
  clientMutationId?: string | null;
}

// null
export interface RequestEmailChangeInput {
  email: string;
  password: string;
  redirect_url: string;
  clientMutationId?: string | null;
}

// null
export interface ConfirmEmailChangeInput {
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

// null
export interface MutateMetadataInput {
  id: string;
  object_type: MetadataObjectType;
  added_values?: any | null;
  discarded_keys?: (string | null)[] | null;
  clientMutationId?: string | null;
}

// null
export interface CreateDocumentTemplateInput {
  slug: string;
  name: string;
  template: string;
  description?: string | null;
  related_object: TemplateRelatedObject;
  active?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface UpdateDocumentTemplateInput {
  id: string;
  slug?: string | null;
  name?: string | null;
  template?: string | null;
  description?: string | null;
  related_object?: TemplateRelatedObject | null;
  active?: boolean | null;
  clientMutationId?: string | null;
}

// null
export interface DeleteDocumentTemplateInput {
  id: string;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================