import React from "react";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { InputAdornment } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// moment().format();

const DateTimeMui = (props) => {
  const { name, label, required, valueChange, onInputChange } = props;

  return (
    <MobileDatePicker
      closeOnSelect={true}
      label={label}
      inputFormat="DD/MM/YYYY"
      value={valueChange}
      onChange={(value) => {
        onInputChange({ name, value });
      }}
      renderInput={({ InputProps, ...params }) => (
        <TextField
          {...params}
          size="small"
          margin="normal"
          fullWidth
          required={required}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default DateTimeMui;
