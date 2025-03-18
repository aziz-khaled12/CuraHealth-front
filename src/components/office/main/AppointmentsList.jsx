import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { format } from "date-fns";

const AppointmentsList = ({
  activeTab,
  handleTabChange,
  upcomingAppointments,
  completedAppointments,
  cancelledAppointments,
}) => {
  return (
    <TabContext value={activeTab}>
      <div className="mb-4">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": { textTransform: "none" },
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab
            label={`Upcoming (${upcomingAppointments.length})`}
            value="1"
          />
          <Tab
            label={`Completed (${completedAppointments.length})`}
            value="2"
          />
          <Tab
            label={`Cancelled (${cancelledAppointments.length})`}
            value="3"
          />
        </Tabs>
      </div>

      {["1", "2", "3"].map((tabValue) => (
        <TabPanel key={tabValue} value={tabValue} sx={{ padding: 0 }}>
          <div className="overflow-y-auto max-h-[400px]">
            {(tabValue === "1"
              ? upcomingAppointments
              : tabValue === "2"
              ? completedAppointments
              : cancelledAppointments
            ).length === 0 ? (
              <Box className="py-8 text-center">
                <Typography color="text.secondary">
                  No appointments found
                </Typography>
              </Box>
            ) : (
              (tabValue === "1"
                ? upcomingAppointments
                : tabValue === "2"
                ? completedAppointments
                : cancelledAppointments
              )
                .slice()
                .reverse()
                .map((appointment, index) => (
                  <React.Fragment key={index}>
                    <div className="py-3 px-6 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={"/default-avatar.png"}
                            sx={{ width: 40, height: 40 }}
                          />
                          <div>
                            <Typography
                              variant="subtitle1"
                              className="font-medium"
                            >
                              {`${appointment.first_name} ${appointment.last_name}`}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {format(
                                appointment.created_at,
                                "yyyy-MM-dd"
                              ) || "09:00 AM"}{" "}
                              •{" "}
                              {format(appointment.created_at, "HH:mm") ||
                                "30 min"}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="ml-12"
                      >
                        {appointment.reason || "Regular check-up"}
                      </Typography>
                    </div>
                    {index <
                      (tabValue === "1"
                        ? upcomingAppointments
                        : tabValue === "2"
                        ? completedAppointments
                        : cancelledAppointments
                      ).length -
                        1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))
            )}
          </div>
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default AppointmentsList;