import FavoriteIcon from "@mui/icons-material/Favorite";
import { red, green, yellow, orange } from "@mui/material/colors";
import { HealthCheckEntry } from "../types";
const HealthCheckUpCard = ({ entry }: { entry: HealthCheckEntry }) => {
  const risk = entry?.healthCheckRating | 0;
  let color;
  switch (risk) {
    case 0:
      color = green[500];
      break;
    case 1:
      color = yellow[500];
      break;
    case 2:
      color = orange[500];
      break;
    case 3:
      color = red[500];
      break;
  }
  console.log(entry);

  return (
    <div>
      {entry.date}
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      <FavoriteIcon sx={{ color: color }} />
    </div>
  );
};

export default HealthCheckUpCard;
