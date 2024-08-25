import Report from "../models/report.model.js";

export const ReoprtLoc = async (req, res) => {
  try {
    const [data] = req.body;
    const logeduser = req.user._id;

    const newReport = new Report({
      lat: data.lat,
      lng: data.lng,
      description: data.description,
      name: data.name,
      type: data.type,
      intensity: data.intensity,
      senderId: logeduser,
    });
    if (newReport) {
      await newReport.save();
    }
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ msg: "Reported" });
};

export const getHeatMap = async (req, res) => {
  try {

    const existingData = await Report.find();

    
    res.status(200).json(existingData);
  } catch (err) {
    console.log(err);
  }
}