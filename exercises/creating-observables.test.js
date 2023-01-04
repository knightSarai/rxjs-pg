import { describe, it, expect } from "vitest";
import { from } from "rxjs";

describe("from", () => {
  it.skip('should create an observable from a generator', () => {
    function* values() {
      yield 1;
      yield 2;
      yield 3;
      return 4;
    }

    const result = [];
    const observable$ = from(values());
    observable$.subscribe((value) => result.push(value));

    // We only expect the values 1, 2, 3 to be emitted, return is a sign of completion
    expect(result).toEqual([1, 2, 3]);
  });

  it.skip('should create an observable from a promise',  () => new Promise((done) => {
    const promise = Promise.resolve(1);
    
    const result = [];
    const observable$ = from(promise);

    observable$.subscribe({
      next: (value) => result.push(value),
      complete: () =>  {
        expect(result).toEqual([1]);
        done();
      }
    });
  }))

  it('should create an observable from a promise that rejects', ()=> new Promise((done) => {
    const promise = Promise.reject({ error: 'Something terrible happened' });

    const observable$ = from(promise);
    observable$.subscribe({
      error: (error) => {
        expect(error).toEqual({ error: 'Something terrible happened' });
        done();
      }
    });
  }));

})
