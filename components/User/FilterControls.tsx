import React, { useState } from "react";
import { TextField, Select, MenuItem, InputLabel, FormControl, IconButton, Collapse, Tooltip } from "@mui/material";
import { Close, Tune, ClearAll, Search } from "@mui/icons-material";
import ImmobilierFilters from "@/components/User/Filters/Immobilier";
import VehiculeFilters from "@/components/User/Filters/Vehicule";

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: () => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedMinPrice: number | "";
  setSelectedMinPrice: (price: number | "") => void;
  selectedMaxPrice: number | "";
  setSelectedMaxPrice: (price: number | "") => void;
  selectedRooms: number | "";
  setSelectedRooms: (rooms: number | "") => void;
  selectedBathrooms: number | "";
  setSelectedBathrooms: (bathrooms: number | "") => void;
  selectedSurface: number | "";
  setSelectedSurface: (surface: number | "") => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedYear: number | "";
  setSelectedYear: (year: number | "") => void;
  selectedKilometrage: number | "";
  setSelectedKilometrage: (kilometrage: number | "") => void;
  handleClearFilters: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  selectedCategory,
  setSelectedCategory,
  selectedMinPrice,
  setSelectedMinPrice,
  selectedMaxPrice,
  setSelectedMaxPrice,
  selectedRooms,
  setSelectedRooms,
  selectedBathrooms,
  setSelectedBathrooms,
  selectedSurface,
  setSelectedSurface,
  selectedModel,
  setSelectedModel,
  selectedBrand,
  setSelectedBrand,
  selectedYear,
  setSelectedYear,
  selectedKilometrage,
  setSelectedKilometrage,
  handleClearFilters,
}) => {
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    handleSearchSubmit();
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchQuery(event.target.value);
  };

  const triggerSearch = () => {
    setSearchQuery(tempSearchQuery);
    handleSearchSubmit();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-4 space-x-2">
        <TextField
          variant="outlined"
          placeholder="Rechercher"
          value={tempSearchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown} 
          sx={{ width: "20%", backgroundColor: "#fff" }}
          InputProps={{
            endAdornment: (
              <>
                {tempSearchQuery && (
                  <IconButton onClick={() => setTempSearchQuery("")}>
                    <Close />
                  </IconButton>
                )}
                <IconButton onClick={triggerSearch}>
                  <Search />
                </IconButton>
              </>
            ),
          }}
        />

        <div className="flex items-center space-x-2">
          <FormControl
            variant="outlined"
            sx={{ minWidth: 120, backgroundColor: "#fff" }}
          >
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={selectedCategory || ""}
              onChange={(e) => handleCategoryChange(e.target.value || null)}
              label="Catégorie"
              MenuProps={{ disableScrollLock: true }}
            >
              <MenuItem value="">Toutes les catégories</MenuItem>
              <MenuItem value="Automobile">Automobile</MenuItem>
              <MenuItem value="Immobilier">Immobilier</MenuItem>
              <MenuItem value="Vêtement-Objet">Vêtements et objets de la maison</MenuItem>
              <MenuItem value="Matériel">Location de matériels</MenuItem>
              <MenuItem value="Fourre-tout">Fourre-tout</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title={showMoreFilters ? "Moins de filtres" : "Plus de filtres"}>
            <IconButton onClick={toggleMoreFilters}>
              <Tune />
            </IconButton>
          </Tooltip>

          <Tooltip title="Réinitialiser les filtres">
            <IconButton onClick={handleClearFilters}>
              <ClearAll />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Collapse in={showMoreFilters}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <FormControl variant="outlined" sx={{ width: "45%" }}>
              <TextField
                variant="outlined"
                placeholder="Prix Min"
                type="number"
                value={selectedMinPrice === "" ? "" : selectedMinPrice}
                onChange={(e) =>
                  setSelectedMinPrice(
                    e.target.value ? parseInt(e.target.value, 10) : ""
                  )
                }
                fullWidth
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </FormControl>
            <span>-</span>
            <FormControl variant="outlined" sx={{ width: "45%" }}>
              <TextField
                variant="outlined"
                placeholder="Prix Max"
                type="number"
                value={selectedMaxPrice === "" ? "" : selectedMaxPrice}
                onChange={(e) =>
                  setSelectedMaxPrice(
                    e.target.value ? parseInt(e.target.value, 10) : ""
                  )
                }
                fullWidth
                InputProps={{
                  inputProps: { min: 0 },
                }}
              />
            </FormControl>
          </div>

          {selectedCategory === "Immobilier" && (
            <ImmobilierFilters
              selectedRooms={selectedRooms}
              setSelectedRooms={setSelectedRooms}
              selectedBathrooms={selectedBathrooms}
              setSelectedBathrooms={setSelectedBathrooms}
              selectedSurface={selectedSurface}
              setSelectedSurface={setSelectedSurface}
            />
          )}
          {selectedCategory === "Automobile" && (
            <VehiculeFilters
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedKilometrage={selectedKilometrage}
              setSelectedKilometrage={setSelectedKilometrage}
            />
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default FilterControls;
