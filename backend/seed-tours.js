const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Tour = require('./models/Tour');

const tours = [
    {
        name: 'Mahabaleshwar & Panchgani Retreat',
        destination: 'Mahabaleshwar',
        price: 8500,
        duration: '2 Days / 1 Night',
        description: 'Experience the strawberry capital of India. Visit Venna Lake, Mapro Garden, and breathtaking viewpoints in the Sahyadri range.',
        maxGroupSize: 15,
        rating: 4.8,
        images: ['mahabaleshwar1.jpg']
    },
    {
        name: 'Ajanta & Ellora Heritage Tour',
        destination: 'Aurangabad',
        price: 15000,
        duration: '3 Days / 2 Nights',
        description: 'Explore the UNESCO World Heritage sites of Ajanta and Ellora caves, showcasing ancient Indian rock-cut architecture and art.',
        maxGroupSize: 12,
        rating: 4.9,
        images: ['ajanta1.jpg']
    }
];

const seedTours = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');
        
        for (const tour of tours) {
            const existing = await Tour.findOne({ name: tour.name });
            if (!existing) {
                await new Tour(tour).save();
                console.log(`Added tour: ${tour.name}`);
            } else {
                console.log(`Tour already exists: ${tour.name}`);
            }
        }
        
        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding tours:', err);
        process.exit(1);
    }
};

seedTours();
