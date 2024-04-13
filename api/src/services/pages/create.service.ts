import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import ServiceStatus from 'types/enums/servicestatus';
import { slugify } from 'helpers/helpers';

export const createPage = async (
    name: string,
    content: object,
    metaID: number,
    serviceID: number,
    userID: number
) => {

    const isPageExist = await pc.page.findFirst({ where: { name: name }, select: { isactive: true } });

    if (isPageExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_already_created' });

    const page = await pc.page.create({
        data: {
            name: name,
            slug: slugify(name, "-"),
            content: content.toString(),
            metaid: metaID,
            createdby: userID,
            serviceid: serviceID,
            createdat: new Date(),
            isactive: ServiceStatus.ACTIVE,
        }
    });

    if (!page)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_created' })

    return page;
}