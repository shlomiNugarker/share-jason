"use strict";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { ButterflyHost } from './src/models/ButterflyHost';
// // Load environment variables
// dotenv.config();
// // Import the staticList from links.ts
// import { staticList } from './src/links';
// // Get MongoDB connection string from environment variables
// const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/shareJson';
// // Function to drop collection and add new data
// export async function addNewHosts(): Promise<void> {
//   let conn: mongoose.Connection | null = null;
//   try {
//     // Connect to MongoDB
//     console.log('Connecting to MongoDB...');
//     await mongoose.connect(MONGO_URI);
//     conn = mongoose.connection;
//     console.log('Connected to MongoDB');
//     // Check if collection exists and drop it
//     if (conn && conn.db) {
//       const collections = await conn.db.listCollections({name: 'butterfly-hosts'}).toArray();
//       if (collections.length > 0) {
//         console.log('Collection butterfly-hosts exists, dropping it...');
//         await conn.db.dropCollection('butterfly-hosts');
//         console.log('Collection dropped successfully');
//       } else {
//         console.log('Collection butterfly-hosts does not exist yet');
//       }
//     }
//     // Add the data from links.ts
//     console.log(`Adding ${staticList.length} items from links.ts...`);
//     // Filter out invalid items
//     const validItems = staticList.filter(item => 
//       item.url && item.title && item.imageUrl && 
//       typeof item.url === 'string' && 
//       typeof item.title === 'string' && 
//       typeof item.imageUrl === 'string'
//     );
//     const skippedCount = staticList.length - validItems.length;
//     if (skippedCount > 0) {
//       console.log(`Skipping ${skippedCount} invalid items (missing required fields)`);
//     }
//     if (validItems.length === 0) {
//       console.log('No valid items to add. Check your data source.');
//     } else {
//       const result = await ButterflyHost.insertMany(validItems);
//       console.log(`Successfully added ${result.length} items to butterfly-hosts collection`);
//     }
//     // Check final count
//     const countAfter: number = await ButterflyHost.countDocuments();
//     console.log(`Collection now has ${countAfter} documents`);
//   } catch (error) {
//     console.error('Error processing hosts:', error);
//   } finally {
//     // Close MongoDB connection if not used by server
//     if (conn && process.env.NODE_ENV !== 'production') {
//       await mongoose.disconnect();
//       console.log('MongoDB connection closed');
//     }
//   }
// }
// // Function to run from server without mongoose disconnection
// export async function runAddNewHosts(): Promise<void> {
//   try {
//     await addNewHosts();
//     console.log('Butterfly hosts process completed');
//   } catch (err) {
//     console.error('Butterfly hosts process failed:', err);
//   }
// }
// // Run the function if this script is executed directly
// if (require.main === module) {
//   addNewHosts()
//     .then(() => {
//       console.log('Process completed');
//       process.exit(0);
//     })
//     .catch((err: Error) => {
//       console.error('Process failed:', err);
//       process.exit(1);
//     });
// }
