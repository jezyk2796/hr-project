import { ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ReactNode, useState } from 'react';

import { SublistButton } from './SublistButton';

type ListData = {
  content: string;
  sublist?: ListData[];
};

type ExpandableListProps = {
  list: ListData[];
  level: number;
};

type ListItemProps = {
  listItem: ListData;
  level: number;
  renderSublist: (propsName: ExpandableListProps) => ReactNode;
};

export const ListItem = ({ listItem, level, renderSublist }: ListItemProps) => {
  const [isSublistOpened, setIsSublistOpened] = useState(false);

  const handleToggleSublist = () => {
    if (!listItem.sublist) {
      return;
    }
    setIsSublistOpened((prev) => !prev);
  };

  return (
    <>
      <ListItemButton onClick={handleToggleSublist}>
        <ListItemText primary={listItem.content} />
        {listItem.sublist && <SublistButton isOpened={isSublistOpened} />}
      </ListItemButton>
      {listItem.sublist && isSublistOpened && (
        <Collapse
          in={isSublistOpened}
          style={{ marginLeft: `${level + 1}rem` }}
        >
          {renderSublist({
            level: level + 1,
            list: listItem.sublist,
          })}
        </Collapse>
      )}
    </>
  );
};
