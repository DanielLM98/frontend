import { FormFieldOptions } from "./FormFieldOptions";

export interface FormField{
    type: string;
    label: string;
    name: string;
    value?: any;
    options?: FormFieldOptions[];
    max?: number;
    min?: number;
}