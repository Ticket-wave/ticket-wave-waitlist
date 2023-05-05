export class ApiRoutes {
  /**
   * The base url for ticket wave live APIs
   */
  static BASE_URL: string = "https://twapi.marketpro.ng";

  /**
   * The base url for the ticket wave dev APIs
   */
  static BASE_URL_DEV: string = "https://localhost:7144";

  /**
   * The base url for the ticket wave test APIs
   */
  static BASE_URL_TEST: string = "https://apitest.sample.com";

  /**
   * The relative route to the CreateNewEmail endpoint
   */
  static CreateNewEmail: string = "api/waitlist";

  /**
   * The relative route to the FetchAllEmails endpoint
   */
  static FetchAllEmails: string = "api/waitlist";
}
