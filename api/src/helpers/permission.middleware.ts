import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { decode as jwtdecode } from 'hono/jwt';
import HttpStatusCode from '../types/enums/httpstatuses';
import { env } from 'bun';

const checkPermission = (permissions: Array<string>) => async (c: Context, next: Next) => {
    const accessToken = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const { entitlements } = jwtdecode(accessToken).payload;
    const cPermissions = permissions;
    cPermissions.forEach((permission) => {
        if (cPermissions.indexOf(`${permission.split(':')[0]}:*`) === -1) cPermissions.push(`${permission.split(':')[0]}:*`);
    });
    if (cPermissions.indexOf('*:*') === -1) cPermissions.push('*:*');

    if (
        cPermissions.some((e) => {
            return entitlements.includes(e);
        })
    )
        await next();
    else throw new HTTPException(HttpStatusCode.UNAUTHORIZED, { message: 'unauthorized' });
};

export default checkPermission;
