import axios from "axios";
import { ApiRoutes } from "./apiRoutes";

export const API = axios.create({
  baseURL: ApiRoutes.BASE_URL,
});


/**
 * API hook to fetch all emails
 * @returns Function to dispatches API request
 */
export function useFetchAllEmails() {

  /**
   * Fetches the emails
   * @returns Return the AxiosResponse for this request
   */
  async function fetchAllEmails() {

    // Fetch the emails
    let response = await API.get(ApiRoutes.FetchAllEmails);

    // Return the response
    return response;
  }

  // Return request function
  return fetchAllEmails;
}

/**
 * API hook to subscribe an email
 * @returns Function to dispatches API request
 */
export function useSubscribeToWaitlist() {

  /**
   * Fetches the emails
   * @returns Return the AxiosResponse for this request
   */
  async function subscribeToWaitlist(data: {email: string}) {

    // Fetch the emails
    let response = await API.post(ApiRoutes.CreateNewEmail, data);

    // Return the response
    return response;
  }

  // Return request function
  return subscribeToWaitlist;
}