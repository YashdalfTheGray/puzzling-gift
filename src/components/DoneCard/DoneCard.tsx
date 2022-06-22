import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './DoneCard.scss';

const DoneCard = () => (
  <Card className="DoneCard">
    <CardContent className="done-content">
      <CheckCircleIcon color="success" fontSize="large" />
      <Typography variant="h5">You've done it!</Typography>
    </CardContent>
  </Card>
);

export default DoneCard;
