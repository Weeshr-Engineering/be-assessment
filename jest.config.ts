module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
