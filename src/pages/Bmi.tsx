import { Box, Paper, Typography, Slider, Button } from "@mui/material";
import React, { useState } from "react";
import getBmi from "../utils/getBmi";
import { useDispatch } from "react-redux";
import { addBmiCall } from "../api/bmi";
export default function Bmi() {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [bmi, setBmi] = useState<number>(0);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const handleCalc = () => {
    const { bmi, result } = getBmi(weight, height);
    setBmi(bmi);
    setResult(result);
  };
  const handleSave = async () => {
    try {
      const res = (await addBmiCall(weight, height)) as any;
      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setFail(true);
    }
  };
  return (
    <Box sx={{ width: "75%", margin: "50px auto" }}>
      <Paper sx={{ padding: "20px" }}>
        <Typography variant="h4">Calculate your BMI</Typography>
        <Box>
          <Typography sx={{ margin: "50px 0 10px 0" }} variant="h5">
            height (m)
          </Typography>
          <Slider
            size="medium"
            defaultValue={1.5}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(ev, value) => setHeight(value as number)}
            min={1}
            max={3}
            step={0.01}
          />
        </Box>
        <Box>
          <Typography sx={{ margin: "20px 0 10px 0" }} variant="h5">
            weight (kg)
          </Typography>
          <Slider
            size="medium"
            defaultValue={90}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(ev, value) => setWeight(value as number)}
            min={30}
            max={500}
          />
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Button onClick={handleCalc} variant="outlined">
              calculate
            </Button>
            <Button
              onClick={handleSave}
              sx={{ marginLeft: "10px" }}
              variant="contained"
            >
              save result
            </Button>
          </Box>
          <Typography align="center" variant="caption">
            {bmi > 0 && bmi}
          </Typography>
          <Typography variant="h6" align="center">
            {result}
          </Typography>
        </Box>
        {success && (
          <Typography align="center" variant="h6" color="green">
            bmi saved successfuly
          </Typography>
        )}
        {fail && (
          <Typography align="center" variant="h6" color="red">
            something went wrong please try again later!
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
