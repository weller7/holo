import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [

  {
    email: "alex.o@mail.com",
    fullName: "Alex O'Hare",
    password: "123456",
    profilePic: "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F4rlsiu0uwzh91.jpg%3Fwidth%3D3840%26format%3Dpjpg%26auto%3Dwebp%26s%3D3523f8c8c41c64a8b5e01d48e4640a249741b648",
  },
  {
    email: "olivia.r@mail.com",
    fullName: "Olivia Rhodes",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  {
    email: "nora.w@mail.com",
    fullName: "Nora Watson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
  },

  

  {
    email: "maxg@mail.com",
    fullName: "Maxwell Gray",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg",
  },
  {
    email: "troyb@mail.com",
    fullName: "Troy Buchanan",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/2209315/pexels-photo-2209315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    email: "vikv@example.com",
    fullName: "Viktor Vektor",
    password: "123456",
    profilePic: "https://assetsio.gnwcdn.com/victorvektor.png?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
  },

  {
    email: "dee.v@example.com",
    fullName: "David Martinez",
    password: "123456",
    profilePic: "https://pbs.twimg.com/media/Fc8uyA7WQAEfdq1.jpg",
  },

];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();