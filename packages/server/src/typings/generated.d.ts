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

    aquarium: Aquarium;

    getMeasures: MeasurePaginated;
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

    measures?: Measure[] | null;

    createdAt?: string | null;
}

export interface Measure {
    id: string;

    temperature?: number | null;

    salinity?: number | null;

    nitrite?: number | null;

    nitrate?: number | null;

    phosphate?: number | null;

    alkalinity?: number | null;

    calcium?: number | null;

    magnesium?: number | null;

    silicate?: number | null;

    aquarium: Aquarium;

    createdAt?: string | null;
}

export interface MeasurePaginated {
    measures: Measure[];

    pageInfo: PageInfo;
}

export interface PageInfo {
    hasNextPage: boolean;

    endCursor?: string | null;
}

export interface Mutation {
    _?: boolean | null;

    createAquarium?: Aquarium | null;

    createMeasure: Measure;
}

// ====================================================
// Arguments
// ====================================================

export interface MeQueryArgs {
    email?: string | null;
}
export interface AquariumQueryArgs {
    id: string;
}
export interface GetMeasuresQueryArgs {
    aquariumId: string;

    cursor?: string | null;

    limit?: number | null;
}
export interface CreateAquariumMutationArgs {
    name: string;

    liters: number;
}
export interface CreateMeasureMutationArgs {
    temperature?: number | null;

    salinity?: number | null;

    nitrite?: number | null;

    nitrate?: number | null;

    phosphate?: number | null;

    alkalinity?: number | null;

    calcium?: number | null;

    magnesium?: number | null;

    silicate?: number | null;

    aquariumId: string;
}

// ====================================================
// END: Typescript template
// ====================================================
