import { Revert } from '../types/Revert';

export class Map<K, V> {
    protected _keys: K[] = [];
    protected _values: V[] = [];

    public get size(): i32 {
        return this._keys.length;
    }

    public keys(): K[] {
        return this._keys;
    }

    public values(): V[] {
        return this._values;
    }

    public set(key: K, value: V): void {
        const index: i32 = this.indexOf(key);
        if (index == -1) {
            this._keys.push(key);
            this._values.push(value);
        } else {
            this._values[index] = value;
        }
    }

    public indexOf(key: K): i32 {
        return this._keys.indexOf(key);
    }

    public get(key: K): V {
        const index: i32 = this.indexOf(key);
        if (index == -1) {
            throw new Revert('Key not found in map');
        }
        return this._values[index];
    }

    public has(key: K): bool {
        for (let i: i32 = 0; i < this._keys.length; i++) {
            if (this._keys[i] == key) {
                return true;
            }
        }

        return false;
    }

    public delete(key: K): bool {
        const index: i32 = this.indexOf(key);
        if (index == -1) {
            return false;
        }
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        return true;
    }

    public clear(): void {
        this._keys = [];
        this._values = [];
    }
}
