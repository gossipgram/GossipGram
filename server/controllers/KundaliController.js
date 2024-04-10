const Kundali = require('../models/Kundali');

// exports.createKundali = async (req, res) => {               // under processing
//     try {
//         const {
//             user,
//             state,
//             city,
//             age,
//             hobbies,
//             languages,
//             religion,
//             occupation,
//             movies,
//             food,
//             songs
//         } = req.body;

//         const kundali = new Kundali({
//             user,
//             state,
//             city,
//             age,
//             hobbies,
//             languages,
//             religion,
//             occupation,
//             movies,
//             food,
//             songs
//         });

//         if (!state || !city || !age || !hobbies || !languages || !occupation || !movies || !food || !songs) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields are required",
//         });
//         }

//         const savedKundali = await kundali.save();

//         return res.status(200).json({
//             success: true,
//             message: "Kundali Created Successfully",
//             profileDetails,
//         })
//     } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// Get all Kundalis


exports.getAllKundalis = async (req, res) => {
    try {
        const kundalis = await Kundali.find()
        .populate("additionalDetails")
        .populate("user")
        .exec();
        return res.status(200).json({
            success: true,
            users: users,
            message: "All Kundalis fetched successfully",
        });
    } catch (error) {
        console.error("Error occurred while fetching Kundalis:", error);
        return res.status(500).json({
        success: false,
        message: "Error occurred while fetching Kundalis",
        error: error.message,
        });
    }
};

// Get Kundali by ID
exports.getKundaliById = async (req, res) => {
    try {
        const id = req.params.userId;
        const kundali = await Kundali.findById(id)
        .populate("additionalDetails")
        .populate("user")
        .exec();

        if (!kundali) {
            return res.status(404).json({ message: 'Kundali not found' });
        }
        return res.status(200).json({
            success: true,
            message: "Selected kundali data fetched successfully",
            userDetails,
        });
    } catch (error) {
        return res.status(500).json({
        success: false,
        error: error.message,
        });
    }
};

// Update Kundali by ID
exports.updateKundaliById = async (req, res) => {
    try {

        const {
            state,
            city,
            age,
            hobbies = "",
            languages = "",
            religion = "",
            occupation = "",
            movies = "",
            food = "",
            songs = ""
        } = req.body;

        const id = req.user.id;

        if (!state || !city || !age || !hobbies || !languages || !occupation || !movies || !food || !songs || !id) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
        }
        
        const userDetail = await User.findById(id);
        const kundaliId = userDetail.kundali;
        const kundaliDetails = await Kundali.findById(kundaliId);

        if (!kundaliDetails) {
            return res.status(404).json({ message: 'Kundali not found' });
        }

        kundaliDetails.state = state;
        kundaliDetails.city = city;
        kundaliDetails.age = age;
        kundaliDetails.hobbies = hobbies;
        kundaliDetails.languages = languages;
        kundaliDetails.religion = religion;
        kundaliDetails.occupation = occupation;
        kundaliDetails.movies = movies;
        kundaliDetails.food = food;
        kundaliDetails.songs = songs;

        const updatedKundali = await kundaliDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedKundali,
        });
    } catch (error) {
        return res.status(500).json({
        success: false,
        error: error.message,
    });
  }
};

// Delete Kundali by ID                    // under processsing
// exports.deleteKundaliById = async (req, res) => {
//     try {
//         const kundali = await Kundali.findById(req.params.id);
//         if (!kundali) {
//             return res.status(404).json({ message: 'Kundali not found' });
//         }

//         await kundali.remove();
//         res.json({ message: 'Kundali deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
