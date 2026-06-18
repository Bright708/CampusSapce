import { getProfilesService, updateProfileService } from "../services/profileService.js";
export const getProfiles = async (req, res) => {
  try {
    const profiles = await getProfilesService();

    res.status(200).json({
      success: true,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const { data, error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await updateProfileService(req.user.id, req.body);

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
