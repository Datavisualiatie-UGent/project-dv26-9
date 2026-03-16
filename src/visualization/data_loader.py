import pandas as pd

from pathlib import Path


# Path to CSV relative to project root
DATA_PATH = Path(__file__).resolve().parents[2] / "data" / "military-spending-sipri" / "military-spending-sipri.csv"

COUNTRY_COL = "Entity"
CODE_COL = "Code"
YEAR_COL = "Year"
MILITARY_EXPENDITURE_COL = "Military expenditure"
WORLD_REGION_COL = "World region according to OWID"


def load_data(clean=True):
    """Load the military spending data from the CSV file.

    :param clean: If True, perform basic cleaning on the data (e.g., remove unnecessary columns, clean country names).
    :return: A pandas DataFrame containing the loaded (and optionally cleaned) data, or None if the file was not found or an error occurred.
    """
    if not DATA_PATH.exists():
        print(f"Error: The file {DATA_PATH} was not found.")
        return None
    
    data = pd.read_csv(DATA_PATH)
    print("Data loaded successfully.")
    
    if clean:
        data = clean_csv(data)

    return data


def clean_csv(data):
    """Perform basic cleaning on the loaded data.
    This includes removing unnecessary columns and cleaning up country names.

    :param data: A pandas DataFrame containing the raw data.
    :return: A cleaned pandas DataFrame, or None if the input data was None.
    """
    if data is None:
        print("Error: No data to clean.")
        return None

    # remove code column, as it is not needed for our analysis
    if CODE_COL in data.columns:
        data = data.drop(columns=[CODE_COL])

    # TODO: check what this (SIPRI) means and if it is important for our analysis, if not we can remove it from the country names
    # Some country names have (SIPRI) in them, we want to remove that
    # These are likely duplicates/aggregated data for the same country, but we should check if there are any differences in the data for these countries before removing it
    if COUNTRY_COL in data.columns:
        data[COUNTRY_COL] = data[COUNTRY_COL].str.replace(' (SIPRI)', '')

    return data


def get_data_for_countries(data, country_names):
    """Filter the data for specific countries.

    :param data: A pandas DataFrame containing the military spending data.
    :param country_names: A list of country names to filter by.
    :return: A pandas DataFrame containing only the data for the specified countries, or None
             if the input data was None or if no data was found for any of the specified countries.
    """
    if data is None:
        print("Error: No data to filter.")
        return None

    country_data = data[data[COUNTRY_COL].isin(country_names)]

    if country_data.empty:
        print("Warning: No data found for any of the specified countries.")
        return None

    return country_data
 

def get_data_for_region(data, region_name):
    """Filter the data for a specific world region.

    :param data: A pandas DataFrame containing the military spending data.
    :param region_name: The name of the world region to filter by.
    :return: A pandas DataFrame containing only the data for the specified region, or None
             if the input data was None or if no data was found for the specified region.
    """

    if data is None:
        print("Error: No data to filter.")
        return None 

    region_data = data[data[WORLD_REGION_COL] == region_name]

    if region_data.empty:
        print(f"Warning: No data found for the specified region: {region_name}.")
        return None

    return region_data