const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed from official AkoleTourism.com data...');

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.tourPackage.deleteMany();
  await prisma.touristPlace.deleteMany();
  await prisma.user.deleteMany();

  // Passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // 1. Admin & Users
  await prisma.user.create({
    data: {
      name: 'Pappu Ragade (Tour Organizer)',
      email: 'admin@akole.com',
      mobile: '+91 9420212418',
      password: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'Rahul Sharma',
      email: 'user@akole.com',
      mobile: '+91 9123456789',
      password: userPassword,
      role: 'USER',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    },
  });

  // 2. Unique Official Destinations from AkoleTourism.com (No Duplicates)
  const place1 = await prisma.touristPlace.create({
    data: {
      name: 'Kalsubai Peak (Everest of MH)',
      description: 'Standing at 1,646 meters (5,400 feet), Kalsubai Peak is the highest peak in Maharashtra. Famous for thrilling steel ladder trekking trails, summit Kalsubai temple, and sunrise cloudbed vistas.',
      location: 'Bari Village, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.6006,
      longitude: 73.7103,
      images: JSON.stringify([
        '/places/kalsubai.jpg'
      ]),
      bestTimeToVisit: 'July to March',
      activities: JSON.stringify(['Sunrise Trekking', 'Night Climb', 'Temple Darshan', 'Cloudbed Photography']),
      entryFee: 30,
      status: 'ACTIVE'
    }
  });

  const place2 = await prisma.touristPlace.create({
    data: {
      name: 'Bhandardara Dam & Arthur Lake',
      description: 'A tranquil hill station nestled in the Sahyadri ranges. Known for pristine Arthur Lake, Wilson Dam earthen engineering marvel, lush greenery, and peaceful lakeside camping.',
      location: 'Bhandardara, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5441,
      longitude: 73.7661,
      images: JSON.stringify([
        '/places/bhandardara.jpg'
      ]),
      bestTimeToVisit: 'June to February',
      activities: JSON.stringify(['Boating', 'Lakeside Camping', 'Fireflies Walk', 'Stargazing']),
      entryFee: 50,
      status: 'ACTIVE'
    }
  });

  const place3 = await prisma.touristPlace.create({
    data: {
      name: 'Sandhan Valley – The Valley of Shadows',
      description: 'A deep narrow rock-carved canyon ravine in the Sahyadri mountains near Samrad village. Features full valley traverse, 50ft rappelling, and natural rock pools where sunlight barely enters.',
      location: 'Samrad Village, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5186,
      longitude: 73.6894,
      images: JSON.stringify([
        '/places/sandhan-valley.jpg',
        '/places/samrad-camping.jpg'
      ]),
      bestTimeToVisit: 'November to May',
      activities: JSON.stringify(['Full Valley Descent', 'Rappelling', 'Homestay & Camping', 'Canyon Bouldering']),
      entryFee: 100,
      status: 'ACTIVE'
    }
  });

  const place4 = await prisma.touristPlace.create({
    data: {
      name: 'Harishchandragad & Kokankada',
      description: 'An ancient hill fort dating back to 6th century. Famous for Kokankada cliff offering breathtaking sunset views, and Kedareshwar Cave with its massive Shivling surrounded by ice-cold water.',
      location: 'Khireshwar / Paachnai, Akole, Ahmednagar, Maharashtra',
      latitude: 19.3854,
      longitude: 73.7788,
      images: JSON.stringify([
        '/places/harishchandragad.jpg'
      ]),
      bestTimeToVisit: 'October to March',
      activities: JSON.stringify(['Kokankada Sunset', 'Kedareshwar Cave', 'Fort Camping', 'Historic Exploring']),
      entryFee: 40,
      status: 'ACTIVE'
    }
  });

  const place5 = await prisma.touristPlace.create({
    data: {
      name: 'Ratangad Fort & Nedhe',
      description: 'An 400-year-old fort overlooking Bhandardara Lake. Features Nedhe (Eye of the Needle) - a natural cavity at the summit rock, ancient rock-cut water cisterns, and Ganesh Darwaja.',
      location: 'Ratanwadi, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5082,
      longitude: 73.7042,
      images: JSON.stringify([
        '/places/ratangad.jpg'
      ]),
      bestTimeToVisit: 'September to February',
      activities: JSON.stringify(['Nedhe Hole Visit', 'Fort Trekking', 'Pravara Origin Visit', 'Photography']),
      entryFee: 30,
      status: 'ACTIVE'
    }
  });

  const place6 = await prisma.touristPlace.create({
    data: {
      name: 'Alang-Madan-Kulang (AMK Trek)',
      description: 'The toughest mountain trek in Maharashtra Sahyadris. Involves steep rock climbing, rappelling, and traversing ancient forts Alang, Madan, and Kulang with cavernous hill top stays.',
      location: 'Ambit Village, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5833,
      longitude: 73.6500,
      images: JSON.stringify([
        '/places/amk-trek.jpg'
      ]),
      bestTimeToVisit: 'November to February',
      activities: JSON.stringify(['Extreme Mountaineering', 'Rock Climbing', 'Rappelling', 'Cave Stay']),
      entryFee: 150,
      status: 'ACTIVE'
    }
  });

  const place7 = await prisma.touristPlace.create({
    data: {
      name: 'Randha Fall (170ft Plunge)',
      description: 'A roaring 170-foot waterfall created by Pravara river plunging down a steep gorge. Famous monsoon spectacle and hydro-electric energy generation site.',
      location: 'Randha Village, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5312,
      longitude: 73.8055,
      images: JSON.stringify([
        '/places/randha-falls.jpg'
      ]),
      bestTimeToVisit: 'July to November',
      activities: JSON.stringify(['Gorge Viewpoint', 'Monsoon Photography', 'Local Snacks', 'River Trails']),
      entryFee: 30,
      status: 'ACTIVE'
    }
  });

  const place8 = await prisma.touristPlace.create({
    data: {
      name: 'Umbrella Waterfall (Bhandardara)',
      description: 'Formed at the base of Wilson Dam when water is released during monsoon overflow over natural boulders creating a massive umbrella mist spray.',
      location: 'Wilson Dam Base, Bhandardara, Akole, Maharashtra',
      latitude: 19.5498,
      longitude: 73.7615,
      images: JSON.stringify([
        '/places/umbrella-falls.jpg'
      ]),
      bestTimeToVisit: 'July to October',
      activities: JSON.stringify(['Footbridge View', 'Mist Shower', 'Monsoon Walk', 'Garden Visit']),
      entryFee: 20,
      status: 'ACTIVE'
    }
  });

  const place9 = await prisma.touristPlace.create({
    data: {
      name: 'Shree Amruteshwar Temple (Ratanwadi)',
      description: 'An 8th-century Hemadpanthi stone Shiva temple constructed by Silhara rulers on the banks of Pravara river. Famous for intricate stone carvings and holy pond.',
      location: 'Ratanwadi, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5075,
      longitude: 73.7051,
      images: JSON.stringify([
        '/places/amruteshwar.jpg'
      ]),
      bestTimeToVisit: 'All Year Round',
      activities: JSON.stringify(['Temple Darshan', 'Heritage Architecture', 'Pravara River Walk', 'Photography']),
      entryFee: 0,
      status: 'ACTIVE'
    }
  });

  const place10 = await prisma.touristPlace.create({
    data: {
      name: 'Fofsandi Caves (फोफसंडी लेणी)',
      description: 'A serene valley village surrounded by dense forests and hills. Features ancient rock-cut caves, Gharicha waterfall, and rich tribal heritage.',
      location: 'Fofsandi, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.4500,
      longitude: 73.8167,
      images: JSON.stringify([
        '/places/fofsandi.jpg'
      ]),
      bestTimeToVisit: 'August to February',
      activities: JSON.stringify(['Cave Exploration', 'Valley Trek', 'Tribal Culture Tour', 'Gharicha Waterfall']),
      entryFee: 20,
      status: 'ACTIVE'
    }
  });

  const place11 = await prisma.touristPlace.create({
    data: {
      name: 'Ajoba Parvat Trek',
      description: 'A sacred mountain peak where Valmiki Ashram is situated. Legend says Goddess Sita stayed here during exile and gave birth to Luv & Kush.',
      location: 'Deovne, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.4100,
      longitude: 73.7200,
      images: JSON.stringify([
        '/places/ajoba-parvat.jpg'
      ]),
      bestTimeToVisit: 'September to March',
      activities: JSON.stringify(['Valmiki Ashram Visit', 'Rock Climbing', 'Luv-Kush Footprints View', 'Spiritual Trek']),
      entryFee: 20,
      status: 'ACTIVE'
    }
  });

  const place12 = await prisma.touristPlace.create({
    data: {
      name: 'Padma Shri Rahibai Popere Seed Bank (Combharne)',
      description: 'Home of Padma Shri awardee Rahibai Popere, known as the "Seed Mother" of India. Learn about preservation of 150+ native indigenous crop seeds.',
      location: 'Combharne Village, Akole Taluka, Ahmednagar, Maharashtra',
      latitude: 19.5300,
      longitude: 73.8500,
      images: JSON.stringify([
        '/places/seed-bank.jpg'
      ]),
      bestTimeToVisit: 'All Year Round',
      activities: JSON.stringify(['Indigenous Seed Bank Tour', 'Organic Farming Study', 'Cultural Interaction', 'Agro-Tourism']),
      entryFee: 0,
      status: 'ACTIVE'
    }
  });

  console.log('✅ Created 12 Official Unique Destinations with Authentic Images');

  // 3. Official Packages from AkoleTourism.com
  await prisma.tourPackage.create({
    data: {
      name: 'Sandhan Valley Full Descent Trek & Rappelling',
      description: 'Experience full valley traverse, 50ft rappelling down water pools, overnight canyon camping, and authentic tribal thali meals.',
      destination: 'Samrad Village, Sandhan Valley, Akole',
      duration: '2 Days / 1 Night',
      price: 1850,
      maxPeople: 30,
      availableSeats: 20,
      startDate: new Date('2026-09-15'),
      endDate: new Date('2026-09-16'),
      pickupLocation: 'Kasara Station / Akole Bus Stand',
      includedServices: JSON.stringify(['Technical Rappelling Gear', 'Certified Guides', 'Overnight Camping Tents', 'Dinner & Breakfast']),
      excludedServices: JSON.stringify(['Personal Expenses', 'Mineral Water']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Arrival & Canyon Entry', description: 'Reach Samrad. Enter Sandhan Valley canyon and descend first rock patch.' },
        { day: 'Day 2', title: 'Rappelling & Dehne Base Exit', description: 'Full valley traverse and exit towards Dehne village.' }
      ]),
      images: JSON.stringify([
        '/places/sandhan-valley.jpg',
        '/places/samrad-camping.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place3.id
    }
  });

  await prisma.tourPackage.create({
    data: {
      name: 'Alang Madan Kulang (AMK) Extreme Expedition',
      description: 'Conquer the 3 formidable forts of Sahyadris with expert climb guides Pappu Ragade and Manoj Ragade.',
      destination: 'AMK Fort Range, Akole',
      duration: '3 Days / 2 Nights',
      price: 3200,
      maxPeople: 20,
      availableSeats: 12,
      startDate: new Date('2026-10-01'),
      endDate: new Date('2026-10-03'),
      pickupLocation: 'Kasara / Akole',
      includedServices: JSON.stringify(['Climbing Ropes & Safety Harness', 'Cave Stay', 'All Meals', 'Expert Guides']),
      excludedServices: JSON.stringify(['Insurance']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Alang Fort Summit', description: 'Trek to Alang fort base, ascend rock face, cave stay.' },
        { day: 'Day 2', title: 'Madan Fort & Rappelling', description: 'Traverse Madan fort needle point.' },
        { day: 'Day 3', title: 'Kulang Fort & Descend', description: 'Climb Kulang fort and descend to Ambit.' }
      ]),
      images: JSON.stringify([
        '/places/amk-trek.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place6.id
    }
  });

  await prisma.tourPackage.create({
    data: {
      name: 'Samrad Village Homestay & Camping',
      description: 'Experience peaceful rural homestay in Samrad, stargazing at Sandhan Valley base, bonfire, and Maharashtrian village thali.',
      destination: 'Samrad Village, Akole',
      duration: '2 Days / 1 Night',
      price: 1200,
      maxPeople: 25,
      availableSeats: 15,
      startDate: new Date('2026-09-25'),
      endDate: new Date('2026-09-26'),
      pickupLocation: 'Akole / Kasara',
      includedServices: JSON.stringify(['Homestay / Tent Stay', 'Bonfire', 'Home-cooked Village Thali', 'Guide']),
      excludedServices: JSON.stringify(['Personal Drinks']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Village Welcome & Sunset', description: 'Check-in to rural homestay, sunset stroll near valley lip, bonfire night.' },
        { day: 'Day 2', title: 'Local Sightseeing', description: 'Morning village breakfast, local stream bath, return transfer.' }
      ]),
      images: JSON.stringify([
        '/places/samrad-camping.jpg',
        '/places/sandhan-valley.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place3.id
    }
  });

  await prisma.tourPackage.create({
    data: {
      name: 'Kalsubai Sunrise Trek & Temple Expedition',
      description: 'Climb the highest peak of Maharashtra via steel ladders at night to witness the breathtaking sunrise over the Sahyadri cloud bed.',
      destination: 'Bari Village, Kalsubai Peak, Akole',
      duration: '2 Days / 1 Night',
      price: 1400,
      maxPeople: 35,
      availableSeats: 25,
      startDate: new Date('2026-09-20'),
      endDate: new Date('2026-09-21'),
      pickupLocation: 'Kasara / Bari Village',
      includedServices: JSON.stringify(['Expert Trek Leader', 'Summit Temple Darshan', 'Breakfast & Energy Snacks', 'First Aid Support']),
      excludedServices: JSON.stringify(['Personal Porter Charges']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Midnight Ascent', description: 'Meet at Bari village, brief instructions, and start night trek via iron ladders.' },
        { day: 'Day 2', title: 'Summit Sunrise & Descent', description: 'Reach Kalsubai temple summit by 5:30 AM, witness golden cloud bed sunrise, breakfast in Bari.' }
      ]),
      images: JSON.stringify([
        '/places/kalsubai.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place1.id
    }
  });

  await prisma.tourPackage.create({
    data: {
      name: 'Bhandardara Lakeside Camping & Stargazing',
      description: 'Lakeside tent camping right on the banks of Arthur Lake, campfire, live barbecue, boat ride, and Wilson Dam visit.',
      destination: 'Arthur Lake, Bhandardara, Akole',
      duration: '2 Days / 1 Night',
      price: 1500,
      maxPeople: 40,
      availableSeats: 30,
      startDate: new Date('2026-09-27'),
      endDate: new Date('2026-09-28'),
      pickupLocation: 'Igatpuri / Bhandardara',
      includedServices: JSON.stringify(['Lakeside Camping Tent with Bedding', 'Evening Barbecue & Dinner', 'Arthur Lake Boating', 'Campfire & Music']),
      excludedServices: JSON.stringify(['Extra Watersports']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Lakeside Check-in & Sunset', description: 'Check-in at Arthur Lake tents by 4 PM, enjoy sunset boating and bonfire dinner.' },
        { day: 'Day 2', title: 'Wilson Dam & Randha Falls', description: 'Morning lakeside breakfast, visit Wilson dam and Randha falls.' }
      ]),
      images: JSON.stringify([
        '/places/bhandardara.jpg',
        '/places/randha-falls.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place2.id
    }
  });

  await prisma.tourPackage.create({
    data: {
      name: 'Harishchandragad Kokankada Cliff Trek',
      description: 'Trek to the ancient 6th century fort, camp under the stars, visit Kedareshwar Cave Shivling and experience the sheer drop of Kokankada cliff.',
      destination: 'Khireshwar / Paachnai, Harishchandragad',
      duration: '2 Days / 1 Night',
      price: 1750,
      maxPeople: 25,
      availableSeats: 18,
      startDate: new Date('2026-10-05'),
      endDate: new Date('2026-10-06'),
      pickupLocation: 'Kasara / Otur',
      includedServices: JSON.stringify(['Cave / Tent Camping', 'All Authentic Village Meals', 'Kokankada Guided Sunset', 'Temple Exploration']),
      excludedServices: JSON.stringify(['Personal Expenses']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Ascent to Fort & Sunset', description: 'Trek via Paachnai route, visit ancient temples, sunset at Kokankada.' },
        { day: 'Day 2', title: 'Kedareshwar Cave & Return', description: 'Visit cold water Kedareshwar cave, descend and transfer back.' }
      ]),
      images: JSON.stringify([
        '/places/harishchandragad.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place4.id
    }
  });

  await prisma.tourPackage.create({
    data: {
      name: 'Ratangad Fort & Amruteshwar Heritage Trail',
      description: 'Explore the 400-year-old jewel fort of Sahyadri, climb through Nedhe natural needle hole, and explore the 8th century Amruteshwar stone temple.',
      destination: 'Ratanwadi Village, Akole',
      duration: '1 Day / Full Day',
      price: 1100,
      maxPeople: 30,
      availableSeats: 22,
      startDate: new Date('2026-09-18'),
      endDate: new Date('2026-09-18'),
      pickupLocation: 'Bhandardara / Shendi',
      includedServices: JSON.stringify(['Certified Trek Guide', 'Heritage Temple Darshan', 'Authentic Maharashtrian Lunch', 'Entry Tickets']),
      excludedServices: JSON.stringify(['Travel to Base']),
      itinerary: JSON.stringify([
        { day: 'Day 1', title: 'Temple Visit & Fort Climb', description: 'Morning visit to Amruteshwar temple, ascend Ratangad, view Bhandardara from Nedhe cavity, return by evening.' }
      ]),
      images: JSON.stringify([
        '/places/ratangad.jpg',
        '/places/amruteshwar.jpg'
      ]),
      status: 'ACTIVE',
      placeId: place5.id
    }
  });

  console.log('✅ Created Official AkoleTourism.com Packages');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
