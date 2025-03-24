/* eslint-disable @typescript-eslint/no-explicit-any */
import { authService } from './auth.service';

const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3030";

function getAuthHeaders(secure: boolean) {
  if (!secure) return { "Content-Type": "application/json" };
  
  const token = authService.getToken();
  
  // Log token for debugging
  console.log("🔑 Token for request:", token ? 
    `${token.substring(0, 10)}... (${token.length} chars)` : "None");
  
  if (!token) {
    console.warn("🔑 No token found in storage");
  }
  
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(
  method: string,
  endpoint: string,
  data: any = null,
  secure = false
) {
  try {
    const options: RequestInit = {
      method,
      headers: getAuthHeaders(secure),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    console.log(
      `🟢 Sending ${method} request to ${BASE_URL + endpoint}`,
      options
    );

    const res = await fetch(BASE_URL + endpoint, options);
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        errorData = { message: "שגיאה לא ידועה" };
      }
      
      if (res.status === 401) {
        throw new Error("אין הרשאה - נדרשת התחברות למערכת");
      } else if (res.status === 403) {
        throw new Error("אין לך הרשאה לבצע פעולה זו");
      } else if (res.status === 404) {
        throw new Error("המשאב המבוקש לא נמצא");
      }
      
      throw new Error(
        `שגיאה בשרת (${res.status}): ${
          errorData.message || "שגיאה לא ידועה"
        }`
      );
    }

    return res.json();
  } catch (err: unknown) {
    console.error("🔴 HTTP Request Error:", err);
    throw err;
  }
}

async function get(endpoint: string, secure = false) {
  return request("GET", endpoint, null, secure);
}

async function post(endpoint: string, data: any = null, secure = false) {
  return request("POST", endpoint, data, secure);
}

async function put(endpoint: string, data: any = null, secure = false) {
  return request("PUT", endpoint, data, secure);
}

async function del(endpoint: string, secure = false) {
  return request("DELETE", endpoint, null, secure);
}

export const httpService = { 
  get, 
  post, 
  put, 
  del,
  baseUrl: BASE_URL 
};
