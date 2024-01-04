import { ExpandLess, ExpandMore } from '@mui/icons-material';

type SublistButtonProps = {
  isOpened: boolean;
};

export const SublistButton = ({ isOpened }: SublistButtonProps) =>
  isOpened ? <ExpandLess /> : <ExpandMore />;
