import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { HospitalEntry } from "../types";
const HospitalCard = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      {entry.date} <LocalHospitalIcon />
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
    </div>
  );
};

export default HospitalCard;
