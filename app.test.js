const readline = require('readline');
const { promptUser } = require('./index');

jest.mock('readline');

// Define a test suite using the describe function
describe('index', () => {
  let stdoutMock;
  let rlInterfaceMock;

  // Run this code before each test case
  beforeEach(() => {
    stdoutMock = {
      write: jest.fn(),
    };

    rlInterfaceMock = {
      question: jest.fn(),
      close: jest.fn().mockImplementationOnce(() => {
        // Expectations for the behavior of fs.writeFileSync and stdoutMock.write
      }),
    };

    // Mock the readline.createInterface function to return the mocked rlInterfaceMock
    readline.createInterface.mockReturnValue(rlInterfaceMock);

    // Assign the stdoutMock to the process.stdout object
    process.stdout = stdoutMock;
  });

  // Run this code after each test case
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test the promptUser function
  test('promptUser function', () => {
    // Set up mock implementations for rlInterfaceMock.question
    rlInterfaceMock.question
      .mockImplementationOnce((_, callback) => callback('ABC'))
      .mockImplementationOnce((_, callback) => callback('red'))
      .mockImplementationOnce((_, callback) => callback('circle'))
      .mockImplementationOnce((_, callback) => callback('blue'))
      .mockImplementationOnce((_, callback) => callback());

    // Call the promptUser function
    promptUser();

    // Assertions to verify the expected behavior
    expect(readline.createInterface).toHaveBeenCalled();
    expect(rlInterfaceMock.question).toHaveBeenCalledTimes(4);
    expect(rlInterfaceMock.close).toHaveBeenCalledTimes(1);
  });
});
