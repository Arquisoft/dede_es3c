export interface UserPOD extends Document{
    street_address: string; 
    locality: string;
    postal_code: string;
    region: string;
    country_name: string;
}