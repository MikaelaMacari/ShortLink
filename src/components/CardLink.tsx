import Paper from "@mui/material/Paper";
import { Stack, Typography } from "@mui/material";
import ButtonComponent from "./ButtonComponent";
import "./ButtonComponent.css";
import { FC, MouseEventHandler, useState } from "react";
interface CProps {
  longLink: string;
  shortLink: string;
}
const CardLink: FC<CProps> = ({ longLink, shortLink }) => {
  const [isCopied, setIsCopied] = useState(false);
  const toggleClass = async () => {
    await navigator.clipboard.writeText(shortLink);
    setIsCopied(!isCopied);
  };
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          width: "97%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
          p: 2,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{ fontSize: "1.5rem" }}
        >
          {longLink}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#3FCBCE", fontSize: "1.5rem" }}
          >
            {shortLink}
          </Typography>
          <ButtonComponent
            classname={isCopied ? "buttonCopied" : "button"}
            sx={{ pl: 5, pr: 5 }}
            content={isCopied ? "Copied!" : "Copy"}
            onClick={toggleClass}
          />
        </Stack>
      </Paper>
    </>
  );
};
export default CardLink;
