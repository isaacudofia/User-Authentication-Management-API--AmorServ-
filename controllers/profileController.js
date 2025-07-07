export const profile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile retrieved successful",
      user: {
        name: req.user.userName,
        email: req.user.userEmail,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while getting profile",
      error: error.message,
    });
  }
};
