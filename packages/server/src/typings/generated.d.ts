/* tslint:disable */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
    _?: boolean | null;

    me?: User | null;

    aquariums?: (Aquarium | null)[] | null;

    getMeasures: (Measure | null)[];
}

export interface User {
    id: string;

    email: string;

    aquariums: (Aquarium | null)[];

    createdAt?: string | null;
}

export interface Aquarium {
    id: string;

    name: string;

    liters: number;

    user: User;

    createdAt?: string | null;
}

export interface Measure {
    id: string;

    temperature: number;

    salinity: number;

    nitrite: number;

    nitrate: number;

    phosphate: number;

    alkalinity: number;

    calcium: number;

    magnesium: number;

    silicate: number;

    aquarium_id: string;

    createdAt?: string | null;
}

export interface Mutation {
    _?: boolean | null;

    addAquarium?: Aquarium | null;

    addMeasure?: Measure | null;
}

// ====================================================
// Arguments
// ====================================================

export interface MeQueryArgs {
    email?: string | null;
}
export interface GetMeasuresQueryArgs {
    id: string;
}
export interface AddAquariumMutationArgs {
    name: string;

    liters: number;
}
export interface AddMeasureMutationArgs {
    temperature?: number | null;

    salinity?: number | null;

    nitrite?: number | null;

    nitrate?: number | null;

    phosphate?: number | null;

    alkalinity?: number | null;

    calcium?: number | null;

    magnesium?: number | null;

    silicate?: number | null;
}

// ====================================================
// END: Typescript template
// ====================================================
