import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';

export const activePage = async (id: number, userID: number) => {

    const isPageExist = await pc.page.findFirst({ where: { id: id } });

    if (!isPageExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_found' });

    if (isPageExist?.isactive === ServiceStatus.ACTIVE)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_already_active' });

    const page = await pc.page.update({
        where: { id: id },
        data: {
            isactive: ServiceStatus.ACTIVE,
            updatedat: new Date(),
            updatedby: userID
        }
    });

    if (!page)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_active' })

    return page;
}