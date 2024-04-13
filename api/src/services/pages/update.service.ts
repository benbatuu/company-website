import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';
import { slugify } from 'helpers/helpers';

export const updatePage = async (id: number, name: string, content: string, userID: number) => {

    const isPageExist = await pc.page.findFirst({ where: { id: id }, select: { isactive: true } });

    if (!isPageExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_found' });

    if (isPageExist?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_already_passive_first_active_the_page' });

    const page = await pc.page.update({
        where: { id: id },
        data: {
            name: name,
            slug: slugify(name, "-"),
            content: content,
            updatedby: userID,
            updatedat: new Date(),
        }
    });

    if (!page)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_updated' })

    return page;
}