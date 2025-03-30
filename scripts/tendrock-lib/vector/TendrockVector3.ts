import {Vector3} from '@minecraft/server'

export class TendrockVector3 implements Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public static create(x = 0, y = 0, z = 0) {
    return new TendrockVector3(x, y, z);
  }

  public static wrap(vector3: Vector3) {
    if (!vector3) return undefined;
    if (vector3 instanceof TendrockVector3) return vector3;
    return new TendrockVector3(vector3.x, vector3.y, vector3.z);
  }

  public static negate(vector3: Vector3) {
    return TendrockVector3.wrap(vector3).negate();
  }

  public static rebuild(lid: string, location?: TendrockVector3): TendrockVector3 {
    const [x, y, z] = lid.substring(1).replaceAll('f', '-').split('_');
    if (location) {
      location.set(Number(x), Number(y), Number(z))
      return location;
    }
    return new TendrockVector3(Number(x), Number(y), Number(z));
  }

  public static add(vec1: Vector3, vec2: Vector3): TendrockVector3 {
    return new TendrockVector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
  }

  public static subtract(vec1: Vector3, vec2: Vector3): TendrockVector3 {
    return new TendrockVector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
  }

  /**
   * magnitude
   *
   * The magnitude of a vector
   */
  public static magnitude(v: Vector3) {
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
  }

  /**
   * distance
   *
   * Calculate the distance between two vectors
   */
  public static distance(a: Vector3, b: Vector3) {
    return this.magnitude(TendrockVector3.subtract(a, b));
  }

  private hasSameSymbol(num1: number, num2: number) {
    if (num1 === 0 || num2 === 0) return true;
    return num1 / Math.abs(num1) === num2 / Math.abs(num2);
  }

  // TODO: 是否应被舍弃
  public isBetween(vec1: Vector3, vec2: Vector3) {
    const xOffset1 = this.x - vec1.x
    const yOffset1 = this.y - vec1.y;
    const zOffset1 = this.z - vec1.z;
    const xOffset2 = vec2.x - this.x;
    const yOffset2 = vec2.y - this.y;
    const zOffset2 = vec2.z - this.z;
    return this.hasSameSymbol(xOffset1, xOffset2) && this.hasSameSymbol(yOffset1, yOffset2) && this.hasSameSymbol(zOffset1, zOffset2);
  }

  // 获取向量长度
  public get length(): number {
    return Math.sqrt(this.lengthSquared);
  }

  // 获取向量长度
  public get lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public set(x: number, y: number, z: number): TendrockVector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  // 向量加法
  public add(x: number, y: number, z: number, newObject = true): TendrockVector3 {
    if (newObject) return new TendrockVector3(this.x + x, this.y + y, this.z + z);
    this.x += x;
    this.y += y;
    this.z += z;
  }

  public addVec(vector3: Vector3, newObject = true): TendrockVector3 {
    return this.add(vector3.x, vector3.y, vector3.z, newObject);
  }

  public addScalar(scalar: number, newObject = true): TendrockVector3 {
    return this.add(scalar, scalar, scalar, newObject);
  }

  public addX(scalar = 1, newObject = true) {
    return this.add(scalar, 0, 0, newObject);
  }

  public addY(scalar = 1, newObject = true) {
    return this.add(0, scalar, 0, newObject);
  }

  public addZ(scalar = 1, newObject = true) {
    return this.add(0, 0, scalar, newObject);
  }

  // 向量减法
  public sub(x: number, y: number, z: number, newObject = true): TendrockVector3 {
    if (newObject) return new TendrockVector3(this.x - x, this.y - y, this.z - z);
    this.x -= x;
    this.y -= y;
    this.z -= z;
  }

  public subVec(vector3: Vector3, newObject = true): TendrockVector3 {
    return this.sub(vector3.x, vector3.y, vector3.z, newObject);
  }

  public subScalar(scalar: number, newObject = true): TendrockVector3 {
    return this.sub(scalar, scalar, scalar, newObject);
  }

  // 向量数乘
  public multiply(scalar: number): TendrockVector3 {
    return new TendrockVector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  // 向量数除
  public divide(scalar: number): TendrockVector3 {
    return new TendrockVector3(this.x / scalar, this.y / scalar, this.z / scalar);
  }

  // 向量点乘
  public dot(x: number, y: number, z: number): number {
    return this.x * x + this.y * y + this.z * z;
  }

  public dotVec(vector3: Vector3): number {
    return this.dot(vector3.x, vector3.y, vector3.z);
  }

  // 向量叉乘
  public cross(x: number, y: number, z: number): TendrockVector3 {
    const xr = this.y * z - this.z * y;
    const yr = this.z * x - this.x * z;
    const zr = this.x * y - this.y * x;
    return new TendrockVector3(xr, yr, zr);
  }

  public crossVec(vector3: Vector3): TendrockVector3 {
    return this.cross(vector3.x, vector3.y, vector3.z);
  }

  // 向量取反
  public negate(): TendrockVector3 {
    return new TendrockVector3(-this.x, -this.y, -this.z);
  }

  // 获取单位向量
  public normalize(): TendrockVector3 {
    const length = this.length;
    if (length === 0) {
      return new TendrockVector3();
    } else {
      return new TendrockVector3(this.x / length, this.y / length, this.z / length);
    }
  }

  // 计算两个向量之间的线性插值
  public lerp(x: number, y: number, z: number, alpha: number): Vector3 {
    const xr = this.x + (x - this.x) * alpha;
    const yr = this.y + (y - this.y) * alpha;
    const zr = this.z + (z - this.z) * alpha;
    return new TendrockVector3(xr, yr, zr);
  }

  public lerpVec(vector3: Vector3, alpha: number): Vector3 {
    return this.lerp(vector3.x, vector3.y, vector3.z, alpha);
  }

  public distanceTo(vector3: Vector3): number {
    const dx = this.x - vector3.x;
    const dy = this.y - vector3.y;
    const dz = this.z - vector3.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  // 判断两个向量是否相等
  public equals(vector3: Vector3): boolean {
    return this.x === vector3.x && this.y === vector3.y && this.z === vector3.z;
  }

  // 克隆向量
  public clone(): TendrockVector3 {
    return new TendrockVector3(this.x, this.y, this.z);
  }

  // 获取该向量的原生形式
  public toNative(): Vector3 {
    return {x: this.x, y: this.y, z: this.z};
  }

  // 将向量的值转化成数组
  public toArray(): [number, number, number] {
    return [this.x, this.y, this.z];
  }

  // 将向量的值转化成字符串
  public toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
}
