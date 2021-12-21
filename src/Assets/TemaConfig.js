import { createTheme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        secondary:{
            main: indigo[900]
        }
    }
})

export default theme;