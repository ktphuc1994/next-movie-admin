import { useRouter } from 'next/router';

// import MUI components
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ArticleIcon from '@mui/icons-material/Article';

// import local context
import { useCommonContext } from '../../context/CommonContext';
import { InterfaceCommonContext } from '../../context/interface/common.interface';

const itemList = [
  {
    name: 'Movie list',
    icon: <DashboardCustomizeIcon />,
    pathname: '/',
    path: '/',
  },
  {
    name: 'Movie Detail',
    icon: <ArticleIcon />,
    pathname: '/movie/[id]',
    path: '/movie/',
  },
];

const SidebarContent = ({ open }: { open: boolean }) => {
  const router = useRouter();
  const { moviePath } = useCommonContext() as InterfaceCommonContext;

  return (
    <List>
      {itemList.map((item) => {
        const isMovieDetail = item.pathname === '/movie/[id]';
        const toPath = isMovieDetail ? item.path + moviePath : item.path;
        return (
          <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              disabled={isMovieDetail && !moviePath}
              selected={item.pathname === router.pathname}
              onClick={() => {
                router.push(toPath);
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
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SidebarContent;
