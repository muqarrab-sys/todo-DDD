import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    console.log('🌱  Starting the seeding process\n');
    await seedUserWithTodos(10);
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

async function seedUserWithTodos(num: number = 1) {
  for (let i = 0; i < num; i++) {
    const user = await prisma.user.create({
      data: {
        uid: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.word.adjective(),
        gender: 'male',
        dob: faker.date.birthdate(),
        todos: {
          createMany: {
            data: [
              {
                uid: faker.datatype.uuid(),
                title: faker.word.verb(),
                description: faker.lorem.paragraph(),
                dueDate: faker.date.future(),
                isCompleted: faker.datatype.boolean(),
              },
              {
                uid: faker.datatype.uuid(),
                title: faker.word.verb(),
                description: faker.lorem.paragraph(),
                dueDate: faker.date.future(),
                isCompleted: faker.datatype.boolean(),
              },
            ],
          },
        },
      },
    });

    console.log(`🌱  seed user (${i + 1}): ${user.uid}`);
  }
}
