import { gql } from "@apollo/client";


export const GET_ADDRESS_TEMPLATES = gql`query get_address_templates($filter: AddressFilter) {
  address_templates(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        is_default
        label
        address {
          company_name
          person_name
          address_line1
          address_line2
          postal_code
          residential
          city
          state_code
          country_code
          email
          phone_number
          federal_tax_id
          state_tax_id
          validate_location
        }
      }
    }
  }
}
`;

export const GET_CUSTOMS_TEMPLATES = gql`query get_customs_info_templates($filter: TemplateFilter) {
  customs_templates(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        label
        is_default
        customs {
          incoterm
          content_type
          commercial_invoice
          content_description
          duty {
            paid_by
            currency
            account_number
            declared_value
          }
          invoice
          invoice_date
          signer
          certify
          options
        }
      }
    }
  }
}
`;

export const GET_DEFAULT_TEMPLATES = gql`query get_default_templates {
  default_templates {
    default_address {
      id
      is_default
      label
      address {
        company_name
        person_name
        address_line1
        address_line2
        postal_code
        residential
        city
        state_code
        country_code
        email
        phone_number
        federal_tax_id
        state_tax_id
        validate_location
      }
    }
    default_customs {
      id
      label
      is_default
      customs {
        incoterm
        content_type
        commercial_invoice
        content_description
        duty {
          paid_by
          currency
          account_number
          declared_value
        }
        invoice
        invoice_date
        signer
        certify
        options
      }
    }
    default_parcel {
      id
      is_default
      label
      parcel {
        width
        height
        length
        dimension_unit
        weight
        weight_unit
        packaging_type
        package_preset
        is_document
      }
    }
  }
}
`;

export const CREATE_CARRIER_CONNECTION = gql`mutation create_connection($data: CreateCarrierConnectionMutationInput!) {
  create_carrier_connection(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const UPDATE_CARRIER_CONNECTION = gql`mutation update_connection($data: UpdateCarrierConnectionMutationInput!) {
  update_carrier_connection(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const DELETE_CARRIER_CONNECTION = gql`mutation delete_connection($data: DeleteMutationInput!) {
  delete_carrier_connection(input: $data) {
    id
  }
}
`;

export const GET_ORGANIZATION = gql`query get_organization($id: String!) {
  organization(id: $id) {
    id
    name
    slug
    token
    current_user {
      email
      full_name
      is_admin
      is_owner
      last_login
    }
    members {
      email
      full_name
      is_admin
      is_owner
      invitation {
        id
        guid
        invitee_identifier
        created
        modified
      }
      last_login
    }
  }
}
`;

export const GET_ORGANIZATIONS = gql`query get_organizations {
  organizations {
    id
    name
    slug
    token
    current_user {
      email
      full_name
      is_admin
      is_owner
      last_login
    }
    members {
      email
      full_name
      is_admin
      is_owner
      invitation {
        id
        guid
        invitee_identifier
        created
        modified
      }
      last_login
    }
  }
}
`;

export const DELETE_ORGANIZATION = gql`mutation delete_organization($data: DeleteOrganizationMutationInput!) {
  delete_organization(input: $data) {
    organization {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const CREATE_ORGANIZATION = gql`mutation create_organization($data: CreateOrganizationMutationInput!) {
  create_organization(input: $data) {
    organization {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const UPDATE_ORGANIZATION = gql`mutation update_organization($data: UpdateOrganizationMutationInput!) {
  update_organization(input: $data) {
    organization {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const CHANGE_ORGANIZATION_OWNER = gql`mutation change_organization_owner($data: ChangeOrganizationOwnerMutationInput!) {
  change_organization_owner(input: $data) {
    organization {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const SET_ORGANIZATION_USER_ROLES = gql`mutation set_organization_user_roles($data: SetOrganizationUserRolesMutationInput!) {
  set_organization_user_roles(input: $data) {
    organization {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const SEND_ORGANIZATION_INVITES = gql`mutation send_organization_invites($data: SendOrganizationInvitesMutationInput!) {
  send_organization_invites(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const GET_ORGANIZATION_INVITATION = gql`query get_organization_invitation($guid: String!) {
  organization_invitation(guid: $guid) {
    invitee_identifier
    organization_name
    invitee {
      email
    }
  }
}
`;

export const ACCEPT_ORGANIZATION_INVITATION = gql`mutation accept_organization_invitation($data: AcceptOrganizationInvitationMutationInput!) {
  accept_organization_invitation(input: $data) {
    organization {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const DELETE_ORGANIZATION_INVITES = gql`mutation delete_organization_invitation($data: DeleteMutationInput!) {
  delete_organization_invitation(input: $data) {
    id
  }
}
`;

export const GET_LOG = gql`query get_log($id: Int!) {
  log(id: $id) {
    id
    requested_at
    response_ms
    path
    remote_addr
    host
    method
    query_params
    data
    response
    status_code
  }
}
`;

export const GET_LOGS = gql`query get_logs($filter: LogFilter) {
  logs(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        path
        data
        method
        response_ms
        remote_addr
        requested_at
        status_code
        query_params
        host
        response
      }
    }
  }
}
`;

export const GET_SHIPMENT = gql`query get_shipment($id: String!) {
  shipment(id: $id) {
    id
    carrier_id
    carrier_name
    created_at
    updated_at
    created_by {
      email
      full_name
    }
    status
    recipient {
      id
      postal_code
      city
      person_name
      company_name
      country_code
      email
      phone_number
      state_code
      suburb
      residential
      address_line1
      address_line2
      federal_tax_id
      state_tax_id
      validate_location
    }
    shipper {
      id
      postal_code
      city
      person_name
      company_name
      country_code
      email
      phone_number
      state_code
      suburb
      residential
      address_line1
      address_line2
      federal_tax_id
      state_tax_id
      validate_location
    }
    parcels {
      id
      width
      height
      length
      is_document
      dimension_unit
      weight
      weight_unit
      packaging_type
      package_preset
      freight_class
      reference_number
      items {
        id
        weight
        description
        quantity
        sku
        hs_code
        value_amount
        weight_unit
        value_currency
        origin_country
        metadata
        parent_id
      }
    }
    label_type
    tracking_number
    shipment_identifier
    label_url
    invoice_url
    tracking_url
    tracker_id
    test_mode
    service
    reference
    customs {
      id
      certify
      commercial_invoice
      content_type
      content_description
      incoterm
      invoice
      invoice_date
      signer
      duty {
        paid_by
        currency
        account_number
        declared_value
      }
      options
      commodities {
        id
        weight
        weight_unit
        description
        quantity
        sku
        hs_code
        value_amount
        value_currency
        origin_country
        metadata
        parent_id
      }
    }
    payment {
      paid_by
      currency
      account_number
    }
    selected_rate_id
    selected_rate {
      id
      carrier_name
      carrier_id
      currency
      service
      transit_days
      total_charge
      extra_charges {
        name
        amount
        currency
      }
      test_mode
      meta
    }
    carrier_ids
    rates {
      id
      carrier_name
      carrier_id
      currency
      service
      transit_days
      total_charge
      extra_charges {
        name
        amount
        currency
      }
      test_mode
      meta
    }
    options
    metadata
    meta
    messages {
      carrier_name
      carrier_id
      message
      code
      details
    }
  }
}
`;

export const GET_SHIPMENTS = gql`query get_shipments($filter: ShipmentFilter) {
  shipments(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        carrier_id
        carrier_name
        created_at
        updated_at
        created_by {
          email
          full_name
        }
        status
        recipient {
          id
          postal_code
          city
          person_name
          company_name
          country_code
          email
          phone_number
          state_code
          suburb
          residential
          address_line1
          address_line2
          federal_tax_id
          state_tax_id
          validate_location
        }
        shipper {
          id
          postal_code
          city
          person_name
          company_name
          country_code
          email
          phone_number
          state_code
          suburb
          residential
          address_line1
          address_line2
          federal_tax_id
          state_tax_id
          validate_location
        }
        parcels {
          id
          width
          height
          length
          is_document
          dimension_unit
          weight
          weight_unit
          packaging_type
          package_preset
          freight_class
          reference_number
          items {
            id
            weight
            description
            quantity
            sku
            hs_code
            value_amount
            weight_unit
            value_currency
            origin_country
            metadata
            parent_id
          }
        }
        label_type
        tracking_number
        shipment_identifier
        label_url
        invoice_url
        tracking_url
        tracker_id
        test_mode
        service
        reference
        customs {
          id
          certify
          commercial_invoice
          content_type
          content_description
          incoterm
          invoice
          invoice_date
          signer
          duty {
            paid_by
            currency
            account_number
            declared_value
          }
          options
          commodities {
            id
            weight
            weight_unit
            description
            quantity
            sku
            hs_code
            value_amount
            value_currency
            origin_country
            metadata
            parent_id
          }
        }
        payment {
          paid_by
          currency
          account_number
        }
        selected_rate_id
        selected_rate {
          id
          carrier_name
          carrier_id
          currency
          service
          transit_days
          total_charge
          extra_charges {
            name
            amount
            currency
          }
          test_mode
          meta
        }
        carrier_ids
        rates {
          id
          carrier_name
          carrier_id
          currency
          service
          transit_days
          total_charge
          extra_charges {
            name
            amount
            currency
          }
          test_mode
          meta
        }
        options
        metadata
        meta
        messages {
          carrier_name
          carrier_id
          message
          code
          details
        }
      }
    }
  }
}
`;

export const PARTIAL_UPDATE_SHIPMENT = gql`mutation partial_shipment_update($data: PartialShipmentMutationInput!) {
  partial_shipment_update(input: $data) {
    shipment {
      id
      carrier_id
      carrier_name
      created_by {
        email
        full_name
      }
      status
      recipient {
        id
        postal_code
        city
        person_name
        company_name
        country_code
        email
        phone_number
        state_code
        suburb
        residential
        address_line1
        address_line2
        federal_tax_id
        state_tax_id
        validate_location
      }
      shipper {
        id
        postal_code
        city
        person_name
        company_name
        country_code
        email
        phone_number
        state_code
        suburb
        residential
        address_line1
        address_line2
        federal_tax_id
        state_tax_id
        validate_location
      }
      parcels {
        id
        width
        height
        length
        is_document
        dimension_unit
        weight
        weight_unit
        packaging_type
        package_preset
        freight_class
        reference_number
        items {
          id
          weight
          description
          quantity
          sku
          hs_code
          value_amount
          weight_unit
          value_currency
          origin_country
          metadata
          parent_id
        }
      }
      label_type
      tracking_number
      shipment_identifier
      label_url
      invoice_url
      tracking_url
      tracker_id
      test_mode
      service
      reference
      customs {
        id
        certify
        commercial_invoice
        content_type
        content_description
        incoterm
        invoice
        invoice_date
        signer
        duty {
          paid_by
          currency
          account_number
          declared_value
        }
        options
        commodities {
          id
          weight
          weight_unit
          description
          quantity
          sku
          hs_code
          value_amount
          value_currency
          origin_country
          metadata
          parent_id
          parent {
            id
            weight
            weight_unit
            description
            quantity
            sku
            hs_code
            value_amount
            value_currency
            origin_country
            metadata
          }
        }
      }
      payment {
        paid_by
        currency
        account_number
      }
      selected_rate_id
      selected_rate {
        id
        carrier_name
        carrier_id
        currency
        service
        transit_days
        total_charge
        extra_charges {
          name
          amount
          currency
        }
        test_mode
        meta
      }
      carrier_ids
      rates {
        id
        carrier_name
        carrier_id
        currency
        service
        transit_days
        total_charge
        extra_charges {
          name
          amount
          currency
        }
        test_mode
        meta
      }
      options
      metadata
      meta
      messages {
        carrier_name
        carrier_id
        message
        code
        details
      }
    }
    errors {
      field
      messages
    }
  }
}
`;

export const CHANGE_SHIPMENT_STATUS = gql`mutation change_shipment_status($data: ChangeShipmentStatusMutationInput!) {
  change_shipment_status(input: $data) {
    shipment {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const GET_TRACKER = gql`query get_tracker($id: String!) {
  tracker(id: $id) {
    id
    tracking_number
    carrier_id
    carrier_name
    status
    events {
      description
      location
      code
      date
      time
    }
    delivered
    estimated_delivery
    meta
    metadata
    messages {
      carrier_name
      carrier_id
      message
      code
      details
    }
    created_at
    updated_at
    created_by {
      email
      full_name
    }
    test_mode
    shipment {
      id
      service
      shipper {
        city
        country_code
      }
      recipient {
        city
        country_code
      }
      meta
      reference
    }
  }
}

`;

export const GET_TRACKERS = gql`query get_trackers($filter: TrackerFilter) {
  trackers(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        created_at
        updated_at
        created_by {
          email
          full_name
        }
        status
        tracking_number
        events {
          description
          location
          code
          date
          time
        }
        delivered
        estimated_delivery
        test_mode
        messages {
          carrier_name
          carrier_id
          message
          code
          details
        }
        carrier_id
        carrier_name
        meta
        metadata
        shipment {
          id
          service
          shipper {
            city
            country_code
          }
          recipient {
            city
            country_code
          }
          meta
          reference
        }
      }
    }
  }
}
`;

export const GET_WEBHOOK = gql`query get_webhook($id: String!) {
  webhook(id: $id) {
    id
    created_by {
      email
      full_name
    }
    enabled_events
    url
    test_mode
    disabled
    description
    last_event_at
    secret
  }
}
`;

export const GET_WEBHOOKS = gql`query get_webhooks($filter: WebhookFilter) {
  webhooks(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        created_at
        updated_at
        created_by {
          email
          full_name
        }
        enabled_events
        url
        test_mode
        disabled
        description
        last_event_at
        secret
      }
    }
  }
}
`;

export const GET_PARCEL_TEMPLATES = gql`query get_parcel_templates($filter: TemplateFilter) {
  parcel_templates(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        is_default
        label
        parcel {
          width
          height
          length
          dimension_unit
          weight
          weight_unit
          packaging_type
          package_preset
          is_document
        }
      }
    }
  }
}
`;

export const GET_SYSTEM_CONNECTIONS = gql`query get_system_connections {
  system_connections {
    id
    carrier_id
    test_mode
    active
    capabilities
    carrier_name
    display_name
    enabled
  }
}
`;

export const MUTATE_SYSTEM_CONNECTION = gql`mutation mutate_system_connection($data: SystemCarrierMutationInput!) {
  mutate_system_connection(input: $data) {
    carrier {
      id
      active
    }
  }
}
`;

export const CREATE_CUSTOMS_TEMPLATE = gql`mutation create_customs_template($data: CreateCustomsTemplateInput!) {
  create_customs_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const UPDATE_CUSTOMS_TEMPLATE = gql`mutation update_customs_template($data: UpdateCustomsTemplateInput!) {
  update_customs_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const DELETE_TEMPLATE = gql`mutation delete_template($data: DeleteMutationInput!) {
  delete_template(input: $data) {
    id
  }
}
`;

export const CREATE_PARCEL_TEMPLATE = gql`mutation create_parcel_template($data: CreateParcelTemplateInput!) {
  create_parcel_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const UPDATE_PARCEL_TEMPLATE = gql`mutation update_parcel_template($data: UpdateParcelTemplateInput!) {
  update_parcel_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const CREATE_ADDRESS_TEMPLATE = gql`mutation create_address_template($data: CreateAddressTemplateInput!) {
  create_address_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const UPDATE_ADDRESS_TEMPLATE = gql`mutation update_address_template($data: UpdateAddressTemplateInput!) {
  update_address_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const DISCARD_COMMODITY = gql`mutation discard_commodity($data: DeleteMutationInput!) {
  discard_commodity(input: $data) {
    id
  }
}
`;

export const DISCARD_CUSTOMS = gql`mutation discard_customs($data: DeleteMutationInput!) {
  discard_customs(input: $data) {
    id
  }
}
`;

export const DISCARD_PARCEL = gql`mutation discard_parcel($data: DeleteMutationInput!) {
  discard_parcel(input: $data) {
    id
  }
}
`;

export const MUTATE_API_TOKEN = gql`mutation mutate_token($data: TokenMutationInput!) {
  mutate_token(input: $data) {
    token {
      key
    }
  }
}
`;

export const GET_API_TOKEN = gql`query GetToken($org_id: String) {
  token(org_id: $org_id) {
    key
    created
  }
}
`;

export const GET_USER_CONNECTIONS = gql`query get_user_connections {
  user_connections {
    __typename
    ... on AmazonMwsSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      seller_id
      developer_id
      mws_auth_token
      aws_region
      capabilities
    }
    ... on AramexSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      account_pin
      account_entity
      account_number
      account_country_code
      capabilities
    }
    ... on AustraliaPostSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      api_key
      password
      account_number
      capabilities
    }
    ... on CanadaPostSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      customer_number
      contract_id
      metadata
      capabilities
    }
    ... on CanparSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      capabilities
    }
    ... on ChronopostSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      password
      account_number
      account_country_code
      capabilities
    }
    ... on DHLExpressSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      site_id
      password
      account_number
      account_country_code
      capabilities
    }
    ... on DHLPolandSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      account_number
      services {
        id
        active
        service_name
        service_code
        description
        cost
        currency
        estimated_transit_days
        max_weight
        max_width
        max_height
        max_length
        weight_unit
        dimension_unit
        domicile
        international
      }
      capabilities
    }
    ... on DHLUniversalSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      consumer_key
      consumer_secret
      capabilities
    }
    ... on DicomSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      billing_account
      capabilities
    }
    ...on DPDHLSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      app_id
      username
      password
      signature
      account_number
      services {
        id
        active
        service_name
        service_code
        description
        cost
        currency
        estimated_transit_days
        max_weight
        max_width
        max_height
        max_length
        weight_unit
        dimension_unit
        domicile
        international
      }
      capabilities
    }
    ... on EShipperSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      capabilities
    }
    ... on EasyPostSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      api_key
      metadata
      capabilities
    }
    ... on FedexSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      account_number
      password
      meter_number
      user_key
      account_country_code
      metadata
      capabilities
    }
    ... on FreightcomSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      capabilities
    }
    ... on GenericSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      custom_carrier_name
      account_number
      test_mode
      active
      account_country_code
      services {
        id
        active
        service_name
        service_code
        description
        cost
        currency
        estimated_transit_days
        max_weight
        max_width
        max_height
        max_length
        weight_unit
        dimension_unit
        domicile
        international
      }
      label_template {
        id
        slug
        template
        template_type
        shipment_sample
        width
        height
      }
      metadata
      capabilities
    }
    ... on PurolatorSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      account_number
      user_token
      metadata
      capabilities
    }
    ... on RoyalMailSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      client_id
      client_secret
      capabilities
    }
    ... on SendleSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      sendle_id
      api_key
      capabilities
    }
    ... on SFExpressSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      partner_id
      check_word
      capabilities
    }
    ... on TNTSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      account_number
      account_country_code
      capabilities
    }
    ... on UPSSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      access_license_number
      account_number
      account_country_code
      metadata
      capabilities
    }
    ... on UPSFreightSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      access_license_number
      account_number
      account_country_code
      metadata
      capabilities
    }
    ... on USPSSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      mailer_id
      customer_registration_id
      logistics_manager_mailer_id
      capabilities
    }
    ... on USPSInternationalSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      username
      password
      mailer_id
      customer_registration_id
      logistics_manager_mailer_id
      capabilities
    }
    ... on YanwenSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      customer_number
      license_key
      capabilities
    }
    ... on YunExpressSettingsType {
      id
      carrier_id
      carrier_name
      display_name
      test_mode
      active
      customer_number
      api_secret
      capabilities
    }
  }
}
`;

export const GET_USER = gql`query GetUser {
  user {
    email
    full_name
    is_staff
    last_login
    date_joined
  }
}
`;

export const UPDATE_USER = gql`mutation update_user($data: UpdateUserInput!) {
  update_user(input: $data) {
    user {
      full_name
      is_staff
      last_login
      date_joined
    }
    errors {
      field
      messages
    }
  }
}
`;

export const CHANGE_PASSWORD = gql`mutation change_password($data: ChangePasswordMutationInput!) {
  change_password(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const REGISTER_USER = gql`mutation register_user($data: RegisterUserMutationInput!) {
  register_user(input: $data) {
    user {
      email
      is_staff
      date_joined
    }
    errors {
      field
      messages
    }
  }
}
`;

export const CONFIRM_EMAIL = gql`mutation confirm_email($data: ConfirmEmailMutationInput!) {
  confirm_email(input: $data) {
    success
  }
}
`;

export const REQUEST_EMAIL_CHANGE = gql`mutation request_email_change($data: RequestEmailChangeMutationInput!) {
  request_email_change(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const CONFIRM_EMAIL_CHANGE = gql`mutation confirm_email_change($data: ConfirmEmailChangeMutationInput!) {
  confirm_email_change(input: $data) {
    user {
      email
    }
    errors {
      field
      messages
    }
  }
}
`;

export const REQUEST_PASSWORD_RESET = gql`mutation request_password_reset($data: RequestPasswordResetMutationInput!) {
  request_password_reset(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const CONFIRM_PASSWORD_RESET = gql`mutation confirm_password_reset($data: ConfirmPasswordResetMutationInput!) {
  confirm_password_reset(input: $data) {
    errors {
      field
      messages
    }
  }
}
`;

export const GET_EVENT = gql`query get_event($id: String!) {
  event(id: $id) {
    id
    type
    data
    test_mode
    pending_webhooks
    created_at
  }
}
`;

export const GET_EVENTS = gql`query get_events($filter: EventFilter) {
  events(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        type
        data
        test_mode
        pending_webhooks
        created_at
      }
    }
  }
}
`;

export const GET_ORDER = gql`query get_order($id: String!) {
  order(id: $id) {
    id
    order_id
    source
    status
    shipping_to {
      id
      postal_code
      city
      person_name
      company_name
      country_code
      email
      phone_number
      state_code
      suburb
      residential
      address_line1
      address_line2
      federal_tax_id
      state_tax_id
      validate_location
    }
    shipping_from {
      id
      postal_code
      city
      person_name
      company_name
      country_code
      email
      phone_number
      state_code
      suburb
      residential
      address_line1
      address_line2
      federal_tax_id
      state_tax_id
      validate_location
    }
    billing_address {
      id
      postal_code
      city
      person_name
      company_name
      country_code
      email
      phone_number
      state_code
      suburb
      residential
      address_line1
      address_line2
      federal_tax_id
      state_tax_id
      validate_location
    }
    line_items {
      id
      weight
      description
      quantity
      unfulfilled_quantity
      sku
      hs_code
      value_amount
      weight_unit
      value_currency
      origin_country
      metadata
      parent_id
    }
    created_at
    updated_at
    created_by {
      email
      full_name
    }
    test_mode
    options
    metadata
    shipments {
      id
      carrier_id
      carrier_name
      created_at
      updated_at
      created_by {
        email
        full_name
      }
      status
      recipient {
        id
        postal_code
        city
        person_name
        company_name
        country_code
        email
        phone_number
        state_code
        suburb
        residential
        address_line1
        address_line2
        federal_tax_id
        state_tax_id
        validate_location
      }
      shipper {
        id
        postal_code
        city
        person_name
        company_name
        country_code
        email
        phone_number
        state_code
        suburb
        residential
        address_line1
        address_line2
        federal_tax_id
        state_tax_id
        validate_location
      }
      parcels {
        id
        width
        height
        length
        is_document
        dimension_unit
        weight
        weight_unit
        packaging_type
        package_preset
        freight_class
        reference_number
        items {
          id
          weight
          description
          quantity
          sku
          hs_code
          value_amount
          weight_unit
          value_currency
          origin_country
          metadata
          parent_id
        }
      }
      label_type
      tracking_number
      shipment_identifier
      label_url
      invoice_url
      tracking_url
      test_mode
      service
      reference
      customs {
        id
        certify
        commercial_invoice
        content_type
        content_description
        incoterm
        invoice
        invoice_date
        signer
        duty {
          paid_by
          currency
          account_number
          declared_value
        }
        options
        commodities {
          id
          weight
          weight_unit
          description
          quantity
          sku
          hs_code
          value_amount
          value_currency
          origin_country
          metadata
          parent_id
        }
      }
      payment {
        paid_by
        currency
        account_number
      }
      selected_rate_id
      selected_rate {
        id
        carrier_name
        carrier_id
        currency
        service
        transit_days
        total_charge
        extra_charges {
          name
          amount
          currency
        }
        test_mode
        meta
      }
      carrier_ids
      rates {
        id
        carrier_name
        carrier_id
        currency
        service
        transit_days
        total_charge
        extra_charges {
          name
          amount
          currency
        }
        test_mode
        meta
      }
      metadata
      meta
      messages {
        carrier_name
        carrier_id
        message
        code
        details
      }
    }
  }
}
`;

export const GET_ORDERS = gql`query get_orders($filter: OrderFilter) {
  orders(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        order_id
        source
        status
        shipping_to {
          id
          postal_code
          city
          person_name
          company_name
          country_code
          email
          phone_number
          state_code
          suburb
          residential
          address_line1
          address_line2
          federal_tax_id
          state_tax_id
          validate_location
        }
        shipping_from {
          id
          postal_code
          city
          person_name
          company_name
          country_code
          email
          phone_number
          state_code
          suburb
          residential
          address_line1
          address_line2
          federal_tax_id
          state_tax_id
          validate_location
        }
        billing_address {
          id
          postal_code
          city
          person_name
          company_name
          country_code
          email
          phone_number
          state_code
          suburb
          residential
          address_line1
          address_line2
          federal_tax_id
          state_tax_id
          validate_location
        }
        line_items {
          id
          weight
          description
          quantity
          unfulfilled_quantity
          sku
          hs_code
          value_amount
          weight_unit
          value_currency
          origin_country
          metadata
          parent_id
        }
        created_at
        updated_at
        created_by {
          email
          full_name
        }
        test_mode
        options
        metadata
        shipments {
          id
          carrier_id
          carrier_name
          created_at
          updated_at
          created_by {
            email
            full_name
          }
          status
          recipient {
            id
            postal_code
            city
            person_name
            company_name
            country_code
            email
            phone_number
            state_code
            suburb
            residential
            address_line1
            address_line2
            federal_tax_id
            state_tax_id
            validate_location
          }
          shipper {
            id
            postal_code
            city
            person_name
            company_name
            country_code
            email
            phone_number
            state_code
            suburb
            residential
            address_line1
            address_line2
            federal_tax_id
            state_tax_id
            validate_location
          }
          parcels {
            id
            width
            height
            length
            is_document
            dimension_unit
            weight
            weight_unit
            packaging_type
            package_preset
            freight_class
            reference_number
            items {
              id
              weight
              description
              quantity
              sku
              hs_code
              value_amount
              weight_unit
              value_currency
              origin_country
              metadata
              parent_id
            }
          }
          label_type
          tracking_number
          shipment_identifier
          label_url
          invoice_url
          tracking_url
          test_mode
          service
          reference
          customs {
            id
            certify
            commercial_invoice
            content_type
            content_description
            incoterm
            invoice
            invoice_date
            signer
            duty {
              paid_by
              currency
              account_number
              declared_value
            }
            options
            commodities {
              id
              weight
              weight_unit
              description
              quantity
              sku
              hs_code
              value_amount
              value_currency
              origin_country
              metadata
              parent_id
            }
          }
          payment {
            paid_by
            currency
            account_number
          }
          selected_rate_id
          selected_rate {
            id
            carrier_name
            carrier_id
            currency
            service
            transit_days
            total_charge
            extra_charges {
              name
              amount
              currency
            }
            test_mode
            meta
          }
          carrier_ids
          rates {
            id
            carrier_name
            carrier_id
            currency
            service
            transit_days
            total_charge
            extra_charges {
              name
              amount
              currency
            }
            test_mode
            meta
          }
          metadata
          meta
          messages {
            carrier_name
            carrier_id
            message
            code
            details
          }
        }
      }
    }
  }
}
`;

export const MUTATE_METADATA = gql`mutation mutate_metadata($data: MetadataMutationInput!) {
  mutate_metadata(input: $data) {
    id
    metadata
    errors {
      field
      messages
    }
  }
}
`;

export const GET_DOCUMENT_TEMPLATE = gql`query get_document_template($id: String!) {
  document_template(id: $id) {
    id
    slug
    name
    template
    description
    related_object
  }
}
`;

export const GET_DOCUMENT_TEMPLATES = gql`query get_document_templates($filter: DocumentTemplateFilter) {
  document_templates(filter: $filter) {
    page_info {
      has_next_page
      has_previous_page
      start_cursor
      end_cursor
    }
    edges {
      node {
        id
        slug
        name
        template
        description
        related_object
      }
    }
  }
}
`;

export const CREATE_DOCUMENT_TEMPLATE = gql`mutation create_document_template($data:  CreateDocumentTemplateMutationInput!) {
  create_document_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const UPDATE_DOCUMENT_TEMPLATE = gql`mutation update_document_template($data:  UpdateDocumentTemplateMutationInput!) {
  update_document_template(input: $data) {
    template {
      id
    }
    errors {
      field
      messages
    }
  }
}
`;

export const DELETE_DOCUMENT_TEMPLATE = gql`mutation delete_document_template($data: DeleteMutationInput!) {
  delete_document_template(input: $data) {
    id
  }
}
`;

export const SEARCH_DATA = gql`query search_data($keyword: String) {
  shipment_results: shipments(filter: { keyword: $keyword, offset: 0, first: 10 }) {
    edges {
      node {
        id
        status
        tracking_number
        recipient {
          id
          city
          address_line1
          address_line2
          country_code
          postal_code
          person_name
          phone_number
          company_name
          state_code
        }
        created_at
      }
    }
  }
  order_results: orders(filter: { keyword: $keyword, offset: 0, first: 10 }) {
    edges {
      node {
        id
        status
        order_id
        shipping_to {
          id
          city
          address_line1
          address_line2
          country_code
          postal_code
          person_name
          phone_number
          company_name
          state_code
        }
        created_at
      }
    }
  }
  trackers_results: trackers(filter: {tracking_number: $keyword, offset: 0, first: 10 }) {
    edges {
      node {
        id
        status
        tracking_number
        created_at
      }
    }
  }
}
`;
