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

export const rateReport = async (req, res) => {
  try {
    const { reportId, rating } = req.body;
    const logeduser = req.user._id;

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    const existingRating = report.rating.find(r => r.userId.toString() === logeduser.toString());
    if (existingRating) {
      existingRating.value = rating;
    } else {
      report.rating.push({ userId: logeduser, value: rating });
    }

    await report.save();
    res.status(200).json({ msg: "Rating submitted", report });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getRatings = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res.status(200).json({ ratings: report.rating });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};