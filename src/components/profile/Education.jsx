// Education.jsx
import React from "react";
import { Business as BuildingIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import CardContainer from "./CardContainer";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const Education = () => {
  return (
    <CardContainer title="Education" icon={BuildingIcon}>
      <Timeline
        position="right"
        sx={{
          p: 0,
          m: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="medium"
            >
              Harvard Medical School
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Doctor of Medicine (MD)
            </Typography>
            <Typography variant="body2" color="primary">
              2001 - 2005
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="medium"
            >
              Johns Hopkins University
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bachelor of Science in Biology
            </Typography>
            <Typography variant="body2" color="primary">
              1997 - 2001
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="medium"
            >
              Cardiology Fellowship
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Massachusetts General Hospital
            </Typography>
            <Typography variant="body2" color="primary">
              2005 - 2008
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </CardContainer>
  );
};

export default Education;
