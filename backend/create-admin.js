const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const User = require('./models/User');

const createAdmin = async (name, email, password, phone) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists. Updating role to admin...');
            existingUser.role = 'admin';
            await existingUser.save();
            console.log('User updated to admin successfully.');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const admin = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                role: 'admin',
                isVerified: true
            });
            
            await admin.save();
            console.log('Admin user created successfully.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

// Default admin details - change as needed
createAdmin('Admin User', 'admin@shreejatours.in', 'admin123', '1234567890');
