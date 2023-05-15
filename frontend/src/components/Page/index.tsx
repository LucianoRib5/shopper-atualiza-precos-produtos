import {
  AppBar,
  Avatar,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';

type Props = {
  children?: React.ReactNode;
  titulo?: string;
};

const Page: React.FC<Props> = ({ children,titulo }) => {

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
              <Avatar sx={{ width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
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
          >
            <Typography textAlign="start" variant="h3" m={2}>
              {titulo}
            </Typography>

            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
