import { useEffect, useState } from "react";
import axios from "axios";
import CardLink from "./CardLink";
import ButtonComponent from "./ButtonComponent";
import Container from "@mui/material/Container";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase, Typography } from "@mui/material";
import "./ButtonComponent.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 2),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
}));
const SearchBar = () => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [data, setData] = useState<
    Array<{ longLink: string; shortUrl: string }>
  >([]);
  useEffect(() => {
    const dataLinks = JSON.parse(localStorage.getItem("data") || "[]");
    setData(dataLinks);
  }, []);
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  const getCode = async () => {
    try {
      const response = await axios.get(" https://api.shrtco.de/v2/shorten", {
        method: "GET",
        params: { url: url },
      });
      const link = response.data.result.full_short_link;
      setData([
        ...data,
        {
          longLink: url,
          shortUrl: link,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  const validateInput = () => {
    if (url === "") {
      setIsValid(false);
    } else {
      setIsValid(true);
      getCode();
    }
  };
  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            bgcolor: "#3a3053",
            p: 5,
            pb: isValid ? 5 : 3,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Search
              sx={{
                border: isValid ? "none" : "3px solid #C86273",
              }}
            >
              <StyledInputBase
                placeholder="Shorten a link here..."
                inputProps={{
                  "aria-label": "search",
                }}
                sx={{ color: isValid ? "" : "red" }}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Search>
            <ButtonComponent
              classname="button"
              sx={{ pl: 2, pr: 2 }}
              content={"Shorten It!"}
              onClick={validateInput}
            />
          </Box>
          {!isValid ? (
            <Typography
              variant="body1"
              component="div"
              color={"#C86273"}
              sx={{ fontStyle: "italic", pt: 1 }}
            >
              Please add a link
            </Typography>
          ) : (
            ""
          )}
        </Box>
        {data.map((item, i) => (
          <CardLink
            key={i}
            longLink={item.longLink}
            shortLink={item.shortUrl}
          />
        ))}
      </Container>
    </>
  );
};

export default SearchBar;
