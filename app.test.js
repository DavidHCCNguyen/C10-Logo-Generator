const readline = require('readline');
const fs = require('fs');
const { spawn } = require('child_process');

jest.mock('readline');
jest.mock('fs');
jest.mock('child_process');

const { promptUser } = require('./app');

describe('App', () => {
  let stdoutMock;

  beforeEach(() => {
    stdoutMock = {
      write: jest.fn(),
    };
    readline.createInterface.mockReturnValue({
      question: jest.fn().mockImplementationOnce((_, callback) => callback('ABC'))
        .mockImplementationOnce((_, callback) => callback('red'))
        .mockImplementationOnce((_, callback) => callback('circle'))
        .mockImplementationOnce((_, callback) => callback('blue'))
        .mockImplementationOnce((_, callback) => callback()),
      close: jest.fn().mockImplementationOnce(() => {
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          'logo.svg',
          expect.any(String)
        );
        expect(stdoutMock.write).toHaveBeenCalledWith('Generated logo.svg\n');
        expect(spawn).toHaveBeenCalledWith('open', ['logo.svg']);
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
        expect(stdoutMock.write).toHaveBeenCalledTimes(1);
        expect(spawn).toHaveBeenCalledTimes(1);
      }),
    });
    process.stdout = stdoutMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('promptUser function', () => {
    promptUser();
    expect(readline.createInterface).toHaveBeenCalled();
    expect(readline.createInterface().question).toHaveBeenCalledTimes(4);
  });
});
