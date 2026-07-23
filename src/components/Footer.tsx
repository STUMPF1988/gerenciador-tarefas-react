import { Box, Typography } from "@mui/material";

interface FooterProps {
  title: string;
  subtitle: string;
}

function Footer({
  title,
  subtitle,
}: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 2,
        textAlign: "center",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Footer;