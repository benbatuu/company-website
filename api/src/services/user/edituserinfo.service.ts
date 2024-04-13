import pc from 'helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../types/enums/httpstatuses';

export const editUserInfoService = async (firstname: string, lastname: string, email: string, phone: string, userid: number) => {
    const user = await pc.user.update({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            password: true,
            phone: true,
        },
        where: {
            id: userid,
        },
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            updatedby: userid,
        },
    });

    if (!user) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'user_couldnt_updated' });

    return user;
};
