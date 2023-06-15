module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    'node_modules/@engi.network/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@engi.network/.*)'],
};
