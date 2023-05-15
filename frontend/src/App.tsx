import { useState, ChangeEvent, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { IUpdateFileData } from './interfaces/IUpdateFileData';
import Page from './components/Page';
import ApiService from './services/ApiService';
import BasicTable from './components/SimpleTable';

type SelectedFileType = File | null;

type Validation = {
  valid: boolean;
}

const FileInput = styled('input')({
  display: 'none',
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFileType>(null);
  const [updateFileData, setUpdateFileData] = useState<IUpdateFileData[]>([]);

  const disabled = useRef(false);

  const { post, get, put } = ApiService;

  const handleFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      setSelectedFile(e.target.files[0]);
      post('/upload', formData)
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err));
    }
  };

  const validateFile = () => {
    get<Validation>('/validate-file')
      .then(({ data }) => {
        disabled.current = data.valid
        getUpdateFileData();
      })
      .catch(err => console.log(err));
  }

  const getUpdateFileData = () => {
    get<IUpdateFileData[]>('/get-file-data')
      .then(({ data }) => setUpdateFileData(data))
      .catch(err => console.log(err));
  };

  const updateData = () => {
    put('/update-data')
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
  }

  return (
    <Page titulo='Olá Shopper'>
      <Box sx={{ display: 'flex', gap: 1 }}>
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

        <Button
          variant="contained"
          onClick={updateData}
          disabled={!disabled.current}
        >
          Atualizar
        </Button>

      </Box>

      {selectedFile && (
        <Typography variant="body1">
          Arquivo selecionado: {selectedFile.name}
        </Typography>
      )}
      <BasicTable data={updateFileData}></BasicTable>
    </Page>
  );
}

export default App;