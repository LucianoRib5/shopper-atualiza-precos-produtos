import {
  AppBar,
  Avatar,
  Fab,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { useState, useCallback } from 'react';

type Props = {
  children?: React.ReactNode;
  titulo?: string;
  hasAddButton?: boolean;
  fullWidth?: boolean;
  actionAddButton?: () => void;
  loading?: boolean;
};

const Page: React.FC<Props> = ({
  children,
  titulo,
  hasAddButton,
  fullWidth,
  actionAddButton,
  loading,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflowX: 'hidden',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            SHOPPER
          </Typography>

          <Tooltip title="">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 2 }}>
        <Paper square sx={{ minWidth: '12%' }}></Paper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '88%',
          }}
        >
          <Container
            component="main"
            sx={{ minWidth: fullWidth ? '100%' : null }}
          >
            <Typography textAlign="start" variant="h3" m={2}>
              {titulo}
            </Typography>

            {children}
          </Container>

          {hasAddButton && (
            <Fab
              color="primary"
              aria-label="add"
              sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
              onClick={actionAddButton}
            >
              <AddIcon />
            </Fab>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
