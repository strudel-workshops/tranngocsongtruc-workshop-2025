import { Box, Paper, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FilterContext } from '../../components/FilterContext';
import { PageHeader } from '../../components/PageHeader';
import { DataView } from './-components/DataView';
import { DataViewHeader } from './-components/DataViewHeader';
import { FiltersPanel } from './-components/FiltersPanel';
import { PreviewPanel } from './-components/PreviewPanel';
import { FilterConfig } from '../../types/filters.types';

export const Route = createFileRoute('/explore-data/')({
  component: DataExplorer,
});

// CUSTOMIZE: the filter definitions
const filterConfigs: FilterConfig[] = [
  {
    field: 'measurement_type',
    label: 'Measurement Type',
    operator: 'contains-one-of',
    filterComponent: 'CheckboxList',
    filterProps: {
      options: [
        {
          label: '4D-STEM',
          value: '4D-STEM',
        },
        {
          label: '4D-STEM/CBED',
          value: '4D-STEM/CBED',
        },
        {
          label: 'EDS Hyperspectral Map',
          value: 'EDS Hyperspectral Map',
        },
        {
          label: 'EELS Hyperspectral',
          value: 'EELS Hyperspectral',
        },
        {
          label: 'CL Point Spectra',
          value: 'CL Point Spectra',
        },
        {
          label: 'CL Hyperspectral',
          value: 'CL Hyperspectral',
        },
        {
          label: 'HAADF',
          value: 'HAADF',
        },
        {
          label: 'ADF',
          value: 'ADF',
        },
        {
          label: 'TEM',
          value: 'TEM',
        },
        {
          label: 'Diffraction',
          value: 'Diffraction',
        },
      ],
    },
  },
  {
    field: 'detector',
    label: 'Detector',
    operator: 'contains-one-of',
    filterComponent: 'CheckboxList',
    filterProps: {
      options: [
        {
          label: 'EMPAD',
          value: 'EMPAD',
        },
        {
          label: 'Ultra-X EDS',
          value: 'Ultra-X EDS',
        },
        {
          label: 'Continuum K3-IS',
          value: 'Continuum K3-IS',
        },
        {
          label: 'Ceta-S CMOS',
          value: 'Ceta-S CMOS',
        },
        {
          label: 'Attolight CL Mirror',
          value: 'Attolight CL Mirror',
        },
      ],
    },
  },
  {
    field: 'voltage_kv',
    label: 'Voltage (kV)',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 300,
    },
  },
  {
    field: 'file_size_mb',
    label: 'File Size (MB)',
    operator: 'between-inclusive',
    filterComponent: 'RangeSlider',
    filterProps: {
      min: 0,
      max: 2500,
    },
  },
];

/**
 * Main explorer page in the explore-data Task Flow.
 * This page includes the page header, filters panel,
 * main table, and the table row preview panel.
 */
function DataExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewItem, setPreviewItem] = useState<any>();
  const [showFiltersPanel, setShowFiltersPanel] = useState(true);

  const handleCloseFilters = () => {
    setShowFiltersPanel(false);
  };

  const handleToggleFilters = () => {
    setShowFiltersPanel(!showFiltersPanel);
  };

  const handleClosePreview = () => {
    setPreviewItem(null);
  };

  return (
    <FilterContext>
      <Box>
        <PageHeader
          // CUSTOMIZE: the page title
          pageTitle="Explore Data App"
          // CUSTOMIZE: the page description
          description="Exploring mult-dimensional 4DStem, EELS, and CL datasets"
          sx={{
            marginBottom: 1,
            padding: 2,
          }}
        />
        <Box>
          <Stack direction="row">
            {showFiltersPanel && (
              <Box
                sx={{
                  width: '350px',
                }}
              >
                <FiltersPanel
                  filterConfigs={filterConfigs}
                  onClose={handleCloseFilters}
                />
              </Box>
            )}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minHeight: '600px',
                minWidth: 0,
              }}
            >
              <DataViewHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onToggleFiltersPanel={handleToggleFilters}
              />
              <DataView
                filterConfigs={filterConfigs}
                searchTerm={searchTerm}
                setPreviewItem={setPreviewItem}
              />
            </Paper>
            {previewItem && (
              <Box
                sx={{
                  minWidth: '400px',
                }}
              >
                <PreviewPanel
                  previewItem={previewItem}
                  onClose={handleClosePreview}
                />
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </FilterContext>
  );
}
