import pandas as pd

# Assuming your DataFrame is named df

df= pd.read_csv("C:/Users/abani/Downloads/hackathon-backend-main/hackathon-backend-main/hackathon-server/data_map1.csv")

def filter_dataframe(category):
    if category.lower() == 'tech':
        filtered_df = df[df['Course Code'].str.startswith('CS') | df['Course Code'].str.startswith('AI')]
    elif category.lower() == 'finance':
        filtered_df = df[df['Course Code'].str.startswith('FP') | df['Course Code'].str.startswith('BM')]
    elif category.lower() == 'business':
        filtered_df = df[df['Course Code'].str.startswith('EP')]
    elif category.lower() == 'core':
      user_roll_number = input("Enter your roll number (format: XXCSXXXXX): ")
      user_category = extract_department(user_roll_number)


      filtered_df = df[df['Course Code'].str.startswith(user_category) ]
    elif category.lower() == 'humanity':
        filtered_df = df[df['Course Code'].str.startswith('HS')]
    else:
        filtered_df = pd.DataFrame()  # Empty DataFrame if category is not recognized

    

    return filtered_df

# Function to extract department code from roll number
def extract_department(roll_number):
    department_code = roll_number[2:4]  # Assuming CS department code is in the 3rd and 4th characters
    return department_code

# Get user input for category
user_category = input("Enter category (Tech, Finance, Business, Humanity, Core): ")


# # Call the function with adjusted category
filtered_df = filter_dataframe(user_category)

# Sort the DataFrame so that rows with missing values are at the bottom
filtered_df = filtered_df.sort_values(by=['URL'], na_position='last')
    

# # Print the filtered DataFrame
list = filtered_df['Course Code'].to_list()


