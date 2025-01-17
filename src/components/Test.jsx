import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab } from '@mui/base/Tab';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function Test() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className='w-full flex items-center justify-center h-[40vh]'>
    <div className={`w-[40%]`}>
      <Tabs defaultValue={0}>
        <TabsList>
          <Tab value={0}>My account</Tab>
          <Tab value={1}>Profile</Tab>
          <Tab value={2}>Language</Tab>
        </TabsList>
        <TabPanel value={0}>My account page</TabPanel>
        <TabPanel value={1}>Profile page</TabPanel>
        <TabPanel value={2}>Language page</TabPanel>
      </Tabs>
    </div>
    </div>
  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const TabsList = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        'mb-4 rounded-md bg-primary flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg',
        className,
      )}
      {...other}
    />
  );
});

TabsList.propTypes = {
  className: PropTypes.string,
};

const Tab = React.forwardRef((props, ref) => {
  return (
    <BaseTab
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `font-sans ${
                ownerState.selected
                  ? 'text-primary transition-all duration-200 bg-white'
                  : 'text-white bg-transparent transition-all duration-200 hover:bg-white hover:text-primary'
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed transition-all duration-200 opacity-50'
                  : 'cursor-pointer transition-all duration-200'
              } text-sm leading-[1.3] transition-all duration-200 font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-purple-light`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

Tab.propTypes = {
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};

const TabPanel = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabPanel
      ref={ref}
      className={clsx(
        'py-5 px-3 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 opacity-60 w-full font-sans text-sm',
        className,
      )}
      {...other}
    />
  );
});

TabPanel.propTypes = {
  className: PropTypes.string,
};
