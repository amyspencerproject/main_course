const { myFlatMap, myConcat, myReject } = require("./lodash_replica");

describe.skip("myFlatMap", () => {
  it("flattens an array", () => {
    expect(myFlatMap([1, 2, [3, 4, 5, 6, [7, 8, 9, [10]]]])).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });
});

describe.skip("myConcat", () => {
  it("concatenates multiple items in an array", () => {
    expect(myConcat([1], [2], [3])).toEqual([1, 2, 3]);
  });
});

describe.skip("myReject", () => {
  it("rejects an item in an array", () => {
    expect(myReject([1, 2, 3], 3)).toEqual([1, 2]);
  });
});
