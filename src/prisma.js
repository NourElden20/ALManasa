// Use destructuring to get PrismaClient from the default export
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;