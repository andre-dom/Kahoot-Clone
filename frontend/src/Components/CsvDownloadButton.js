import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { ip, port } from "../ports";
import useAuth from "../hooks/useAuth";

const CsvDownloadButton = ({ slug }) => {
  const { auth } = useAuth();

  const handleDownload = async (slug) => {
    try {
      const response = await fetch(
        `${ip}${port}/game/completed/${slug}/export/`,
        {
          method: "GET",
          headers: {
            Authorization: `token ${auth.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CSV");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${slug}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  return (
    <Box>
      <Button
        key={slug}
        onClick={() => handleDownload(slug)}
        colorScheme="teal"
      >
        Download CSV
      </Button>
    </Box>
  );
};

export default CsvDownloadButton;
