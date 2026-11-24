/**
 * Generates unique booking ID formatted like: AKL202600001
 */
const generateBookingId = async (prisma) => {
  const currentYear = new Date().getFullYear();
  const prefix = `AKL${currentYear}`;

  const count = await prisma.booking.count();
  const nextNumber = (count + 1).toString().padStart(5, '0');

  const bookingId = `${prefix}${nextNumber}`;
  return bookingId;
};

module.exports = {
  generateBookingId,
};
