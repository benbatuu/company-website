import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const deletePage = async (id: number) => {

    const isPageExist = await pc.page.findFirst({ where: { id: id } });

    if (!isPageExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_found' });

    const page = await pc.page.delete({ where: { id: id } });

    if (!page)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_deleted' })

    return page;
}