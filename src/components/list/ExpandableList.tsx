import { List } from '@mui/material';

import { ListItem } from '../list-item/ListItem';

type ListData = {
  content: string;
  sublist?: ListData[];
};

type ExpandableListProps = {
  list: ListData[];
  level: number;
};

export const ExpandableList = ({ list, level }: ExpandableListProps) => {
  return (
    <List>
      {list.map((listItem) => (
        <ListItem
          renderSublist={(props: ExpandableListProps) => (
            <ExpandableList {...props} />
          )}
          level={level}
          listItem={listItem}
          key={listItem.content}
        />
      ))}
    </List>
  );
};
