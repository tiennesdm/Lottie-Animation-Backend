const { handleFileUpload } = require('./../helper/fileUpload');
const Lottie = require('../database/models/lottie');
const { GraphQLUpload } = require('graphql-upload');
const path = require('path');
const fs = require('fs');
const {getAllLotties, searchLottie, saveLottie} = require('./../database/query/lottie');


const staticURL = 'http://localhost:3000/data/'; 

const lottieResolver = {
  Upload: GraphQLUpload,

  Query: {
    lotties: async () => {
      try {
        return await getAllLotties();
      } catch (err) {
        console.error('Error fetching Lotties:', err);
        throw new Error(`Failed to fetch Lotties: ${err.message}`);
      }
    },
    lottie: async (_, { id }) => {
      try {
        const lottie = await Lottie.findById(id);
        if (!lottie) {
          throw new Error(`Lottie with ID ${id} not found`);
        }
        return lottie;
      } catch (err) {
        console.error('Error fetching Lottie by ID:', err);
        throw new Error(`Failed to fetch Lottie: ${err.message}`);
      }
    },
    searchLotties: async (_, { query }) => {
      try {
        // Perform a case-insensitive search on name and description
        const results = searchLottie(query);
        return results;
      } catch (err) {
        console.error('Error searching for Lotties:', err);
        throw new Error(`Failed to search Lotties: ${err.message}`);
      }
    },
  },

  Mutation: {
    uploadLottie: async (_, { file, name, description }) => {
      try {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();

        // Generate a unique file path
        const uploadsDir = path.join(__dirname, './../data');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filePath = path.join(uploadsDir, `${Date.now()}-${filename}`);

        // Handle file upload
        await handleFileUpload(stream, filePath);

        // Read file content for validation
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Validate if the file is a Lottie file
        const isValidLottie = checkIfValidLottie(fileContent);
        if (!isValidLottie) {
          fs.unlinkSync(filePath); // Delete the file if it's not a valid Lottie file
          throw new Error('The uploaded file is not a valid Lottie file.');
        }

        // Create Lottie object
        const lottie = {
          id: lotties.length + 1,
          filename,
          mimetype: file.mimetype,
          encoding: file.encoding,
          url: `${staticURL.join(path.basename(filePath))}`,
          name,
          description,
          isValidLottie,
        };
        // Save to MongoDB
        const savedLottie = await saveLottie(filename, file.mimetype,file.encoding,lottie.url, name, description, isValidLottie);

        return {
          id: savedLottie._id,
          filename: filename, 
          mimetype: file.mimetype || null,
          encoding: file.encoding || null,
          url: lottie.url,
          name,
          description,
          isValidLottie,
        };
        
      } catch (err) {
        console.error('Error uploading Lottie file:', err);
        // Ensure the file is deleted if there's an error
        const filePath = path.join(__dirname, `./../data/${Date.now()}-${filename}`);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        throw new Error(`Failed to upload Lottie file: ${err.message}`);
      }
    },
  },
};

// Function to check if a file is a valid Lottie file
function checkIfValidLottie(fileContent) {
  try {
    const parsed = JSON.parse(fileContent);
    return parsed.hasOwnProperty('v') && parsed.hasOwnProperty('fr') && parsed.hasOwnProperty('ip');
  } catch (error) {
    return false;
  }
}

module.exports = lottieResolver;
