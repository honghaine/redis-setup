// app.service.ts
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

async getValue(key: string) {
  const result = await this.cacheManager.get(key);

  if (result === null) {
    // Key not found in the cache, set a new value and retrieve it
    console.log(`Key '${key}' not found in cache. Setting a new value.`);
    await this.setValue(key, key);
    const newValue = await this.cacheManager.get(key);
    console.log(`New value for key '${key}': ${newValue}`);
    return newValue;
  }

  // Key found in the cache, return the result
  console.log(`Key '${key}' found in cache. Returning cached value.`);
  return result;
}

}
