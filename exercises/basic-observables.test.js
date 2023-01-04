import { describe, expect, it } from 'vitest'
import { from, of } from 'rxjs';

describe('Basic Observables', () => {
  it.skip('of', () => {
    const result = [];

    const observable$ = of(1, 2, 3, 4);
    
    observable$.subscribe((value) => result.push(value));

    expect(result).toEqual([1, 2, 3, 4]);

  });

  it.skip('from', () => {
    const result = [];

    const observable$ = from([1, 2, 3, 4]);
    
    observable$.subscribe((value) => result.push(value));

    expect(result).toEqual([1, 2, 3, 4]);
  });
});
