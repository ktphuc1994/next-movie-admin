import { createTheme } from '@mui/material';
import { colorConst } from '../constants/color.const';

export const theme = createTheme({
  palette: colorConst,
});

declare module '@mui/material/styles' {
  interface Palette {
    darkMBlue: Palette['primary'];
    brightRed: Palette['primary'];
    darkOrange: Palette['primary'];
    editYellow: Palette['primary'];
    limeGreen: Palette['primary'];
    darkPink: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    darkMBlue?: PaletteOptions['primary'];
    brightRed?: PaletteOptions['primary'];
    darkOrange?: PaletteOptions['primary'];
    editYellow?: PaletteOptions['primary'];
    limeGreen?: PaletteOptions['primary'];
    darkPink?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    ligher?: string;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    darkMBlue: true;
    brightRed: true;
    darkOrange: true;
    editYellow: true;
    limeGreen: true;
    darkPink: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    darkMBlue: true;
    brightRed: true;
    darkOrange: true;
    editYellow: true;
    limeGreen: true;
    darkPink: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    darkMBlue: true;
    brightRed: true;
    darkOrange: true;
    editYellow: true;
    limeGreen: true;
    darkPink: true;
  }
}

declare module '@mui/material/Box' {
  interface BoxPropsColorOverrides {
    darkMBlue: true;
    brightRed: true;
    darkOrange: true;
    editYellow: true;
    limeGreen: true;
    darkPink: true;
  }
}
