import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getMetaTags = async () => {
    const metaTags = await pc.meta.findMany();

    if (!metaTags)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'metatags_not_found' });

    return metaTags;
}