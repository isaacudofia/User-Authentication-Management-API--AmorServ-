export const profile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile retrieved successful",
      user: {
        name: req.userName,
        email: req.userEmail,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while getting profile",
      error: error.message,
    });
  }
};
