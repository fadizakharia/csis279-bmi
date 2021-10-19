import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBmiCall, getUserBmiCall } from "../api/bmi";
import { clearLoadingAction, setLoadingAction } from "../store/actions/loading";
import getBmi from "../utils/getBmi";

export default function BmiHistory() {
  const dispatch = useDispatch();
  const [userBmis, setUserBmis] = useState<any[]>([]);
  const [fail, setFail] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setLoadingAction());
    const getInitialBmis = async () => {
      try {
        const res = await getUserBmiCall();
        if (res.status === 200) {
          setUserBmis((res.data as any).bmi);
        }
      } catch (err) {
        setFail(true);
      }
      dispatch(clearLoadingAction());
    };
    getInitialBmis();
    return () => {};
  }, []);
  const handleDeleteBmi = async (bmiId: string) => {
    try {
      const res = await deleteBmiCall(bmiId);
      if (res.status === 200) {
        setUserBmis((prev) => prev.filter((el) => el.id !== bmiId));
      }
    } catch (err) {
      setFail(true);
    }
  };
  return (
    <Container>
      {fail && <Typography color="red"> Something went wrong!</Typography>}
      <Box>
        {userBmis &&
          userBmis.map((bmi) => {
            const bmiSet = getBmi(bmi.weight, bmi.height);
            return (
              <Paper sx={{ margin: "20px", padding: "20px" }}>
                <Typography variant="h6" align="center">
                  {bmiSet.bmi}
                </Typography>
                <Typography variant="h5" align="center">
                  {bmiSet.result}
                </Typography>
                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                  <Button
                    onClick={() => handleDeleteBmi(bmi.id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            );
          })}
      </Box>
    </Container>
  );
}
