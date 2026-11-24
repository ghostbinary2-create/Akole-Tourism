const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAndUnblock() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true }
    });
    console.log('Current users in DB:', JSON.stringify(users, null, 2));

    const blockedUsers = users.filter(u => u.status === 'BLOCKED');
    if (blockedUsers.length > 0) {
      console.log(`Found ${blockedUsers.length} blocked user(s). Unblocking...`);
      const updateResult = await prisma.user.updateMany({
        where: { status: 'BLOCKED' },
        data: { status: 'ACTIVE' }
      });
      console.log('Updated users count:', updateResult.count);
    } else {
      console.log('No users with BLOCKED status found.');
    }
  } catch (error) {
    console.error('Error checking/unblocking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAndUnblock();
