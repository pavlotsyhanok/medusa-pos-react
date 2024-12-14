import Medusa from "@medusajs/medusa-js"

export const medusa = new Medusa({
    baseUrl: "http://localhost:9000/", maxRetries: 3,
    apiKey: '{api_token}'
});