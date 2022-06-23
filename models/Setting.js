import mongoose from "mongoose";

const SettingSchema = mongoose.Schema({
   UserEmail: { type: String, required: true},
   Entertainment: { type: Number, required: true },
   MedicalHealth: { type: Number, required: true },
   Insurance: { type: Number, required: true },
   Transportation: { type: Number, required: true },
   MortgageRent: { type: Number, required: true },
   Utilities: { type: Number, required: true },
   Food: { type: Number, required: true },
   PersonalCare: { type: Number, required: true },
   Savings: { type: Number, required: true },
   Debt: { type: Number, required: true },
   Other: { type: Number, required: true },
})

var Setting = mongoose.models.Setting ||
                  mongoose.model("Setting", SettingSchema);

export default Setting;