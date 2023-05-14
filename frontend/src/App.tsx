import { useState, ChangeEvent } from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Page from './components/Page/Page';
import ApiService from './services/ApiService';

type SelectedFileType = File | null;

const FileInput = styled('input')({
  display: 'none',
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFileType>(null);

  const { post } = ApiService;
    
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      post('/upload', e.target.files[0])
        .then(res => res)
        .catch(err => err);
    }
  };

  return (
    <Page>
      <Button variant="contained" component="label">
        Selecionar Arquivo
        <FileInput type="file" onChange={handleFileChange} />
      </Button>
      {selectedFile && (
        <Typography variant="body1">
          Arquivo selecionado: {selectedFile.name}
        </Typography>
      )}
    </Page>
  );
}

export default App;
