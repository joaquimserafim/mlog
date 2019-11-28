import 'jest-extended';

const { stdout, stderr } = process;

import log, { ILog } from './index';

describe('Testing `mlog`', () => {
  let logger: ILog;
  let captureStdout: string = '';
  let captureStderr: string = '';

  // beforeAll(() => {
  //   process.stdout.write = (msg: string): boolean => {
  //     return true;
  //   };
  // });

  test('Checking if when imported `mlog` returns a function', () => {
    expect(log).toBeFunction();
  });

  logger = log({ origin: 'testing' });

  test('Checking if when initialized returns the methods `info` & `error`', () => {
    expect(logger).toContainAllKeys(['info', 'error']);
  });

  test('Checking `info` is a function`', () => {
    expect(logger.info).toBeFunction();
  });

  test('Checking `error` is a function`', () => {
    expect(logger.error).toBeFunction();
  });

  //
  // testing the output by capturing what process.stdout.write
  // and process.stderr.write will write to the output
  //

  beforeEach(() => {
    const stdoutWrite = process.stdout.write;
    const stderrtWrite = process.stderr.write;

    process.stdout.write = (text: string): boolean => {
      captureStdout = text;
      process.stdout.write = stdoutWrite;
      process.stdout.write(text);
      return true;
    };

    process.stderr.write = (text: string): boolean => {
      captureStderr = text;
      process.stderr.write = stderrtWrite;
      process.stderr.write(text);
      return true;
    };
  });

  test('Processing a log entry with an `error` message', () => {
    logger.error('this is an error message');

    const entry = JSON.parse(captureStderr);

    expect(entry).toContainAllKeys([
      'pid',
      'os',
      'memory',
      'type',
      'timestamp',
      'msg',
      'origin',
    ]);
    expect(entry.msg).toBe('this is an error message');
  });

  test('Processing a log entry with an `info` message', () => {
    logger.info('this is an info message');

    const entry = JSON.parse(captureStdout);

    expect(entry).toContainAllKeys([
      'pid',
      'os',
      'memory',
      'type',
      'timestamp',
      'msg',
      'origin',
    ]);
    expect(entry.msg).toBe('this is an info message');
  });

  test('Processing a log entry with an `info` object', () => {
    logger.info({
      headers: [{ 'content-type': 'application/javascript' }],
      body: { hello: 'world' },
    });

    const entry = JSON.parse(captureStdout);

    expect(entry).toContainAllKeys([
      'pid',
      'os',
      'memory',
      'type',
      'timestamp',
      'msg',
      'origin',
    ]);
    expect(entry.msg).toBeObject();
  });
});
