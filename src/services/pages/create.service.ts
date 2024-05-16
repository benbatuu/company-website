import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';
import { slugify } from 'helpers/helpers';

export const createPage = async (
    name: string,
    content: { type: string, value: string },
    metaID: number,
    serviceID: number,
    userID: number
) => {

    const isPageExist = await pc.page.findFirst({ where: { name: name }, select: { isactive: true } });

    if (isPageExist)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_already_created' });

    const page = await pc.page.create({
        select: {
            id: true,
            name: true,
            slug: true,
            content: true,
            service: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    isactive: true,
                    servicecategory: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            isactive: true,
                        }
                    }
                }
            },
            metatags: {
                select: {
                    metatitle: true,
                    metadescription: true,
                    metaauthor: true,
                    metahttpequiv: true,
                    metakeywords: true,
                    metalanguage: true,
                    metarevisit: true,
                    metarobots: true,
                }
            }
        },
        data: {
            name: name,
            slug: slugify(name, "-"),
            content: content,
            metaid: metaID,
            createdby: userID,
            serviceid: serviceID,
            createdat: new Date(),
        }
    });

    if (!page)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'page_not_created' })

    return page;
}