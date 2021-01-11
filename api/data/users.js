import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Karim',
        email: 'karim@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Aloa',
        email: 'al@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'jhondoe',
        email: 'doe@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'olay',
        email: 'olay@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
];

export default users;