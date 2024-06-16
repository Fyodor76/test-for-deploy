import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useUrlParams } from '../../context/UrlParamContext';

type Filters = {
    priceFrom: string;
    priceTo: string;
    recommended: boolean;
    popular: boolean;
    rating: string;
  };

export const FilterPanel: React.FC = () => {
    const { params, updateParam, resetParams } = useUrlParams();
    const [filters, setFilters] = useState({
      priceFrom: params.get('priceFrom') || '',
      priceTo: params.get('priceTo') || '',
      recommended: params.get('recommended') === 'true',
      popular: params.get('popular') === 'true',
      rating: params.get('rating') || '',
    });
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const applyFilters = () => {
        (Object.keys(filters) as (keyof Filters)[]).forEach((key) => {
          if (filters[key]) {
            updateParam(key, filters[key].toString());
          } 
        });
      };
    
      const handleResetFilters = () => {
        setFilters({
          priceFrom: '',
          priceTo: '',
          recommended: false,
          popular: false,
          rating: '',
        });
        resetParams();
      };    
  
    return (
      <div className="fixed-filter-panel">
        <Accordion className="filter-panel">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Фильтры</Typography>
          </AccordionSummary>
          <AccordionDetails className="filter-details">
            <div className="filter-inputs">
              <TextField
                label="Цена от"
                variant="outlined"
                value={filters.priceFrom}
                onChange={handleFilterChange}
                type="number"
                name="priceFrom"
                fullWidth
                margin="dense"
              />
              <TextField
                label="Цена до"
                variant="outlined"
                value={filters.priceTo}
                onChange={handleFilterChange}
                type="number"
                name="priceTo"
                fullWidth
                margin="dense"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.recommended}
                    onChange={handleFilterChange}
                    name="recommended"
                  />
                }
                label="Рекомендуемые"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.popular}
                    onChange={handleFilterChange}
                    name="popular"
                  />
                }
                label="Популярные"
              />
              <TextField
                label="Оценка товара"
                variant="outlined"
                value={filters.rating}
                onChange={handleFilterChange}
                type="number"
                inputProps={{ min: 1, max: 5 }}
                name="rating"
                fullWidth
                margin="dense"
              />
              <div className="filter-buttons">
                <Button variant="contained" color="primary" onClick={applyFilters}>
                  Применить фильтры
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };