import { FormField } from "./FormField";

export interface Formulario { 
    ID: number;
    Nombre: string;
    Descripcion: string;
    Campos: FormField[];
    Rol: string;
}