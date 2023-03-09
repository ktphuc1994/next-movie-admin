import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ArticleIcon from '@mui/icons-material/Article';
import { useRouter } from 'next/router';
import Link from 'next/link';

const itemList = [
  {
    name: 'Movie list',
    icon: <DashboardCustomizeIcon />,
    pathname: '/',
  },
  {
    name: 'Movie Detail',
    icon: <ArticleIcon />,
    pathname: '/movie/[id]',
  },
];

const SidebarContent = ({ open }: { open: boolean }) => {
  const router = useRouter();
  return (
    <List>
      {itemList.map((item) => (
        <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            selected={item.pathname === router.pathname}
            onClick={() => {
              router.push('/movie/1234');
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarContent;
