
import { IncomingHttpHeaders } from 'http';

interface CustomHeaders extends IncomingHttpHeaders {
    'x-client-id'?: string;
    'x-api-key'?: string;
    'x-device-id'?: string;
}

const extractTokenFromHeaders = (headers: IncomingHttpHeaders): string | null => {
    const authHeader = headers['authorization'] || headers.authorization;

    if (!authHeader) return null;

    const [bearer, token] = authHeader.toString().split(' ');

    if (bearer !== 'Bearer' || !token) return null;

    return token;
};