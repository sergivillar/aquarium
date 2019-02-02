export type Maybe<T> = T | null;

// ====================================================
// Types
// ====================================================

export interface Query {
    _?: Maybe<boolean>;

    me: User;

    aquarium: Aquarium;

    getMeasures: MeasurePaginated;
}

export interface User {
    id: string;

    email: string;

    aquariums: Aquarium[];

    createdAt?: Maybe<string>;
}

export interface Aquarium {
    id: string;

    name: string;

    liters: number;

    user: User;

    measures?: Maybe<Measure[]>;

    createdAt?: Maybe<string>;
}

export interface Measure {
    id: string;

    temperature?: Maybe<number>;

    salinity?: Maybe<number>;

    nitrite?: Maybe<number>;

    nitrate?: Maybe<number>;

    phosphate?: Maybe<number>;

    alkalinity?: Maybe<number>;

    calcium?: Maybe<number>;

    magnesium?: Maybe<number>;

    silicate?: Maybe<number>;

    aquarium: Aquarium;

    createdAt?: Maybe<string>;
}

export interface MeasurePaginated {
    measures: Measure[];

    pageInfo: PageInfo;
}

export interface PageInfo {
    hasNextPage: boolean;

    endCursor?: Maybe<string>;
}

export interface Mutation {
    _?: Maybe<boolean>;

    createAquarium?: Maybe<Aquarium>;

    createMeasure: Measure;
}

// ====================================================
// Arguments
// ====================================================

export interface MeQueryArgs {
    email?: Maybe<string>;
}
export interface AquariumQueryArgs {
    id: string;
}
export interface GetMeasuresQueryArgs {
    aquariumId: string;

    cursor?: Maybe<string>;

    limit?: Maybe<number>;
}
export interface CreateAquariumMutationArgs {
    name: string;

    liters: number;
}
export interface CreateMeasureMutationArgs {
    temperature?: Maybe<number>;

    salinity?: Maybe<number>;

    nitrite?: Maybe<number>;

    nitrate?: Maybe<number>;

    phosphate?: Maybe<number>;

    alkalinity?: Maybe<number>;

    calcium?: Maybe<number>;

    magnesium?: Maybe<number>;

    silicate?: Maybe<number>;

    aquariumId: string;
}
