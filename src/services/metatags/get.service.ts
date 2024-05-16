import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getSingleMetaTag = async (id: number) => {
    const metaTag = await pc.meta.findFirst({ where: { id: id } });

    if (!metaTag)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'metatag_not_found' });

    return metaTag;
}