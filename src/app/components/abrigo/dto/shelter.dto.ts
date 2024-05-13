export interface IShelterInterface{
    id: number;
    location: string;
    address: string;
    name: string;
    email: string;
    phone: string;
    capacity: number;
    occupation: number;
    owner: string;
    needs: string[];
    other_needs: string[];
    createdAt: Date;
    updatedAt: Date;
    updatedBy: number;
}