import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { backend_url } from "../backend_url";
import useAuth from "../hooks/useAuth";

const CsvDownloadButton = ({ game }) => {
  const { auth } = useAuth();

  const handleDownload = async (game) => {
    try {
      const response = await fetch(
        `${backend_url}/game/completed/${game.name}_${game.completed_at}/export/`,
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
      link.setAttribute("download", `${game.slug}.csv`);
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
        key={game.slug}
        onClick={() => handleDownload(game.slug)}
        colorScheme="teal"
      >
        Download CSV
      </Button>
    </Box>
  );
};

export default CsvDownloadButton;
