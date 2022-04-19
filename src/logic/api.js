import SwaggerClient from "swagger-client";
import { API_URL } from '@/logic/config'


export const apiClient = new SwaggerClient({
    url: API_URL + "/openapi.json",
    authorizations: {
        
    }
});

