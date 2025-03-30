import { Vector3 } from '@minecraft/server';
export declare class TendrockVector3 implements Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    static create(x?: number, y?: number, z?: number): TendrockVector3;
    static wrap(vector3: Vector3): TendrockVector3;
    static negate(vector3: Vector3): TendrockVector3;
    static rebuild(lid: string, location?: TendrockVector3): TendrockVector3;
    static add(vec1: Vector3, vec2: Vector3): TendrockVector3;
    static subtract(vec1: Vector3, vec2: Vector3): TendrockVector3;
    /**
     * magnitude
     *
     * The magnitude of a vector
     */
    static magnitude(v: Vector3): number;
    /**
     * distance
     *
     * Calculate the distance between two vectors
     */
    static distance(a: Vector3, b: Vector3): number;
    private hasSameSymbol;
    isBetween(vec1: Vector3, vec2: Vector3): boolean;
    get length(): number;
    get lengthSquared(): number;
    set(x: number, y: number, z: number): TendrockVector3;
    add(x: number, y: number, z: number, newObject?: boolean): TendrockVector3;
    addVec(vector3: Vector3, newObject?: boolean): TendrockVector3;
    addScalar(scalar: number, newObject?: boolean): TendrockVector3;
    addX(scalar?: number, newObject?: boolean): TendrockVector3;
    addY(scalar?: number, newObject?: boolean): TendrockVector3;
    addZ(scalar?: number, newObject?: boolean): TendrockVector3;
    sub(x: number, y: number, z: number, newObject?: boolean): TendrockVector3;
    subVec(vector3: Vector3, newObject?: boolean): TendrockVector3;
    subScalar(scalar: number, newObject?: boolean): TendrockVector3;
    multiply(scalar: number): TendrockVector3;
    divide(scalar: number): TendrockVector3;
    dot(x: number, y: number, z: number): number;
    dotVec(vector3: Vector3): number;
    cross(x: number, y: number, z: number): TendrockVector3;
    crossVec(vector3: Vector3): TendrockVector3;
    negate(): TendrockVector3;
    normalize(): TendrockVector3;
    lerp(x: number, y: number, z: number, alpha: number): Vector3;
    lerpVec(vector3: Vector3, alpha: number): Vector3;
    distanceTo(vector3: Vector3): number;
    equals(vector3: Vector3): boolean;
    clone(): TendrockVector3;
    toNative(): Vector3;
    toArray(): [number, number, number];
    toString(): string;
}
