import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getSinglePage = async (pageID: number) => {

    const isPageExist = await pc.page.findUnique({ where: { id: pageID } });

    if (!isPageExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_found' })

    const page = await pc.page.findUnique({
        where: { id: pageID },
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

    return page;
}