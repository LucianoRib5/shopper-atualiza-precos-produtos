import { useState, ChangeEvent, useRef } from 'react';
import { Alert, AlertTitle, Button, Snackbar, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { IUpdateFileData } from './interfaces/IUpdateFileData';
import { IInvalidProperties } from './interfaces/IInvalidProperties';
import Page from './components/Page';
import ApiService from './services/ApiService';
import SimpleTable from './components/SimpleTable';

type SelectedFileType = File | null;

type Validation = {
  dataIsOk: boolean;
  rulesIsOk: boolean;
  message: string;
  divergent: IInvalidProperties[]
}

const FileInput = styled('input')({
  display: 'none',
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFileType>(null);
  const [updateFileData, setUpdateFileData] = useState<IUpdateFileData[]>([]);
  const [invalidProperties, setInvalidProperties] = useState<IInvalidProperties[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { post, get, put } = ApiService;

  const handleFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      setSelectedFile(file);
      
      post('/upload', formData)
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err));

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const validateFile = () => {
    get<Validation>('/validate-file')
      .then(({ data }) => {
        const { dataIsOk, rulesIsOk, divergent } = data;

        setDisabled(rulesIsOk);

        if (dataIsOk) {
          setShowSnackbar(false);
          getUpdateFileData();
          return;
        }

        setInvalidProperties(divergent);
        setShowSnackbar(true);
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
      .then(() => {
        setDisabled(false);
        setSelectedFile(null);
        setUpdateFileData([]);
      })
      .catch(err => console.log(err))
  }

  return (
    <Page titulo='Olá Shopper'>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" component="label">
          Selecionar Arquivo
          <FileInput 
            ref={fileInputRef} 
            type="file" 
            onChange={handleFileUploadChange} 
          />
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
          disabled={!disabled}
        >
          Atualizar
        </Button>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={10000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error">
            <AlertTitle>Dados inválidos</AlertTitle>
            {invalidProperties && invalidProperties.map(i =>
              <p key={i.line}>
                Na linha {i.line} a coluna {i.property}, tem <strong>{i.message}</strong>!
              </p>
            )}
          </Alert>
        </Snackbar>
      </Box>

      {selectedFile && (
        <Typography variant="body1">
          Arquivo selecionado: {selectedFile.name}
        </Typography>
      )}
      <SimpleTable data={updateFileData}></SimpleTable>
    </Page>
  );
}

export default App;