import pc from 'helpers/prismaclient.singleton';
import HttpStatusCode from '../../types/enums/httpstatuses';
import { HTTPException } from 'hono/http-exception';

// Get all users when permission is admin
export const getAllUsers = async () => {
    const users = await pc.user.findMany({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            phone: true,
            email: true,
            status: true,
            createdat: true,
            password: true,
            userpermissions: {
                select: {
                    permission: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            },
            userroles: {
                select: {
                    role: {
                        select: {
                            id: true,
                            name: true,
                            rolepermissions: {
                                select: {
                                    permission: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            id: 'asc',
        },
    });

    if (!users) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'no_users_found' });

    return users;
};
