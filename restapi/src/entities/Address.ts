export interface IAddress extends Document{
    country_name: string;
    locality: string;
    postal_code: string;
    region: string;
    street_address: string; 
};