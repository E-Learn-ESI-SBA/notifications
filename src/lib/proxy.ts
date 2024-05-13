
import httpProxyAgent from 'https-proxy-agent';

export const httpAgent = new httpProxyAgent.HttpsProxyAgent("http://0.0.0.0:3000")
