import { Box,  MenuItem, Stack, Typography } from "@mui/material"
import iso from "iso-3166-1"
import SelectElement from "./SelectElement"
import { FC } from "react"

interface SelectProps {
    onChange: Function
}

interface MRMenuProps {
    handleRegionChange: Function,
    handleYearChange: Function,
}

const CountriesSelect = ({onChange}:SelectProps) => {

    const countries = [
        "UKRAINE",
        "FRANCE",
        "SPAIN",
        "UNITED STATES OF AMERICA",
        "ITALY",      
        "JAPAN",
        "POLAND",
        "NETHERLANDS",
        "GREECE",
      ].sort();

      return(<SelectElement onChangeFunc={onChange} name="countries">
          <MenuItem value="">
            <em>Worldwide</em>
        </MenuItem>
        {countries.map((name) => {
            const country = iso.whereCountry(name)
            if(!country) return null
        
            return <MenuItem value={country.alpha2}>{country.country}</MenuItem>
        })}
      </SelectElement>)
}


const YearSelect = ({onChange}:SelectProps) => {
    const dates = [0,1,2].map((num) => new Date().getFullYear() + num)

    return(<SelectElement defaultValue={new Date().getFullYear()} onChangeFunc={onChange} name="countries">
        {dates.map((date) => {
            return <MenuItem value={date}>{date}</MenuItem>
        })}
    </SelectElement>)
}



const MRMenu : FC<MRMenuProps> = ({handleRegionChange,handleYearChange}) => (
    <Box sx={{display: "flex", alignContent: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem"}}>
        <Typography variant="h6" fontWeight={"600"} textTransform={"uppercase"}>Upcoming release</Typography>
        
        <Stack direction={"row"} spacing={2}>
                <CountriesSelect onChange={handleRegionChange}/>   
                <YearSelect onChange={handleYearChange}/>   
        </Stack>
    </Box>
)

export default MRMenu