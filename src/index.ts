import { loadavg, platform, release, uptime, hostname } from 'os';

export interface ILog {
  [key: string]: (msg: string) => void;
  info(msg: string | object): void;
  error(msg: string | object): void;
}

const print = (): ILog => {
  const write = (msg: string, stream: any) => stream.write(msg);
  const info = (msg: string) => write(msg, process.stdout);
  const error = (msg: string) => write(msg, process.stderr);

  return { info, error };
};

const parseMsg = (msg: string | object) => {
  return typeof msg === 'string' ? `"${msg}"` : JSON.stringify(msg);
};

const getMemory = () => {
  const { rss, heapTotal, heapUsed, external } = process.memoryUsage();
  return `"memory":{"rss":"${rss}","heapTotal":"${heapTotal}","heapUsed":"${heapUsed}","external":"${external}"}`;
};

//
// MAIN fn
//

export default ({ origin }: { origin: string }): ILog => {
  const logger: ILog = print();

  const defaultMsg = ({
    type,
    msg,
  }: {
    type: string;
    msg: string | object;
  }): string =>
    `{"pid":${
      process.pid
    },"os":{"loadavg":"[${loadavg()}]","release":"${release()}","hostname":"${hostname()}","platform":"${platform()}","uptime":"${uptime()}"},${getMemory()},"type":"${type}", "timestamp":${Date.now()},"msg":${msg},"origin":"${origin}"}`;

  const handler = (method: string) => (msg: string | object) =>
    logger[method](defaultMsg({ type: method, msg: parseMsg(msg) }));

  return {
    info: handler('info'),
    error: handler('error'),
  };
};
