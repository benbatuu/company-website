import pc from 'helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../types/enums/httpstatuses';

// User Create when createdby permission is admin
export const updateService = async (
    userid: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string | undefined,
    userroles: Array<number>,
    userpermissions: Array<number>,
    updatedby: number
) => {
    // Roller ve permissionlar güncellenmiyor. Onları ekle.
    const user = await pc.user.findUnique({ where: { id: userid } });
    if (!user) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'no_selected_user_found' });
    if (user.email !== email) {
        const emailExists = await pc.user.findFirst({ where: { email: email } });
        if (emailExists) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'email_already_exists' });
        else {
            await pc.user.update({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
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
                where: {
                    id: userid,
                },
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    updatedat: new Date(),
                    updatedby: updatedby,
                    phone: phone,
                },
            });

            await pc.userrole.deleteMany({
                where: {
                    userid: userid,
                },
            });

            await pc.userrole.createMany({
                data: userroles.map((role) => {
                    return {
                        roleid: role,
                        createdby: updatedby,
                        createdat: new Date(),
                        userid: userid,
                    };
                }),
            });

            await pc.userpermission.deleteMany({
                where: {
                    userid: userid,
                },
            });

            await pc.userpermission.createMany({
                data: userpermissions.map((permission) => {
                    return {
                        permissionid: permission,
                        createdby: updatedby,
                        createdat: new Date(),
                        userid: userid,
                    };
                }),
            });
        }
    } else {
        await pc.user.update({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
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
            where: {
                id: userid,
            },
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                updatedat: new Date(),
                updatedby: updatedby,
                phone: phone,
            },
        });


        await pc.userrole.deleteMany({
            where: {
                userid: userid,
            },
        });

        await pc.userrole.createMany({
            data: userroles.map((role) => {
                return {
                    roleid: role,
                    createdby: updatedby,
                    createdat: new Date(),
                    userid: userid,
                };
            }),
        });

        await pc.userpermission.deleteMany({
            where: {
                userid: userid,
            },
        });

        await pc.userpermission.createMany({
            data: userpermissions.map((permission) => {
                return {
                    permissionid: permission,
                    createdby: updatedby,
                    createdat: new Date(),
                    userid: userid,
                };
            }),
        });
    }
    return { data: user, message: 'user_updated_successfully' };
};
