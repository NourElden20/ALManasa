const  {PrismaClient}  = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL 
  const adminPassword = process.env.ADMIN_PASSWORD 
  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: adminEmail,
      passwordHash: hashedPassword,
      phoneNumber: adminPhoneNumber,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
