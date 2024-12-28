import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Habit, removeHabit, toggleHabit } from "../slices/habitSlice";

const HabitList: React.FC = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state: RootState) => state.habits.habits);
  const today = new Date().toISOString().split("T")[0];

  const handleToggleHabit = (payload: any) => {
    dispatch(toggleHabit(payload));
  };

  const handleRemoveHabit = (id: string) => {
    dispatch(removeHabit({ id })); 
  };

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  return (
    <div>
      {habits.map((habit: any) => (
        <Paper key={habit.id} sx={{ padding: 2, mt: 2 }}>
          <Grid container alignItems={"center"}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="primary">
                {habit.name}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                fontSize={14}
                textTransform={"capitalize"}
              >
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  variant="outlined"
                  color={
                    habit.completedDates.includes(today) ? "success" : "primary"
                  }
                  startIcon={<CheckCircle />}
                  //   onClick={() =>
                  //     dispatch(toggleHabit({ id: habit.id, date: today }))
                  //   }
                  onClick={() =>
                    handleToggleHabit({ id: habit.id, date: today })
                  }
                >
                  {habit.completedDates.includes(today)
                    ? "Completed"
                    : "Mark completed"}
                </Button>
                <Button
                  variant="outlined"
                  color={"error"}
                  startIcon={<Delete />}
                  onClick={() => handleRemoveHabit(habit.id)}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Current Streak: {getStreak(habit)} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(getStreak(habit) / 30) * 100}
              sx={{ mt: 1 }}
            />
          </Box>
        </Paper>
      ))}
    </div>
  );
};

export default HabitList;
