import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getAllPages = async () => {
    const pages = await pc.page.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            content: true,
            isactive: true,
            createdat: true,
            updatedat: true,
            createdby: true,
            updatedby: true
        }
    });

    if (!pages)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_found' })

    return pages;
}