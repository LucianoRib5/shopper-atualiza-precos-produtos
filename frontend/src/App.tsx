import { useState, ChangeEvent } from 'react';
import { Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import Page from './components/Page/Page';
import ApiService from './services/ApiService';

type SelectedFileType = File | null;

const FileInput = styled('input')({
  display: 'none',
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFileType>(null);

  const { post, get } = ApiService;

  const handleFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      post('/upload', e.target.files[0])
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err));
    }
  };

  const validateFile = () => {
    get('/validate-file')
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err));
  }

  return (
    <Page>

      <Box sx={{display: 'flex', gap: 1}}>
        <Button variant="contained" component="label">
          Selecionar Arquivo
          <FileInput type="file" onChange={handleFileUploadChange} />
        </Button>

        <Button
          variant="contained"
          onClick={validateFile}
          disabled={!selectedFile}
        >
          Validar
        </Button>

      </Box>

      {selectedFile && (
        <Typography variant="body1">
          Arquivo selecionado: {selectedFile.name}
        </Typography>
      )}
    </Page>
  );
}

export default App;