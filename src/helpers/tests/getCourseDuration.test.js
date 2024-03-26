import { getCourseDuration } from "../getCourseDuration";

describe("getCourseDuration function", () => {
  it("returns formatted duration when duration is greater than or equal to 60", () => {
    expect(getCourseDuration(65)).toBe("01:05 hour");
    expect(getCourseDuration(120)).toBe("02:00 hours");
  });

  it("returns formatted duration when duration is less than 60", () => {
    expect(getCourseDuration(30)).toBe("00:30 hours");
    expect(getCourseDuration(5)).toBe("00:05 hours");
  });

  it("returns formatted duration with leading zero for single-digit values", () => {
    expect(getCourseDuration(5)).toBe("00:05 hours");
    expect(getCourseDuration(9)).toBe("00:09 hours");
  });
});
