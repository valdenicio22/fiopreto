import TextField from '@material-ui/core/TextField';

export const TesteMaterial = () => {
  return (
    <>
      <TextField variant="outlined" label="Testando" />
      <TextField variant="standard" label="Testando" />
      <TextField variant="filled" label="Testando" />

      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
    </>
  );
};
