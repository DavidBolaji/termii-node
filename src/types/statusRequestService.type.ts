// types/statusService.type.ts

/**
 * Request payload for checking number status (fake / ported / network info)
 */
export interface StatusRequest {
  /** Phone number to verify (must be in international format e.g., 2348753243651) */
  phone_number: string;

  /** Country code (ISO alpha-2, e.g., "NG") */
  country_code: string;
}

/**
 * Details about the routing / porting of the number
 */
export interface RouteDetail {
  /** The queried phone number */
  number: string;

  /** Indicates if number is ported (0 = not ported, 1 = ported) */
  ported: number;
}

/**
 * Details about the country of the number */
export interface CountryDetail {
  /** Country dialing code (e.g., "234") */
  countryCode: string;

  /** Mobile Country Code (e.g., "621") */
  mobileCountryCode: string;

  /** ISO country code (e.g., "NG") */
  iso: string;
}

/**
 * Details about the operator / carrier of the number
 */
export interface OperatorDetail {
  /** Short operator code (e.g., "ANG") */
  operatorCode: string;

  /** Full operator name (e.g., "Airtel Nigeria") */
  operatorName: string;

  /** Mobile number code */
  mobileNumberCode: string;

  /** Mobile routing code */
  mobileRoutingCode: string;

  /** Carrier identification code */
  carrierIdentificationCode: string;

  /** Line type (e.g., "Mobile", "Landline") */
  lineType: string;
}

/**
 * Single status check result
 */
export interface StatusResult {
  routeDetail: RouteDetail;
  countryDetail: CountryDetail;
  operatorDetail: OperatorDetail;
  status: number;
}

/**
 * Response from the Status API
 */
export interface StatusResponse {
  result: StatusResult[];
}
