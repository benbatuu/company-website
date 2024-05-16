import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const archivePage = async (id: number, userID: number) => {

    const isPageExist = await pc.page.findFirst({ where: { id: id } });

    if (!isPageExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_found' });

    if (isPageExist?.isactive === ServiceStatus.PASSIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_already_passive' });

    const page = await pc.page.update({
        where: { id: id },
        data: {
            isactive: ServiceStatus.PASSIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!page)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_archived' })

    return page;
}