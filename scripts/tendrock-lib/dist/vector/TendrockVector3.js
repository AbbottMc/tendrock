export class TendrockVector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static create(x = 0, y = 0, z = 0) {
        return new TendrockVector3(x, y, z);
    }
    static wrap(vector3) {
        if (!vector3)
            return undefined;
        if (vector3 instanceof TendrockVector3)
            return vector3;
        return new TendrockVector3(vector3.x, vector3.y, vector3.z);
    }
    static negate(vector3) {
        return TendrockVector3.wrap(vector3).negate();
    }
    static rebuild(lid, location) {
        const [x, y, z] = lid.substring(1).replaceAll('f', '-').split('_');
        if (location) {
            location.set(Number(x), Number(y), Number(z));
            return location;
        }
        return new TendrockVector3(Number(x), Number(y), Number(z));
    }
    static add(vec1, vec2) {
        return new TendrockVector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
    }
    static subtract(vec1, vec2) {
        return new TendrockVector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
    }
    /**
     * magnitude
     *
     * The magnitude of a vector
     */
    static magnitude(v) {
        return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2));
    }
    /**
     * distance
     *
     * Calculate the distance between two vectors
     */
    static distance(a, b) {
        return this.magnitude(TendrockVector3.subtract(a, b));
    }
    hasSameSymbol(num1, num2) {
        if (num1 === 0 || num2 === 0)
            return true;
        return num1 / Math.abs(num1) === num2 / Math.abs(num2);
    }
    // TODO: 是否应被舍弃
    isBetween(vec1, vec2) {
        const xOffset1 = this.x - vec1.x;
        const yOffset1 = this.y - vec1.y;
        const zOffset1 = this.z - vec1.z;
        const xOffset2 = vec2.x - this.x;
        const yOffset2 = vec2.y - this.y;
        const zOffset2 = vec2.z - this.z;
        return this.hasSameSymbol(xOffset1, xOffset2) && this.hasSameSymbol(yOffset1, yOffset2) && this.hasSameSymbol(zOffset1, zOffset2);
    }
    // 获取向量长度
    get length() {
        return Math.sqrt(this.lengthSquared);
    }
    // 获取向量长度
    get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    // 向量加法
    add(x, y, z, newObject = true) {
        if (newObject)
            return new TendrockVector3(this.x + x, this.y + y, this.z + z);
        this.x += x;
        this.y += y;
        this.z += z;
    }
    addVec(vector3, newObject = true) {
        return this.add(vector3.x, vector3.y, vector3.z, newObject);
    }
    addScalar(scalar, newObject = true) {
        return this.add(scalar, scalar, scalar, newObject);
    }
    addX(scalar = 1, newObject = true) {
        return this.add(scalar, 0, 0, newObject);
    }
    addY(scalar = 1, newObject = true) {
        return this.add(0, scalar, 0, newObject);
    }
    addZ(scalar = 1, newObject = true) {
        return this.add(0, 0, scalar, newObject);
    }
    // 向量减法
    sub(x, y, z, newObject = true) {
        if (newObject)
            return new TendrockVector3(this.x - x, this.y - y, this.z - z);
        this.x -= x;
        this.y -= y;
        this.z -= z;
    }
    subVec(vector3, newObject = true) {
        return this.sub(vector3.x, vector3.y, vector3.z, newObject);
    }
    subScalar(scalar, newObject = true) {
        return this.sub(scalar, scalar, scalar, newObject);
    }
    // 向量数乘
    multiply(scalar) {
        return new TendrockVector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    // 向量数除
    divide(scalar) {
        return new TendrockVector3(this.x / scalar, this.y / scalar, this.z / scalar);
    }
    // 向量点乘
    dot(x, y, z) {
        return this.x * x + this.y * y + this.z * z;
    }
    dotVec(vector3) {
        return this.dot(vector3.x, vector3.y, vector3.z);
    }
    // 向量叉乘
    cross(x, y, z) {
        const xr = this.y * z - this.z * y;
        const yr = this.z * x - this.x * z;
        const zr = this.x * y - this.y * x;
        return new TendrockVector3(xr, yr, zr);
    }
    crossVec(vector3) {
        return this.cross(vector3.x, vector3.y, vector3.z);
    }
    // 向量取反
    negate() {
        return new TendrockVector3(-this.x, -this.y, -this.z);
    }
    // 获取单位向量
    normalize() {
        const length = this.length;
        if (length === 0) {
            return new TendrockVector3();
        }
        else {
            return new TendrockVector3(this.x / length, this.y / length, this.z / length);
        }
    }
    // 计算两个向量之间的线性插值
    lerp(x, y, z, alpha) {
        const xr = this.x + (x - this.x) * alpha;
        const yr = this.y + (y - this.y) * alpha;
        const zr = this.z + (z - this.z) * alpha;
        return new TendrockVector3(xr, yr, zr);
    }
    lerpVec(vector3, alpha) {
        return this.lerp(vector3.x, vector3.y, vector3.z, alpha);
    }
    distanceTo(vector3) {
        const dx = this.x - vector3.x;
        const dy = this.y - vector3.y;
        const dz = this.z - vector3.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    // 判断两个向量是否相等
    equals(vector3) {
        return this.x === vector3.x && this.y === vector3.y && this.z === vector3.z;
    }
    // 克隆向量
    clone() {
        return new TendrockVector3(this.x, this.y, this.z);
    }
    // 获取该向量的原生形式
    toNative() {
        return { x: this.x, y: this.y, z: this.z };
    }
    // 将向量的值转化成数组
    toArray() {
        return [this.x, this.y, this.z];
    }
    // 将向量的值转化成字符串
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
//# sourceMappingURL=TendrockVector3.js.map