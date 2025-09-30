import { Api } from "@/api/ApiClient";

const sdk = new Api({ baseUrl: "/api" });

export const api = sdk.api;
export default sdk;
