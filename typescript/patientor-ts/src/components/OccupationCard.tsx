import WorkIcon from "@mui/icons-material/Work";
import { OccupationalHealthcareEntry } from "../types";
const OccupationCard = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      {entry.date} <WorkIcon />
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
    </div>
  );
};

export default OccupationCard;
