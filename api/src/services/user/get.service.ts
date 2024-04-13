import pc from 'helpers/prismaclient.singleton';
import HttpStatusCode from '../../types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

export const getUserById = async (id: number) => {
    const user = await pc.user.findFirst({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            password: true,
            phone: true,
            createdat: true,
            createdby: true,
            userroles: {
                select: {
                    role: {
                        select: {
                            name: true,
                            rolepermissions: {
                                select: {
                                    permission: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            userpermissions: {
                select: {
                    permission: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        where: { id: id },
    });

    if (!user) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'no_selected_user_found' });

    return user;
};
