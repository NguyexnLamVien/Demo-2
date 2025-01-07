import { User } from "@modules/user/users.model";
import { hashPassword } from "@modules/util/bcrypt";
import { connectDB } from '@config/database';
const { faker } = require('@faker-js/faker');

connectDB();
const seedUsers = async () => {
    try {
        for (let index = 0; index < 20; index++) {
            const hashedPassword = await hashPassword('123'); // Hash mật khẩu
            await User.create({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: hashedPassword,
            });
        }
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error during seeding:', error);
    }
};

// // Gọi hàm seed
// seedUsers();


// const seedUsers = async () => {
//     try {
//         const userPromises = Array.from({ length: 20 }).map(async () => {
//             const hashedPassword = await hashPassword('123');
//             return User.create({
//                 name: faker.name.fullName(),
//                 email: faker.internet.email(),
//                 password: hashedPassword,
//             });
//         });

//         await Promise.all(userPromises); // Chạy song song
//         console.log('Seeding completed successfully!');
//     } catch (error) {
//         console.error('Error during seeding:', error);
//     }
// };

// seedUsers();
