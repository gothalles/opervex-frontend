import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MainMenu from "../../components/MainMenu";
import { useAuth } from "../../context/AuthContext";

const AccessProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      //await fetchBranches();
    };

    fetchData();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/Accounting/Branches`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const result = await response.json();

      setProfiles(result);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar as unidades:", err);
    }
  };

  return (
    <MainMenu>
      <Box mt={4}>
        <FormGroup>
          <Typography variant="h5" gutterBottom>
            Gerenciamento de usuários
          </Typography>
        </FormGroup>
      </Box>
    </MainMenu>
  );
};

export default AccessProfile;
