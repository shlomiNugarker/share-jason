"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAddNewHosts = exports.addNewHosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const ButterflyHost_1 = require("./src/models/ButterflyHost");
// Load environment variables
dotenv_1.default.config();
// Import the staticList from links.ts
const links_1 = require("./src/links");
// Get MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shareJson';
// Function to drop collection and add new data
function addNewHosts() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn = null;
        try {
            // Connect to MongoDB
            console.log('Connecting to MongoDB...');
            yield mongoose_1.default.connect(MONGO_URI);
            conn = mongoose_1.default.connection;
            console.log('Connected to MongoDB');
            // Check if collection exists and drop it
            if (conn && conn.db) {
                const collections = yield conn.db.listCollections({ name: 'butterfly-hosts' }).toArray();
                if (collections.length > 0) {
                    console.log('Collection butterfly-hosts exists, dropping it...');
                    yield conn.db.dropCollection('butterfly-hosts');
                    console.log('Collection dropped successfully');
                }
                else {
                    console.log('Collection butterfly-hosts does not exist yet');
                }
            }
            // Add the data from links.ts
            console.log(`Adding ${links_1.staticList.length} items from links.ts...`);
            // Filter out invalid items
            const validItems = links_1.staticList.filter(item => item.url && item.title && item.imageUrl &&
                typeof item.url === 'string' &&
                typeof item.title === 'string' &&
                typeof item.imageUrl === 'string');
            const skippedCount = links_1.staticList.length - validItems.length;
            if (skippedCount > 0) {
                console.log(`Skipping ${skippedCount} invalid items (missing required fields)`);
            }
            if (validItems.length === 0) {
                console.log('No valid items to add. Check your data source.');
            }
            else {
                const result = yield ButterflyHost_1.ButterflyHost.insertMany(validItems);
                console.log(`Successfully added ${result.length} items to butterfly-hosts collection`);
            }
            // Check final count
            const countAfter = yield ButterflyHost_1.ButterflyHost.countDocuments();
            console.log(`Collection now has ${countAfter} documents`);
        }
        catch (error) {
            console.error('Error processing hosts:', error);
        }
        finally {
            // Close MongoDB connection if not used by server
            if (conn && process.env.NODE_ENV !== 'production') {
                yield mongoose_1.default.disconnect();
                console.log('MongoDB connection closed');
            }
        }
    });
}
exports.addNewHosts = addNewHosts;
// Function to run from server without mongoose disconnection
function runAddNewHosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield addNewHosts();
            console.log('Butterfly hosts process completed');
        }
        catch (err) {
            console.error('Butterfly hosts process failed:', err);
        }
    });
}
exports.runAddNewHosts = runAddNewHosts;
// Run the function if this script is executed directly
if (require.main === module) {
    addNewHosts()
        .then(() => {
        console.log('Process completed');
        process.exit(0);
    })
        .catch((err) => {
        console.error('Process failed:', err);
        process.exit(1);
    });
}
