import { describe, expect, it } from "bun:test";
import finale from "./index";

describe("finale", () => {
  it("should project the finishing time correctly", (done) => {
    const projector = finale();
    setTimeout(() => {
      const projectedFinish = projector(0.5);
      const correctProjection = new Date().getTime() + 100;

      try {
        expect(Math.abs(projectedFinish - correctProjection)).toBeLessThan(50);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });

  it("should take a time as a parameter", (done) => {
    const start = new Date().getTime() - 100;
    const projector = finale(start);
    setTimeout(() => {
      const projectedFinish = projector(0.5);
      const correctProjection = start + 400;

      try {
        expect(Math.abs(projectedFinish - correctProjection)).toBeLessThan(50);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });

  it("should give an error if progress is not in the accepted range", () => {
    expect(() => finale()(-1)).toThrow(/progress/);
    expect(() => finale()(2)).toThrow(/progress/);
  });
});
