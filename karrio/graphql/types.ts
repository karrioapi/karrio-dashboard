

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_address_templates
// ====================================================

export interface get_address_templates_address_templates_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
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
  id: string;
  is_default: boolean | null;
  label: string;
  address: get_address_templates_address_templates_edges_node_address;
}

export interface get_address_templates_address_templates_edges {
  node: get_address_templates_address_templates_edges_node;
}

export interface get_address_templates_address_templates {
  page_info: get_address_templates_address_templates_page_info;
  edges: get_address_templates_address_templates_edges[];
}

export interface get_address_templates {
  address_templates: get_address_templates_address_templates;
}

export interface get_address_templatesVariables {
  filter?: AddressFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_customs_info_templates
// ====================================================

export interface get_customs_info_templates_customs_templates_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
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
  id: string;
  label: string;
  is_default: boolean | null;
  customs: get_customs_info_templates_customs_templates_edges_node_customs;
}

export interface get_customs_info_templates_customs_templates_edges {
  node: get_customs_info_templates_customs_templates_edges_node;
}

export interface get_customs_info_templates_customs_templates {
  page_info: get_customs_info_templates_customs_templates_page_info;
  edges: get_customs_info_templates_customs_templates_edges[];
}

export interface get_customs_info_templates {
  customs_templates: get_customs_info_templates_customs_templates;
}

export interface get_customs_info_templatesVariables {
  filter?: TemplateFilter | null;
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
  id: string;
  is_default: boolean | null;
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
  id: string;
  label: string;
  is_default: boolean | null;
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
  id: string;
  is_default: boolean | null;
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

export interface create_connection_create_carrier_connection_errors {
  field: string;
  messages: string[];
}

export interface create_connection_create_carrier_connection {
  errors: create_connection_create_carrier_connection_errors[] | null;
}

export interface create_connection {
  create_carrier_connection: create_connection_create_carrier_connection;
}

export interface create_connectionVariables {
  data: CreateCarrierConnectionMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_connection
// ====================================================

export interface update_connection_update_carrier_connection_errors {
  field: string;
  messages: string[];
}

export interface update_connection_update_carrier_connection {
  errors: update_connection_update_carrier_connection_errors[] | null;
}

export interface update_connection {
  update_carrier_connection: update_connection_update_carrier_connection;
}

export interface update_connectionVariables {
  data: UpdateCarrierConnectionMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_connection
// ====================================================

export interface delete_connection_delete_carrier_connection {
  id: string;
}

export interface delete_connection {
  delete_carrier_connection: delete_connection_delete_carrier_connection;
}

export interface delete_connectionVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_organization
// ====================================================

export interface get_organization_organization_current_user {
  email: string;
  full_name: string | null;
  is_admin: boolean;
  is_owner: boolean | null;
  last_login: any | null;
}

export interface get_organization_organization_members_invitation {
  id: string;
  guid: string;
  invitee_identifier: string;
  created: any;
  modified: any;
}

export interface get_organization_organization_members {
  email: string;
  full_name: string | null;
  is_admin: boolean;
  is_owner: boolean | null;
  invitation: get_organization_organization_members_invitation | null;
  last_login: any | null;
}

export interface get_organization_organization {
  id: string;
  name: string;
  slug: string;
  token: string;
  current_user: get_organization_organization_current_user;
  members: get_organization_organization_members[];
}

export interface get_organization {
  organization: get_organization_organization;
}

export interface get_organizationVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_organizations
// ====================================================

export interface get_organizations_organizations_current_user {
  email: string;
  full_name: string | null;
  is_admin: boolean;
  is_owner: boolean | null;
  last_login: any | null;
}

export interface get_organizations_organizations_members_invitation {
  id: string;
  guid: string;
  invitee_identifier: string;
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
  name: string;
  slug: string;
  token: string;
  current_user: get_organizations_organizations_current_user;
  members: get_organizations_organizations_members[];
}

export interface get_organizations {
  organizations: get_organizations_organizations[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_organization
// ====================================================

export interface delete_organization_delete_organization_organization {
  id: string;
}

export interface delete_organization_delete_organization_errors {
  field: string;
  messages: string[];
}

export interface delete_organization_delete_organization {
  organization: delete_organization_delete_organization_organization | null;
  errors: delete_organization_delete_organization_errors[] | null;
}

export interface delete_organization {
  delete_organization: delete_organization_delete_organization;
}

export interface delete_organizationVariables {
  data: DeleteOrganizationMutationInput;
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
  errors: create_organization_create_organization_errors[] | null;
}

export interface create_organization {
  create_organization: create_organization_create_organization;
}

export interface create_organizationVariables {
  data: CreateOrganizationMutationInput;
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
  errors: update_organization_update_organization_errors[] | null;
}

export interface update_organization {
  update_organization: update_organization_update_organization;
}

export interface update_organizationVariables {
  data: UpdateOrganizationMutationInput;
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
  errors: change_organization_owner_change_organization_owner_errors[] | null;
}

export interface change_organization_owner {
  change_organization_owner: change_organization_owner_change_organization_owner;
}

export interface change_organization_ownerVariables {
  data: ChangeOrganizationOwnerMutationInput;
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
  errors: set_organization_user_roles_set_organization_user_roles_errors[] | null;
}

export interface set_organization_user_roles {
  set_organization_user_roles: set_organization_user_roles_set_organization_user_roles;
}

export interface set_organization_user_rolesVariables {
  data: SetOrganizationUserRolesMutationInput;
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
  errors: send_organization_invites_send_organization_invites_errors[] | null;
}

export interface send_organization_invites {
  send_organization_invites: send_organization_invites_send_organization_invites;
}

export interface send_organization_invitesVariables {
  data: SendOrganizationInvitesMutationInput;
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
  invitee_identifier: string;
  organization_name: string;
  invitee: get_organization_invitation_organization_invitation_invitee | null;
}

export interface get_organization_invitation {
  organization_invitation: get_organization_invitation_organization_invitation;
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
  errors: accept_organization_invitation_accept_organization_invitation_errors[] | null;
}

export interface accept_organization_invitation {
  accept_organization_invitation: accept_organization_invitation_accept_organization_invitation;
}

export interface accept_organization_invitationVariables {
  data: AcceptOrganizationInvitationMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_organization_invitation
// ====================================================

export interface delete_organization_invitation_delete_organization_invitation {
  id: string;
}

export interface delete_organization_invitation {
  delete_organization_invitation: delete_organization_invitation_delete_organization_invitation;
}

export interface delete_organization_invitationVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_log
// ====================================================

export interface get_log_log {
  id: number;
  requested_at: any | null;
  response_ms: number | null;
  path: string | null;
  remote_addr: string | null;
  host: string | null;
  method: string | null;
  query_params: any | null;
  data: any | null;
  response: any | null;
  status_code: number | null;
}

export interface get_log {
  log: get_log_log;
}

export interface get_logVariables {
  id: number;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_logs
// ====================================================

export interface get_logs_logs_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface get_logs_logs_edges_node {
  id: number;
  path: string | null;
  data: any | null;
  method: string | null;
  response_ms: number | null;
  remote_addr: string | null;
  requested_at: any | null;
  status_code: number | null;
  query_params: any | null;
  host: string | null;
  response: any | null;
}

export interface get_logs_logs_edges {
  node: get_logs_logs_edges_node;
}

export interface get_logs_logs {
  page_info: get_logs_logs_page_info;
  edges: get_logs_logs_edges[];
}

export interface get_logs {
  logs: get_logs_logs;
}

export interface get_logsVariables {
  filter?: LogFilter | null;
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
  weight: number;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  currency: CurrencyCodeEnum;
}

export interface get_shipment_shipment_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_shipment_shipment_selected_rate_extra_charges[];
  test_mode: boolean;
  meta: any | null;
}

export interface get_shipment_shipment_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum;
}

export interface get_shipment_shipment_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_shipment_shipment_rates_extra_charges[];
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
  id: string;
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
  rates: get_shipment_shipment_rates[];
  options: any;
  metadata: any;
  meta: any | null;
  messages: get_shipment_shipment_messages[];
}

export interface get_shipment {
  shipment: get_shipment_shipment;
}

export interface get_shipmentVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_shipments
// ====================================================

export interface get_shipments_shipments_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
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
  weight: number;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  currency: CurrencyCodeEnum;
}

export interface get_shipments_shipments_edges_node_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_shipments_shipments_edges_node_selected_rate_extra_charges[];
  test_mode: boolean;
  meta: any | null;
}

export interface get_shipments_shipments_edges_node_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum;
}

export interface get_shipments_shipments_edges_node_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_shipments_shipments_edges_node_rates_extra_charges[];
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
  id: string;
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
  rates: get_shipments_shipments_edges_node_rates[];
  options: any;
  metadata: any;
  meta: any | null;
  messages: get_shipments_shipments_edges_node_messages[];
}

export interface get_shipments_shipments_edges {
  node: get_shipments_shipments_edges_node;
}

export interface get_shipments_shipments {
  page_info: get_shipments_shipments_page_info;
  edges: get_shipments_shipments_edges[];
}

export interface get_shipments {
  shipments: get_shipments_shipments;
}

export interface get_shipmentsVariables {
  filter?: ShipmentFilter | null;
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
  weight: number;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
}

export interface partial_shipment_update_partial_shipment_update_shipment_customs_commodities {
  id: string;
  weight: number;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  currency: CurrencyCodeEnum;
}

export interface partial_shipment_update_partial_shipment_update_shipment_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: partial_shipment_update_partial_shipment_update_shipment_selected_rate_extra_charges[];
  test_mode: boolean;
  meta: any | null;
}

export interface partial_shipment_update_partial_shipment_update_shipment_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum;
}

export interface partial_shipment_update_partial_shipment_update_shipment_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: partial_shipment_update_partial_shipment_update_shipment_rates_extra_charges[];
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
  id: string;
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
  rates: partial_shipment_update_partial_shipment_update_shipment_rates[];
  options: any;
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
  errors: partial_shipment_update_partial_shipment_update_errors[] | null;
}

export interface partial_shipment_update {
  partial_shipment_update: partial_shipment_update_partial_shipment_update;
}

export interface partial_shipment_updateVariables {
  data: PartialShipmentMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: change_shipment_status
// ====================================================

export interface change_shipment_status_change_shipment_status_shipment {
  id: string;
}

export interface change_shipment_status_change_shipment_status_errors {
  field: string;
  messages: string[];
}

export interface change_shipment_status_change_shipment_status {
  shipment: change_shipment_status_change_shipment_status_shipment | null;
  errors: change_shipment_status_change_shipment_status_errors[] | null;
}

export interface change_shipment_status {
  change_shipment_status: change_shipment_status_change_shipment_status;
}

export interface change_shipment_statusVariables {
  data: ChangeShipmentStatusMutationInput;
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
  id: string;
  service: string | null;
  shipper: get_tracker_tracker_shipment_shipper;
  recipient: get_tracker_tracker_shipment_recipient;
  meta: any | null;
  reference: string | null;
}

export interface get_tracker_tracker {
  id: string;
  tracking_number: string;
  carrier_id: string;
  carrier_name: string;
  status: TrackerStatusEnum;
  events: get_tracker_tracker_events[];
  delivered: boolean | null;
  estimated_delivery: any | null;
  meta: any | null;
  metadata: any;
  messages: get_tracker_tracker_messages[];
  created_at: any;
  updated_at: any;
  created_by: get_tracker_tracker_created_by;
  test_mode: boolean;
  shipment: get_tracker_tracker_shipment | null;
}

export interface get_tracker {
  tracker: get_tracker_tracker;
}

export interface get_trackerVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_trackers
// ====================================================

export interface get_trackers_trackers_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
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
  id: string;
  service: string | null;
  shipper: get_trackers_trackers_edges_node_shipment_shipper;
  recipient: get_trackers_trackers_edges_node_shipment_recipient;
  meta: any | null;
  reference: string | null;
}

export interface get_trackers_trackers_edges_node {
  id: string;
  created_at: any;
  updated_at: any;
  created_by: get_trackers_trackers_edges_node_created_by;
  status: TrackerStatusEnum;
  tracking_number: string;
  events: get_trackers_trackers_edges_node_events[];
  delivered: boolean | null;
  estimated_delivery: any | null;
  test_mode: boolean;
  messages: get_trackers_trackers_edges_node_messages[];
  carrier_id: string;
  carrier_name: string;
  meta: any | null;
  metadata: any;
  shipment: get_trackers_trackers_edges_node_shipment | null;
}

export interface get_trackers_trackers_edges {
  node: get_trackers_trackers_edges_node;
}

export interface get_trackers_trackers {
  page_info: get_trackers_trackers_page_info;
  edges: get_trackers_trackers_edges[];
}

export interface get_trackers {
  trackers: get_trackers_trackers;
}

export interface get_trackersVariables {
  filter?: TrackerFilter | null;
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
  id: string;
  created_by: get_webhook_webhook_created_by | null;
  enabled_events: EventTypes[];
  url: string | null;
  test_mode: boolean | null;
  disabled: boolean | null;
  description: string | null;
  last_event_at: any | null;
  secret: string | null;
}

export interface get_webhook {
  webhook: get_webhook_webhook;
}

export interface get_webhookVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_webhooks
// ====================================================

export interface get_webhooks_webhooks_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface get_webhooks_webhooks_edges_node_created_by {
  email: string;
  full_name: string;
}

export interface get_webhooks_webhooks_edges_node {
  id: string;
  created_at: any | null;
  updated_at: any | null;
  created_by: get_webhooks_webhooks_edges_node_created_by | null;
  enabled_events: EventTypes[];
  url: string | null;
  test_mode: boolean | null;
  disabled: boolean | null;
  description: string | null;
  last_event_at: any | null;
  secret: string | null;
}

export interface get_webhooks_webhooks_edges {
  node: get_webhooks_webhooks_edges_node;
}

export interface get_webhooks_webhooks {
  page_info: get_webhooks_webhooks_page_info;
  edges: get_webhooks_webhooks_edges[];
}

export interface get_webhooks {
  webhooks: get_webhooks_webhooks;
}

export interface get_webhooksVariables {
  filter?: WebhookFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_parcel_templates
// ====================================================

export interface get_parcel_templates_parcel_templates_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
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
  id: string;
  is_default: boolean | null;
  label: string;
  parcel: get_parcel_templates_parcel_templates_edges_node_parcel;
}

export interface get_parcel_templates_parcel_templates_edges {
  node: get_parcel_templates_parcel_templates_edges_node;
}

export interface get_parcel_templates_parcel_templates {
  page_info: get_parcel_templates_parcel_templates_page_info;
  edges: get_parcel_templates_parcel_templates_edges[];
}

export interface get_parcel_templates {
  parcel_templates: get_parcel_templates_parcel_templates;
}

export interface get_parcel_templatesVariables {
  filter?: TemplateFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_system_connections
// ====================================================

export interface get_system_connections_system_connections {
  id: string;
  carrier_id: string;
  test_mode: boolean;
  active: boolean;
  capabilities: string[];
  carrier_name: string;
  display_name: string;
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
  active: boolean;
}

export interface mutate_system_connection_mutate_system_connection {
  carrier: mutate_system_connection_mutate_system_connection_carrier | null;
}

export interface mutate_system_connection {
  mutate_system_connection: mutate_system_connection_mutate_system_connection;
}

export interface mutate_system_connectionVariables {
  data: SystemCarrierMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_customs_template
// ====================================================

export interface create_customs_template_create_customs_template_template {
  id: string;
}

export interface create_customs_template_create_customs_template_errors {
  field: string;
  messages: string[];
}

export interface create_customs_template_create_customs_template {
  template: create_customs_template_create_customs_template_template | null;
  errors: create_customs_template_create_customs_template_errors[] | null;
}

export interface create_customs_template {
  create_customs_template: create_customs_template_create_customs_template;
}

export interface create_customs_templateVariables {
  data: CreateCustomsTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_customs_template
// ====================================================

export interface update_customs_template_update_customs_template_template {
  id: string;
}

export interface update_customs_template_update_customs_template_errors {
  field: string;
  messages: string[];
}

export interface update_customs_template_update_customs_template {
  template: update_customs_template_update_customs_template_template | null;
  errors: update_customs_template_update_customs_template_errors[] | null;
}

export interface update_customs_template {
  update_customs_template: update_customs_template_update_customs_template;
}

export interface update_customs_templateVariables {
  data: UpdateCustomsTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_template
// ====================================================

export interface delete_template_delete_template {
  id: string;
}

export interface delete_template {
  delete_template: delete_template_delete_template;
}

export interface delete_templateVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_parcel_template
// ====================================================

export interface create_parcel_template_create_parcel_template_template {
  id: string;
}

export interface create_parcel_template_create_parcel_template_errors {
  field: string;
  messages: string[];
}

export interface create_parcel_template_create_parcel_template {
  template: create_parcel_template_create_parcel_template_template | null;
  errors: create_parcel_template_create_parcel_template_errors[] | null;
}

export interface create_parcel_template {
  create_parcel_template: create_parcel_template_create_parcel_template;
}

export interface create_parcel_templateVariables {
  data: CreateParcelTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_parcel_template
// ====================================================

export interface update_parcel_template_update_parcel_template_template {
  id: string;
}

export interface update_parcel_template_update_parcel_template_errors {
  field: string;
  messages: string[];
}

export interface update_parcel_template_update_parcel_template {
  template: update_parcel_template_update_parcel_template_template | null;
  errors: update_parcel_template_update_parcel_template_errors[] | null;
}

export interface update_parcel_template {
  update_parcel_template: update_parcel_template_update_parcel_template;
}

export interface update_parcel_templateVariables {
  data: UpdateParcelTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_address_template
// ====================================================

export interface create_address_template_create_address_template_template {
  id: string;
}

export interface create_address_template_create_address_template_errors {
  field: string;
  messages: string[];
}

export interface create_address_template_create_address_template {
  template: create_address_template_create_address_template_template | null;
  errors: create_address_template_create_address_template_errors[] | null;
}

export interface create_address_template {
  create_address_template: create_address_template_create_address_template;
}

export interface create_address_templateVariables {
  data: CreateAddressTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_address_template
// ====================================================

export interface update_address_template_update_address_template_template {
  id: string;
}

export interface update_address_template_update_address_template_errors {
  field: string;
  messages: string[];
}

export interface update_address_template_update_address_template {
  template: update_address_template_update_address_template_template | null;
  errors: update_address_template_update_address_template_errors[] | null;
}

export interface update_address_template {
  update_address_template: update_address_template_update_address_template;
}

export interface update_address_templateVariables {
  data: UpdateAddressTemplateInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: discard_commodity
// ====================================================

export interface discard_commodity_discard_commodity {
  id: string;
}

export interface discard_commodity {
  discard_commodity: discard_commodity_discard_commodity;
}

export interface discard_commodityVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: discard_customs
// ====================================================

export interface discard_customs_discard_customs {
  id: string;
}

export interface discard_customs {
  discard_customs: discard_customs_discard_customs;
}

export interface discard_customsVariables {
  data: DeleteMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: discard_parcel
// ====================================================

export interface discard_parcel_discard_parcel {
  id: string;
}

export interface discard_parcel {
  discard_parcel: discard_parcel_discard_parcel;
}

export interface discard_parcelVariables {
  data: DeleteMutationInput;
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
  mutate_token: mutate_token_mutate_token;
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
  token: GetToken_token;
}

export interface GetTokenVariables {
  org_id?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_user_connections
// ====================================================

export interface get_user_connections_user_connections_AmazonMwsSettingsType {
  __typename: "AmazonMwsSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  seller_id: string;
  developer_id: string;
  mws_auth_token: string;
  aws_region: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_AramexSettingsType {
  __typename: "AramexSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  account_pin: string;
  account_entity: string;
  account_number: string | null;
  account_country_code: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_AustraliaPostSettingsType {
  __typename: "AustraliaPostSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  api_key: string;
  password: string;
  account_number: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_CanadaPostSettingsType {
  __typename: "CanadaPostSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  customer_number: string;
  contract_id: string;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_CanparSettingsType {
  __typename: "CanparSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_ChronopostSettingsType {
  __typename: "ChronopostSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  password: string;
  account_number: string | null;
  account_country_code: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_DHLExpressSettingsType {
  __typename: "DHLExpressSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  site_id: string;
  password: string;
  account_number: string | null;
  account_country_code: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_DHLPolandSettingsType_services {
  id: string;
  active: boolean | null;
  service_name: string | null;
  service_code: string | null;
  description: string | null;
  cost: number | null;
  currency: CurrencyCodeEnum | null;
  estimated_transit_days: number | null;
  max_weight: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  weight_unit: WeightUnitEnum | null;
  dimension_unit: DimensionUnitEnum | null;
  domicile: boolean | null;
  international: boolean | null;
}

export interface get_user_connections_user_connections_DHLPolandSettingsType {
  __typename: "DHLPolandSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  account_number: string | null;
  services: get_user_connections_user_connections_DHLPolandSettingsType_services[] | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_DHLUniversalSettingsType {
  __typename: "DHLUniversalSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  consumer_key: string;
  consumer_secret: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_DicomSettingsType {
  __typename: "DicomSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  billing_account: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_DPDHLSettingsType_services {
  id: string;
  active: boolean | null;
  service_name: string | null;
  service_code: string | null;
  description: string | null;
  cost: number | null;
  currency: CurrencyCodeEnum | null;
  estimated_transit_days: number | null;
  max_weight: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  weight_unit: WeightUnitEnum | null;
  dimension_unit: DimensionUnitEnum | null;
  domicile: boolean | null;
  international: boolean | null;
}

export interface get_user_connections_user_connections_DPDHLSettingsType {
  __typename: "DPDHLSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  app_id: string;
  username: string;
  password: string;
  signature: string;
  account_number: string | null;
  services: get_user_connections_user_connections_DPDHLSettingsType_services[] | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_EShipperSettingsType {
  __typename: "EShipperSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_EasyPostSettingsType {
  __typename: "EasyPostSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  api_key: string;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_FedexSettingsType {
  __typename: "FedexSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  account_number: string | null;
  password: string;
  meter_number: string;
  user_key: string;
  account_country_code: string | null;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_FreightcomSettingsType {
  __typename: "FreightcomSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_GenericSettingsType_services {
  id: string;
  active: boolean | null;
  service_name: string | null;
  service_code: string | null;
  description: string | null;
  cost: number | null;
  currency: CurrencyCodeEnum | null;
  estimated_transit_days: number | null;
  max_weight: number | null;
  max_width: number | null;
  max_height: number | null;
  max_length: number | null;
  weight_unit: WeightUnitEnum | null;
  dimension_unit: DimensionUnitEnum | null;
  domicile: boolean | null;
  international: boolean | null;
}

export interface get_user_connections_user_connections_GenericSettingsType_label_template {
  id: string;
  slug: string | null;
  template: string | null;
  template_type: LabelTemplateTypeEnum | null;
  shipment_sample: any | null;
  width: number | null;
  height: number | null;
}

export interface get_user_connections_user_connections_GenericSettingsType {
  __typename: "GenericSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  custom_carrier_name: string;
  account_number: string | null;
  test_mode: boolean;
  active: boolean;
  account_country_code: string | null;
  services: get_user_connections_user_connections_GenericSettingsType_services[] | null;
  label_template: get_user_connections_user_connections_GenericSettingsType_label_template | null;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_PurolatorSettingsType {
  __typename: "PurolatorSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  account_number: string | null;
  user_token: string | null;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_RoyalMailSettingsType {
  __typename: "RoyalMailSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  client_id: string;
  client_secret: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_SendleSettingsType {
  __typename: "SendleSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  sendle_id: string;
  api_key: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_SFExpressSettingsType {
  __typename: "SFExpressSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  partner_id: string;
  check_word: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_TNTSettingsType {
  __typename: "TNTSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  account_number: string | null;
  account_country_code: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_UPSSettingsType {
  __typename: "UPSSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string | null;
  account_country_code: string | null;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_UPSFreightSettingsType {
  __typename: "UPSFreightSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string | null;
  account_country_code: string | null;
  metadata: any | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_USPSSettingsType {
  __typename: "USPSSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  mailer_id: string | null;
  customer_registration_id: string | null;
  logistics_manager_mailer_id: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_USPSInternationalSettingsType {
  __typename: "USPSInternationalSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  username: string;
  password: string;
  mailer_id: string | null;
  customer_registration_id: string | null;
  logistics_manager_mailer_id: string | null;
  capabilities: string[];
}

export interface get_user_connections_user_connections_YanwenSettingsType {
  __typename: "YanwenSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  customer_number: string;
  license_key: string;
  capabilities: string[];
}

export interface get_user_connections_user_connections_YunExpressSettingsType {
  __typename: "YunExpressSettingsType";
  id: string;
  carrier_id: string;
  carrier_name: string;
  display_name: string;
  test_mode: boolean;
  active: boolean;
  customer_number: string;
  api_secret: string;
  capabilities: string[];
}

export type get_user_connections_user_connections = get_user_connections_user_connections_AmazonMwsSettingsType | get_user_connections_user_connections_AramexSettingsType | get_user_connections_user_connections_AustraliaPostSettingsType | get_user_connections_user_connections_CanadaPostSettingsType | get_user_connections_user_connections_CanparSettingsType | get_user_connections_user_connections_ChronopostSettingsType | get_user_connections_user_connections_DHLExpressSettingsType | get_user_connections_user_connections_DHLPolandSettingsType | get_user_connections_user_connections_DHLUniversalSettingsType | get_user_connections_user_connections_DicomSettingsType | get_user_connections_user_connections_DPDHLSettingsType | get_user_connections_user_connections_EShipperSettingsType | get_user_connections_user_connections_EasyPostSettingsType | get_user_connections_user_connections_FedexSettingsType | get_user_connections_user_connections_FreightcomSettingsType | get_user_connections_user_connections_GenericSettingsType | get_user_connections_user_connections_PurolatorSettingsType | get_user_connections_user_connections_RoyalMailSettingsType | get_user_connections_user_connections_SendleSettingsType | get_user_connections_user_connections_SFExpressSettingsType | get_user_connections_user_connections_TNTSettingsType | get_user_connections_user_connections_UPSSettingsType | get_user_connections_user_connections_UPSFreightSettingsType | get_user_connections_user_connections_USPSSettingsType | get_user_connections_user_connections_USPSInternationalSettingsType | get_user_connections_user_connections_YanwenSettingsType | get_user_connections_user_connections_YunExpressSettingsType;

export interface get_user_connections {
  user_connections: get_user_connections_user_connections[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  email: string;
  full_name: string;
  is_staff: boolean;
  last_login: any | null;
  date_joined: any;
}

export interface GetUser {
  user: GetUser_user;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_user
// ====================================================

export interface update_user_update_user_user {
  full_name: string;
  is_staff: boolean;
  last_login: any | null;
  date_joined: any;
}

export interface update_user_update_user_errors {
  field: string;
  messages: string[];
}

export interface update_user_update_user {
  user: update_user_update_user_user | null;
  errors: update_user_update_user_errors[] | null;
}

export interface update_user {
  update_user: update_user_update_user;
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
  errors: change_password_change_password_errors[] | null;
}

export interface change_password {
  change_password: change_password_change_password;
}

export interface change_passwordVariables {
  data: ChangePasswordMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: register_user
// ====================================================

export interface register_user_register_user_user {
  email: string;
  is_staff: boolean;
  date_joined: any;
}

export interface register_user_register_user_errors {
  field: string;
  messages: string[];
}

export interface register_user_register_user {
  user: register_user_register_user_user | null;
  errors: register_user_register_user_errors[] | null;
}

export interface register_user {
  register_user: register_user_register_user;
}

export interface register_userVariables {
  data: RegisterUserMutationInput;
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
  confirm_email: confirm_email_confirm_email;
}

export interface confirm_emailVariables {
  data: ConfirmEmailMutationInput;
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
  errors: request_email_change_request_email_change_errors[] | null;
}

export interface request_email_change {
  request_email_change: request_email_change_request_email_change;
}

export interface request_email_changeVariables {
  data: RequestEmailChangeMutationInput;
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
  errors: confirm_email_change_confirm_email_change_errors[] | null;
}

export interface confirm_email_change {
  confirm_email_change: confirm_email_change_confirm_email_change;
}

export interface confirm_email_changeVariables {
  data: ConfirmEmailChangeMutationInput;
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
  errors: request_password_reset_request_password_reset_errors[] | null;
}

export interface request_password_reset {
  request_password_reset: request_password_reset_request_password_reset;
}

export interface request_password_resetVariables {
  data: RequestPasswordResetMutationInput;
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
  errors: confirm_password_reset_confirm_password_reset_errors[] | null;
}

export interface confirm_password_reset {
  confirm_password_reset: confirm_password_reset_confirm_password_reset;
}

export interface confirm_password_resetVariables {
  data: ConfirmPasswordResetMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_event
// ====================================================

export interface get_event_event {
  id: string;
  type: EventTypes | null;
  data: any | null;
  test_mode: boolean | null;
  pending_webhooks: number | null;
  created_at: any | null;
}

export interface get_event {
  event: get_event_event;
}

export interface get_eventVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_events
// ====================================================

export interface get_events_events_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface get_events_events_edges_node {
  id: string;
  type: EventTypes | null;
  data: any | null;
  test_mode: boolean | null;
  pending_webhooks: number | null;
  created_at: any | null;
}

export interface get_events_events_edges {
  node: get_events_events_edges_node;
}

export interface get_events_events {
  page_info: get_events_events_page_info;
  edges: get_events_events_edges[];
}

export interface get_events {
  events: get_events_events;
}

export interface get_eventsVariables {
  filter?: EventFilter | null;
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
  weight: number;
  description: string | null;
  quantity: number;
  unfulfilled_quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  currency: CurrencyCodeEnum;
}

export interface get_order_order_shipments_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_order_order_shipments_selected_rate_extra_charges[];
  test_mode: boolean;
  meta: any | null;
}

export interface get_order_order_shipments_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum;
}

export interface get_order_order_shipments_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_order_order_shipments_rates_extra_charges[];
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
  id: string;
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
  rates: get_order_order_shipments_rates[];
  metadata: any;
  meta: any | null;
  messages: get_order_order_shipments_messages[];
}

export interface get_order_order {
  id: string;
  order_id: string;
  source: string;
  status: OrderStatus;
  shipping_to: get_order_order_shipping_to;
  shipping_from: get_order_order_shipping_from | null;
  billing_address: get_order_order_billing_address | null;
  line_items: get_order_order_line_items[];
  created_at: any;
  updated_at: any;
  created_by: get_order_order_created_by;
  test_mode: boolean;
  options: any;
  metadata: any;
  shipments: get_order_order_shipments[];
}

export interface get_order {
  order: get_order_order;
}

export interface get_orderVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_orders
// ====================================================

export interface get_orders_orders_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
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
  weight: number;
  description: string | null;
  quantity: number;
  unfulfilled_quantity: number | null;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  weight_unit: WeightUnitEnum | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  weight: number;
  weight_unit: WeightUnitEnum | null;
  description: string | null;
  quantity: number;
  sku: string | null;
  hs_code: string | null;
  value_amount: number | null;
  value_currency: CurrencyCodeEnum | null;
  origin_country: CountryCodeEnum | null;
  metadata: any;
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
  currency: CurrencyCodeEnum;
}

export interface get_orders_orders_edges_node_shipments_selected_rate {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_orders_orders_edges_node_shipments_selected_rate_extra_charges[];
  test_mode: boolean;
  meta: any | null;
}

export interface get_orders_orders_edges_node_shipments_rates_extra_charges {
  name: string | null;
  amount: number | null;
  currency: CurrencyCodeEnum;
}

export interface get_orders_orders_edges_node_shipments_rates {
  id: string;
  carrier_name: string;
  carrier_id: string;
  currency: CurrencyCodeEnum;
  service: string;
  transit_days: number | null;
  total_charge: number;
  extra_charges: get_orders_orders_edges_node_shipments_rates_extra_charges[];
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
  id: string;
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
  rates: get_orders_orders_edges_node_shipments_rates[];
  metadata: any;
  meta: any | null;
  messages: get_orders_orders_edges_node_shipments_messages[];
}

export interface get_orders_orders_edges_node {
  id: string;
  order_id: string;
  source: string;
  status: OrderStatus;
  shipping_to: get_orders_orders_edges_node_shipping_to;
  shipping_from: get_orders_orders_edges_node_shipping_from | null;
  billing_address: get_orders_orders_edges_node_billing_address | null;
  line_items: get_orders_orders_edges_node_line_items[];
  created_at: any;
  updated_at: any;
  created_by: get_orders_orders_edges_node_created_by;
  test_mode: boolean;
  options: any;
  metadata: any;
  shipments: get_orders_orders_edges_node_shipments[];
}

export interface get_orders_orders_edges {
  node: get_orders_orders_edges_node;
}

export interface get_orders_orders {
  page_info: get_orders_orders_page_info;
  edges: get_orders_orders_edges[];
}

export interface get_orders {
  orders: get_orders_orders;
}

export interface get_ordersVariables {
  filter?: OrderFilter | null;
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
  id: string;
  metadata: any;
  errors: mutate_metadata_mutate_metadata_errors[] | null;
}

export interface mutate_metadata {
  mutate_metadata: mutate_metadata_mutate_metadata;
}

export interface mutate_metadataVariables {
  data: MetadataMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_document_template
// ====================================================

export interface get_document_template_document_template {
  id: string;
  slug: string;
  name: string;
  template: string;
  description: string | null;
  related_object: TemplateRelatedObject | null;
}

export interface get_document_template {
  document_template: get_document_template_document_template;
}

export interface get_document_templateVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: get_document_templates
// ====================================================

export interface get_document_templates_document_templates_page_info {
  has_next_page: boolean;
  has_previous_page: boolean;
  start_cursor: string | null;
  end_cursor: string | null;
}

export interface get_document_templates_document_templates_edges_node {
  id: string;
  slug: string;
  name: string;
  template: string;
  description: string | null;
  related_object: TemplateRelatedObject | null;
}

export interface get_document_templates_document_templates_edges {
  node: get_document_templates_document_templates_edges_node;
}

export interface get_document_templates_document_templates {
  page_info: get_document_templates_document_templates_page_info;
  edges: get_document_templates_document_templates_edges[];
}

export interface get_document_templates {
  document_templates: get_document_templates_document_templates;
}

export interface get_document_templatesVariables {
  filter?: DocumentTemplateFilter | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: create_document_template
// ====================================================

export interface create_document_template_create_document_template_template {
  id: string;
}

export interface create_document_template_create_document_template_errors {
  field: string;
  messages: string[];
}

export interface create_document_template_create_document_template {
  template: create_document_template_create_document_template_template | null;
  errors: create_document_template_create_document_template_errors[] | null;
}

export interface create_document_template {
  create_document_template: create_document_template_create_document_template;
}

export interface create_document_templateVariables {
  data: CreateDocumentTemplateMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update_document_template
// ====================================================

export interface update_document_template_update_document_template_template {
  id: string;
}

export interface update_document_template_update_document_template_errors {
  field: string;
  messages: string[];
}

export interface update_document_template_update_document_template {
  template: update_document_template_update_document_template_template | null;
  errors: update_document_template_update_document_template_errors[] | null;
}

export interface update_document_template {
  update_document_template: update_document_template_update_document_template;
}

export interface update_document_templateVariables {
  data: UpdateDocumentTemplateMutationInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: delete_document_template
// ====================================================

export interface delete_document_template_delete_document_template {
  id: string;
}

export interface delete_document_template {
  delete_document_template: delete_document_template_delete_document_template;
}

export interface delete_document_templateVariables {
  data: DeleteMutationInput;
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
  id: string;
  status: ShipmentStatusEnum;
  tracking_number: string | null;
  recipient: search_data_shipment_results_edges_node_recipient;
  created_at: any;
}

export interface search_data_shipment_results_edges {
  node: search_data_shipment_results_edges_node;
}

export interface search_data_shipment_results {
  edges: search_data_shipment_results_edges[];
}

export interface search_data_order_results_edges_node_shipping_to {
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

export interface search_data_order_results_edges_node {
  id: string;
  status: OrderStatus;
  order_id: string;
  shipping_to: search_data_order_results_edges_node_shipping_to;
  created_at: any;
}

export interface search_data_order_results_edges {
  node: search_data_order_results_edges_node;
}

export interface search_data_order_results {
  edges: search_data_order_results_edges[];
}

export interface search_data_trackers_results_edges_node {
  id: string;
  status: TrackerStatusEnum;
  tracking_number: string;
  created_at: any;
}

export interface search_data_trackers_results_edges {
  node: search_data_trackers_results_edges_node;
}

export interface search_data_trackers_results {
  edges: search_data_trackers_results_edges[];
}

export interface search_data {
  shipment_results: search_data_shipment_results;
  order_results: search_data_order_results;
  trackers_results: search_data_trackers_results;
}

export interface search_dataVariables {
  keyword?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export enum CustomsContentTypeEnum {
  documents = "documents",
  gift = "gift",
  merchandise = "merchandise",
  other = "other",
  return_merchandise = "return_merchandise",
  sample = "sample",
}

export enum PaidByEnum {
  recipient = "recipient",
  sender = "sender",
  third_party = "third_party",
}

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

export enum DimensionUnitEnum {
  CM = "CM",
  IN = "IN",
}

export enum WeightUnitEnum {
  KG = "KG",
  LB = "LB",
}

export enum LabelTemplateTypeEnum {
  SVG = "SVG",
  ZPL = "ZPL",
}

export enum UserRole {
  admin = "admin",
  developer = "developer",
  member = "member",
}

export enum ShipmentStatusEnum {
  cancelled = "cancelled",
  delivered = "delivered",
  draft = "draft",
  in_transit = "in_transit",
  purchased = "purchased",
  shipped = "shipped",
}

export enum LabelTypeEnum {
  PDF = "PDF",
  PNG = "PNG",
  ZPL = "ZPL",
}

export enum ManualShipmentStatusEnum {
  delivered = "delivered",
  in_transit = "in_transit",
}

export enum TrackerStatusEnum {
  delivered = "delivered",
  in_transit = "in_transit",
  incident = "incident",
  pending = "pending",
  unknown = "unknown",
}

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

export enum OrderStatus {
  cancelled = "cancelled",
  delivered = "delivered",
  fulfilled = "fulfilled",
  partial = "partial",
  unfulfilled = "unfulfilled",
}

export enum MetadataObjectTypeEnum {
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
export interface AddressFilter {
  offset?: number | null;
  first?: number | null;
  label?: string | null;
  address?: string | null;
}

// null
export interface TemplateFilter {
  offset?: number | null;
  first?: number | null;
  label?: string | null;
}

// null
export interface CreateCarrierConnectionMutationInput {
  amazon_mws?: AmazonMwsSettingsInput | null;
  aramex?: AramexSettingsInput | null;
  australiapost?: AustraliaPostSettingsInput | null;
  canadapost?: CanadaPostSettingsInput | null;
  canpar?: CanparSettingsInput | null;
  chronopost?: ChronopostSettingsInput | null;
  dhl_express?: DHLExpressSettingsInput | null;
  dhl_poland?: DHLPolandSettingsInput | null;
  dhl_universal?: DHLUniversalSettingsInput | null;
  dicom?: DicomSettingsInput | null;
  dpdhl?: DPDHLSettingsInput | null;
  easypost?: EasyPostSettingsInput | null;
  eshipper?: EShipperSettingsInput | null;
  fedex?: FedexSettingsInput | null;
  freightcom?: FreightcomSettingsInput | null;
  generic?: GenericSettingsInput | null;
  purolator?: PurolatorSettingsInput | null;
  royalmail?: RoyalMailSettingsInput | null;
  sendle?: SendleSettingsInput | null;
  sf_express?: SFExpressSettingsInput | null;
  tnt?: TNTSettingsInput | null;
  ups?: UPSSettingsInput | null;
  ups_freight?: UPSFreightSettingsInput | null;
  usps?: USPSSettingsInput | null;
  usps_international?: USPSInternationalSettingsInput | null;
  yanwen?: YanwenSettingsInput | null;
  yunexpress?: YunExpressSettingsInput | null;
}

// null
export interface AmazonMwsSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  seller_id: string;
  developer_id: string;
  mws_auth_token: string;
  x_amz_access_token: string;
  aws_region: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface AramexSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_pin: string;
  account_entity: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface AustraliaPostSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  api_key: string;
  password: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface CanadaPostSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  customer_number: string;
  contract_id: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface CanparSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface ChronopostSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  account_number: string;
  password: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface DHLExpressSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  site_id: string;
  password: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface DHLPolandSettingsInput {
  services?: CreateServiceLevelInput[] | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface CreateServiceLevelInput {
  service_name: string;
  service_code: string;
  cost: number;
  currency: CurrencyCodeEnum;
  description?: string | null;
  active?: boolean | null;
  estimated_transit_days?: number | null;
  max_weight?: number | null;
  max_width?: number | null;
  max_height?: number | null;
  max_length?: number | null;
  weight_unit?: WeightUnitEnum | null;
  dimension_unit?: DimensionUnitEnum | null;
  domicile?: boolean | null;
  international?: boolean | null;
}

// null
export interface DHLUniversalSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  consumer_key: string;
  consumer_secret: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface DicomSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  billing_account: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface DPDHLSettingsInput {
  services?: CreateServiceLevelInput[] | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  signature: string;
  app_id: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface EasyPostSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  api_key: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface EShipperSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface FedexSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  password: string;
  meter_number: string;
  account_number: string;
  user_key: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface FreightcomSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface GenericSettingsInput {
  account_country_code?: string | null;
  label_template?: LabelTemplateInput | null;
  services?: CreateServiceLevelInput[] | null;
  active?: boolean | null;
  metadata?: any | null;
  display_name: string;
  custom_carrier_name: string;
  test_mode?: boolean | null;
  carrier_id: string;
  account_number?: string | null;
}

// null
export interface LabelTemplateInput {
  slug: string;
  template: string;
  template_type: LabelTemplateTypeEnum;
  width?: number | null;
  height?: number | null;
  shipment_sample?: any | null;
  id?: string | null;
}

// null
export interface PurolatorSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_number: string;
  user_token?: string | null;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface RoyalMailSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  client_id: string;
  client_secret: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface SendleSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  sendle_id: string;
  api_key: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface SFExpressSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  partner_id: string;
  check_word: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface TNTSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface UPSSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface UPSFreightSettingsInput {
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  access_license_number: string;
  account_number: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface USPSSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface USPSInternationalSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  username: string;
  password: string;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface YanwenSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  customer_number: string;
  license_key: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface YunExpressSettingsInput {
  active?: boolean | null;
  metadata?: any | null;
  customer_number: string;
  api_secret: string;
  test_mode?: boolean | null;
  carrier_id: string;
}

// null
export interface UpdateCarrierConnectionMutationInput {
  amazon_mws?: UpdateAmazonMwsSettingsInput | null;
  aramex?: UpdateAramexSettingsInput | null;
  australiapost?: UpdateAustraliaPostSettingsInput | null;
  canadapost?: UpdateCanadaPostSettingsInput | null;
  canpar?: UpdateCanparSettingsInput | null;
  chronopost?: UpdateChronopostSettingsInput | null;
  dhl_express?: UpdateDHLExpressSettingsInput | null;
  dhl_poland?: UpdateDHLPolandSettingsInput | null;
  dhl_universal?: UpdateDHLUniversalSettingsInput | null;
  dicom?: UpdateDicomSettingsInput | null;
  dpdhl?: UpdateDPDHLSettingsInput | null;
  easypost?: UpdateEasyPostSettingsInput | null;
  eshipper?: UpdateEShipperSettingsInput | null;
  fedex?: UpdateFedexSettingsInput | null;
  freightcom?: UpdateFreightcomSettingsInput | null;
  generic?: UpdateGenericSettingsInput | null;
  purolator?: UpdatePurolatorSettingsInput | null;
  royalmail?: UpdateRoyalMailSettingsInput | null;
  sendle?: UpdateSendleSettingsInput | null;
  sf_express?: UpdateSFExpressSettingsInput | null;
  tnt?: UpdateTNTSettingsInput | null;
  ups?: UpdateUPSSettingsInput | null;
  ups_freight?: UpdateUPSFreightSettingsInput | null;
  usps?: UpdateUSPSSettingsInput | null;
  usps_international?: UpdateUSPSInternationalSettingsInput | null;
  yanwen?: UpdateYanwenSettingsInput | null;
  yunexpress?: UpdateYunExpressSettingsInput | null;
}

// null
export interface UpdateAmazonMwsSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  seller_id?: string | null;
  developer_id?: string | null;
  mws_auth_token?: string | null;
  x_amz_access_token?: string | null;
  aws_region?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateAramexSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_pin?: string | null;
  account_entity?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateAustraliaPostSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  api_key?: string | null;
  password?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateCanadaPostSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  customer_number?: string | null;
  contract_id?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateCanparSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateChronopostSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  account_number?: string | null;
  password?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateDHLExpressSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  site_id?: string | null;
  password?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateDHLPolandSettingsInput {
  id: string;
  services?: UpdateServiceLevelInput[] | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateServiceLevelInput {
  service_name?: string | null;
  service_code?: string | null;
  cost?: number | null;
  currency?: CurrencyCodeEnum | null;
  description?: string | null;
  active?: boolean | null;
  estimated_transit_days?: number | null;
  max_weight?: number | null;
  max_width?: number | null;
  max_height?: number | null;
  max_length?: number | null;
  weight_unit?: WeightUnitEnum | null;
  dimension_unit?: DimensionUnitEnum | null;
  domicile?: boolean | null;
  international?: boolean | null;
  id?: string | null;
}

// null
export interface UpdateDHLUniversalSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  consumer_key?: string | null;
  consumer_secret?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateDicomSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  billing_account?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateDPDHLSettingsInput {
  id: string;
  services?: UpdateServiceLevelInput[] | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  signature?: string | null;
  app_id?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateEasyPostSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  api_key?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateEShipperSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateFedexSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  password?: string | null;
  meter_number?: string | null;
  account_number?: string | null;
  user_key?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateFreightcomSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateGenericSettingsInput {
  id: string;
  account_country_code?: string | null;
  label_template?: LabelTemplateInput | null;
  services?: UpdateServiceLevelInput[] | null;
  active?: boolean | null;
  metadata?: any | null;
  display_name?: string | null;
  custom_carrier_name?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
  account_number?: string | null;
}

// null
export interface UpdatePurolatorSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
  user_token?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateRoyalMailSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  client_id?: string | null;
  client_secret?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateSendleSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  sendle_id?: string | null;
  api_key?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateSFExpressSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  partner_id?: string | null;
  check_word?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateTNTSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateUPSSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  access_license_number?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateUPSFreightSettingsInput {
  id: string;
  account_country_code?: string | null;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  access_license_number?: string | null;
  account_number?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateUSPSSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateUSPSInternationalSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  username?: string | null;
  password?: string | null;
  mailer_id?: string | null;
  customer_registration_id?: string | null;
  logistics_manager_mailer_id?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateYanwenSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  customer_number?: string | null;
  license_key?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface UpdateYunExpressSettingsInput {
  id: string;
  active?: boolean | null;
  metadata?: any | null;
  customer_number?: string | null;
  api_secret?: string | null;
  test_mode?: boolean | null;
  carrier_id?: string | null;
}

// null
export interface DeleteMutationInput {
  id: string;
}

// null
export interface DeleteOrganizationMutationInput {
  id: string;
  password: string;
}

// null
export interface CreateOrganizationMutationInput {
  name: string;
}

// null
export interface UpdateOrganizationMutationInput {
  id: string;
  name?: string | null;
}

// null
export interface ChangeOrganizationOwnerMutationInput {
  org_id: string;
  email: string;
  password: string;
}

// null
export interface SetOrganizationUserRolesMutationInput {
  org_id: string;
  user_id: string;
  roles: UserRole[];
}

// null
export interface SendOrganizationInvitesMutationInput {
  org_id: string;
  emails: string[];
  redirect_url: string;
}

// null
export interface AcceptOrganizationInvitationMutationInput {
  guid: string;
}

// null
export interface LogFilter {
  offset?: number | null;
  first?: number | null;
  api_endpoint?: string | null;
  date_after?: any | null;
  date_before?: any | null;
  entity_id?: string | null;
  method?: string[] | null;
  status?: string | null;
  status_code?: number[] | null;
}

// null
export interface ShipmentFilter {
  offset?: number | null;
  first?: number | null;
  keyword?: string | null;
  address?: string | null;
  created_after?: any | null;
  created_before?: any | null;
  carrier_name?: string[] | null;
  reference?: string | null;
  service?: string[] | null;
  status?: ShipmentStatusEnum[] | null;
  option_key?: string[] | null;
  option_value?: string | null;
  metadata_key?: string[] | null;
  metadata_value?: string | null;
  test_mode?: boolean | null;
}

// null
export interface PartialShipmentMutationInput {
  id: string;
  recipient?: UpdateAddressInput | null;
  shipper?: UpdateAddressInput | null;
  customs?: UpdateCustomsInput | null;
  parcels?: UpdateParcelInput[] | null;
  payment?: PaymentInput | null;
  billing_address?: UpdateAddressInput | null;
  options?: any | null;
  metadata?: any | null;
  reference?: string | null;
}

// null
export interface UpdateAddressInput {
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
  id?: string | null;
}

// null
export interface UpdateCustomsInput {
  commodities: UpdateCommodityInput[];
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: CustomsContentTypeEnum | null;
  content_description?: string | null;
  incoterm?: IncotermCodeEnum | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: UpdateDutyInput | null;
  duty_billing_address?: UpdateAddressInput | null;
  options?: any | null;
  id?: string | null;
}

// null
export interface UpdateCommodityInput {
  weight?: number | null;
  weight_unit?: WeightUnitEnum | null;
  sku?: string | null;
  quantity?: number | null;
  description?: string | null;
  value_amount?: number | null;
  origin_country?: CountryCodeEnum | null;
  value_currency?: CurrencyCodeEnum | null;
  metadata?: any | null;
  parent_id?: string | null;
  id?: string | null;
}

// null
export interface UpdateDutyInput {
  paid_by?: PaidByEnum | null;
  currency?: CurrencyCodeEnum | null;
  account_number?: string | null;
  declared_value?: number | null;
  bill_to?: AddressInput | null;
}

// null
export interface AddressInput {
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
export interface UpdateParcelInput {
  weight?: number | null;
  weight_unit?: WeightUnitEnum | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
  dimension_unit?: DimensionUnitEnum | null;
  reference_number?: string | null;
  freight_class?: string | null;
  items?: CommodityInput[] | null;
  id?: string | null;
}

// null
export interface CommodityInput {
  weight: number;
  weight_unit: WeightUnitEnum;
  sku?: string | null;
  quantity?: number | null;
  description?: string | null;
  value_amount?: number | null;
  origin_country?: CountryCodeEnum | null;
  value_currency?: CurrencyCodeEnum | null;
  metadata?: any | null;
  parent_id?: string | null;
}

// null
export interface PaymentInput {
  account_number?: string | null;
  paid_by?: PaidByEnum | null;
  currency?: CurrencyCodeEnum | null;
}

// null
export interface ChangeShipmentStatusMutationInput {
  id: string;
  status?: ManualShipmentStatusEnum | null;
}

// null
export interface TrackerFilter {
  offset?: number | null;
  first?: number | null;
  tracking_number?: string | null;
  created_after?: any | null;
  created_before?: any | null;
  carrier_name?: string[] | null;
  status?: string[] | null;
  test_mode?: boolean | null;
}

// null
export interface WebhookFilter {
  offset?: number | null;
  first?: number | null;
  url?: string | null;
  disabled?: boolean | null;
  test_mode?: boolean | null;
  events?: EventTypes[] | null;
  date_after?: any | null;
  date_before?: any | null;
}

// null
export interface SystemCarrierMutationInput {
  id: string;
  enable: boolean;
}

// null
export interface CreateCustomsTemplateInput {
  label: string;
  customs: CustomsInput;
  is_default?: boolean | null;
}

// null
export interface CustomsInput {
  commodities: CommodityInput[];
  certify?: boolean | null;
  commercial_invoice?: boolean | null;
  content_type?: CustomsContentTypeEnum | null;
  content_description?: string | null;
  incoterm?: IncotermCodeEnum | null;
  invoice?: string | null;
  invoice_date?: any | null;
  signer?: string | null;
  duty?: DutyInput | null;
  duty_billing_address?: UpdateAddressInput | null;
  options?: any | null;
}

// null
export interface DutyInput {
  paid_by: PaidByEnum;
  currency?: CurrencyCodeEnum | null;
  account_number?: string | null;
  declared_value?: number | null;
  bill_to?: AddressInput | null;
}

// null
export interface UpdateCustomsTemplateInput {
  label?: string | null;
  customs?: UpdateCustomsInput | null;
  is_default?: boolean | null;
  id: string;
}

// null
export interface CreateParcelTemplateInput {
  label: string;
  parcel: ParcelInput;
  is_default?: boolean | null;
}

// null
export interface ParcelInput {
  weight: number;
  weight_unit: WeightUnitEnum;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  packaging_type?: string | null;
  package_preset?: string | null;
  description?: string | null;
  content?: string | null;
  is_document?: boolean | null;
  dimension_unit?: DimensionUnitEnum | null;
  reference_number?: string | null;
  freight_class?: string | null;
  items?: CommodityInput[] | null;
}

// null
export interface UpdateParcelTemplateInput {
  label?: string | null;
  parcel?: UpdateParcelInput | null;
  is_default?: boolean | null;
  id: string;
}

// null
export interface CreateAddressTemplateInput {
  label: string;
  address: AddressInput;
  is_default?: boolean | null;
}

// null
export interface UpdateAddressTemplateInput {
  label?: string | null;
  address?: UpdateAddressInput | null;
  is_default?: boolean | null;
  id: string;
}

// null
export interface TokenMutationInput {
  password?: string | null;
  refresh?: boolean | null;
}

// null
export interface UpdateUserInput {
  full_name?: string | null;
  is_active?: boolean | null;
}

// null
export interface ChangePasswordMutationInput {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

// null
export interface RegisterUserMutationInput {
  email: string;
  password1: string;
  password2: string;
  redirect_url: string;
  full_name?: string | null;
}

// null
export interface ConfirmEmailMutationInput {
  token: string;
}

// null
export interface RequestEmailChangeMutationInput {
  email: string;
  password: string;
  redirect_url: string;
}

// null
export interface ConfirmEmailChangeMutationInput {
  token: string;
}

// null
export interface RequestPasswordResetMutationInput {
  email: string;
  redirect_url: string;
}

// null
export interface ConfirmPasswordResetMutationInput {
  uuid: string;
  token: string;
  new_password1: string;
  new_password2: string;
}

// null
export interface EventFilter {
  offset?: number | null;
  first?: number | null;
  entity_id?: string | null;
  type?: EventTypes[] | null;
  date_after?: any | null;
  date_before?: any | null;
}

// null
export interface OrderFilter {
  offset?: number | null;
  first?: number | null;
  id?: string[] | null;
  keyword?: string | null;
  source?: string[] | null;
  order_id?: string[] | null;
  ontion_key?: string[] | null;
  address?: string[] | null;
  ontion_value?: string[] | null;
  metadata_key?: string[] | null;
  metadata_value?: string[] | null;
  status?: OrderStatus[] | null;
}

// null
export interface MetadataMutationInput {
  id: string;
  object_type: MetadataObjectTypeEnum;
  added_values: any;
  discarded_keys?: string[] | null;
}

// null
export interface DocumentTemplateFilter {
  offset?: number | null;
  first?: number | null;
  name?: string | null;
  related_object?: TemplateRelatedObject | null;
}

// null
export interface CreateDocumentTemplateMutationInput {
  slug: string;
  name: string;
  template: string;
  related_object: TemplateRelatedObject;
  active?: boolean | null;
  description?: string | null;
}

// null
export interface UpdateDocumentTemplateMutationInput {
  id: string;
  slug?: string | null;
  name?: string | null;
  template?: string | null;
  active?: boolean | null;
  description?: string | null;
  related_object?: TemplateRelatedObject | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================