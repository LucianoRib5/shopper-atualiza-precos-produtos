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
  validFormat: boolean;
  invalidProperties: IInvalidProperties[]
}

const FileInput = styled('input')({
  display: 'none',
});

const App = () => {
  const [selectedFile, setSelectedFile] = useState<SelectedFileType>(null);
  const [updateFileData, setUpdateFileData] = useState<IUpdateFileData[]>([]);
  const [invalidProperties, setInvalidProperties] = useState<IInvalidProperties[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
        const { validFormat, invalidProperties } = data;

        disabled.current = validFormat;

        if (validFormat) {
          setShowSnackbar(false);
          getUpdateFileData();
          return;
        }

        setInvalidProperties(invalidProperties);
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
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
  }

  return (
    <Page titulo='Olá Shopper'>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button variant="outlined" component="label">
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

        <Snackbar
          open={showSnackbar}
          autoHideDuration={10000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error">
            <AlertTitle>Dados inválidos</AlertTitle>
            {invalidProperties && invalidProperties.map(i =>
              <p key={i.position}>
                Na linha {i.position} a coluna {i.property}, tem <strong>{i.message}</strong>!
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