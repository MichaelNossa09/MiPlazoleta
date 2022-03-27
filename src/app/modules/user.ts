export interface Roles{
    usuario?: boolean;
    restaurante?: boolean;
}


export interface UserInterface{
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    photoURL?: string;
    roles: Roles;
}