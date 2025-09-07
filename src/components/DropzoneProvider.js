// route imports
import { forwardRef } from "react";
import { useDropzone } from "react-dropzone";

// MUI imports
import {
  Stack,
  Typography,
  Grid,
  IconButton,
  Box,
  Paper,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Dropzone = forwardRef(({ files = [], setFiles, label }, ref) => {
  const onDrop = (acceptedFiles) => {
    const updatedFiles = [
      ...files,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ];
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const removeFile = (idx) => setFiles(files.filter((_, i) => i !== idx));

  const getDisplayName = (name) => {
    // look for “_<num>_<num>.ext” at the end
    const m = name.match(/^(.*)_\d+_\d+\.(.+)$/);
    if (m) {
      // m[1] is the original base, m[2] is the extension
      return `${m[1]} ${m[2]}`;
    }
    // no suffix → just return the name as-is
    return name;
  };

  return (
    <Stack
      {...getRootProps()}
      gap={2}
      sx={{
        border: "dashed 1px silver",
        borderRadius: 1,
        p: 2,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "black", bgcolor: "secondary.light" },
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="caption">{label}</Typography>

      <Grid container spacing={2}>
        {files.map((file, idx) => {
          const { preview, name, type } = file;
          const isPdf = type === "application/pdf" || preview.endsWith(".pdf");

          const displayName = getDisplayName(name);

          return (
            <Grid item key={`${name}-${idx}`} xs="auto" position="relative">
              <Paper
                sx={{
                  position: "relative",
                  width: 75,
                  height: 75,
                  overflow: "visible",
                  borderRadius: 2,
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  {isPdf ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.100",
                      }}
                    >
                      <PictureAsPdfIcon fontSize="large" color="action" />
                    </Box>
                  ) : (
                    <Box
                      component="img"
                      src={preview}
                      alt={displayName}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  )}
                </Box>

                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 20,
                    height: 20,
                    bgcolor: "white",
                    "&:hover": { bgcolor: "background.main" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Paper>

              {/* show the filename (ellipsized if too long) */}
              <Tooltip title={displayName}>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    display: "inline-block", // allow width to take effect
                    maxWidth: 75,
                    textAlign: "center",
                    mt: 0.5,
                    px: 0.5, // optional padding so the text doesn't butt right against the border
                    overflow: "hidden", // noWrap already adds this but no harm repeating
                  }}
                >
                  {displayName}
                </Typography>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
});

export default Dropzone;
