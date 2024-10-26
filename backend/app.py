from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection details
conn = psycopg2.connect(
    dbname='us-based-startups',
    user='postgres',
    password='shruti99',  # Update this password if necessary
    host='localhost',
    port='5432'
)

@app.route('/api/random-startup-name', methods=['GET'])
def get_random_startup():
    try:
        # Open a cursor to perform database operations
        cursor = conn.cursor()
        
        # Execute SQL query to get a random startup name
        cursor.execute('SELECT name FROM startups ORDER BY RANDOM() LIMIT 1;')
        result = cursor.fetchone()
        
        # Close the cursor after the query
        cursor.close()
        
        # Check if a result was found and return it
        if result:
            return jsonify({'startupName': result[0]})  # Return startup name in JSON
        else:
            return jsonify({'startupName': 'DefaultStartup'}), 404  # In case no startup is found
    except Exception as e:
        print(f"Error fetching startup: {e}")
        return jsonify({'error': 'Something went wrong'}), 500  # Return server error
# @app.route('/api/random-startup', methods=['GET'])
# def get_random_startup_description():
#     cursor = conn.cursor()
#     cursor.execute('SELECT name, description, image_url FROM startups ORDER BY RANDOM() LIMIT 1;')
#     result = cursor.fetchone()
#     cursor.close()
#     if result:
#         return jsonify({
#             'startupName': result[0],
#             'startupDescription': result[1],
#             'backgroundImage': result[2]
#         })
#     return jsonify({
#         'startupName': 'DefaultStartup',
#         'startupDescription': 'Default description.',
#         'backgroundImage': 'assets/default-image.jpg'  # Provide a default image URL
#     }), 404
# @app.route('/api/startup-image', methods=['GET'])
# def get_startup_image():
#     cursor = conn.cursor()
#     cursor.execute('SELECT image_url FROM startups ORDER BY RANDOM() LIMIT 1;')  # Assuming 'image_url' is the column containing your image links
#     result = cursor.fetchone()
#     cursor.close()
    
#     if result:
#         return jsonify({'imageUrl': result[0]})
#     return jsonify({'imageUrl': None}), 404
# Assuming conn is the connection to PostgreSQL
# Make sure you have the `conn` object established to connect to your PostgreSQL database

@app.route('/api/random-startup', methods=['GET'])
def get_random_startup_description():
    try:
        # Open a cursor to perform database operations
        cursor = conn.cursor()
        
        # SQL query to get a random startup's name, description, and logo
        cursor.execute('SELECT name,decription,logo_url FROM startups ORDER BY RANDOM() LIMIT 1;')
        result = cursor.fetchone()
        
        # Close the cursor after the query
        cursor.close()
        
        # Check if a result was found
        if result:
            startup_name = result[0]
            startup_description = result[1]
            startup_image = result[2]

            # Return the fetched startup's details
            return jsonify({
                'startupDescription': startup_description,
                'backgroundImage': startup_image,
                'startupName': startup_name
                
               
                
                
            })
        else:
            # Default response if no startup was found
            return jsonify({
                'startupName': 'DefaultStartup',
                'backgroundImage': 'Default Image',
                'startupDescription': 'Default description.'
                
            }), 404
    except Exception as e:
        print(f"Error fetching startup: {e}")
        return jsonify({'error': 'Something went wrong'}), 500

@app.route('/api/startups', methods=['GET'])
def get_startups():
    try:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, name, decription, carousel_images
            FROM startups ORDER BY RANDOM();
        ''')
        
        # Fetch the results from the cursor
        startups = cursor.fetchall()  

        # Map the data to the structure needed by your frontend
        result = [
            {
                'id': row[0],
                'name': row[1],
                'description': row[2],  # Assuming you want to keep this consistent in your frontend
                'images': row[3] if row[3] else []  # Ensure images is an empty list if None
            }
            for row in startups
        ]

        cursor.close()
        return jsonify(result), 200  # Return a 200 status code
    except Exception as e:
        print(f"Error fetching startups: {e}")
        return jsonify({'error': 'Something went wrong'}), 500  # Return server error

# @app.route('/api/startups/update-carousel', methods=['POST'])
# def update_carousel():
#     data = request.json
#     startup_name = data.get('name')
#     new_images = data.get('carousel_images')

#     try:
#         cursor = conn.cursor()
#         cursor.execute('''
#             UPDATE startups
#             SET carousel_images = %s
#             WHERE name = %s;
#         ''', (new_images, startup_name))
        
#         conn.commit()  # Make sure to commit the changes
#         cursor.close()
#         return jsonify({'message': 'Carousel images updated successfully'}), 200
#     except Exception as e:
#         print(f"Error updating carousel images: {e}")
#         return jsonify({'error': 'Something went wrong'}), 500  # Return server error


# Assuming you have already established your database connection (conn)
# conn = psycopg2.connect(...)

@app.route('/api/startups/add-carousel', methods=['POST'])
def add_carousel():
    data = request.json
    startup_name = data.get('name')
    new_images = data.get('carousel_images')

    try:
        cursor = conn.cursor()
        
        # First, retrieve the current carousel images for the startup
        cursor.execute('''
            SELECT carousel_images FROM startups WHERE name = %s;
        ''', (startup_name,))
        current_images = cursor.fetchone()

        # Check if the startup exists
        if current_images is None:
            return jsonify({'error': 'Startup not found'}), 404  # Return not found error

        # Combine the current images with the new ones
        combined_images = current_images[0] + new_images if current_images[0] else new_images

        # Update the carousel images in the database
        cursor.execute('''
            UPDATE startups
            SET carousel_images = %s
            WHERE name = %s;
        ''', (combined_images, startup_name))

        conn.commit()  # Commit the changes
        cursor.close()
        return jsonify({'message': 'Carousel images added successfully'}), 200
    except Exception as e:
        print(f"Error updating carousel images: {e}")
        return jsonify({'error': 'Something went wrong'}), 500  # Return server error

# API Route: Fetch Descriptions
@app.route('/api/descriptions', methods=['GET'])
def get_descriptions():
    cursor = conn.cursor()
    cursor.execute('SELECT startup_id, descriptions FROM description;')
    descriptions = cur.fetchall()
    cursor.close()
    conn.close()

    description_list = [{"startup_id": desc[0], "descriptions": desc[1]} for desc in descriptions]
    return jsonify(description_list)
# Route to add new startup
@app.route('/api/data-to-table', methods=['POST'])
def add_startup():
    data = request.get_json()

    try:
        # Connect to the database
        cur = conn.cursor()

         # Prepare and execute SQL query (corrected column name 'description')
        cur.execute('''
            INSERT INTO startups (id, name, logo_url, decription, carousel_images, tasks)
            VALUES (%s, %s, %s, %s, %s, %s)
        ''', (
            data['id'],
            data['name'],
            data['logo_url'],
            data.get('decription'),  # Corrected name here
            data.get('carousel_images'),
            data.get('tasks')
        ))

        # Commit the transaction
        conn.commit()

        # Close the cursor and connection
        cur.close()
        conn.close()

        return jsonify({'message': 'Startup added successfully!'}), 201
    except Exception as e:
        if conn:
            conn.rollback()  # Rollback in case of error
        return jsonify({'error': str(e)}), 400

@app.route('/api/business_images/<int:startup_id>', methods=['GET'])
def get_business_images(startup_id):
    cursor = conn.cursor()
    cursor.execute('SELECT image_urls FROM business_images WHERE startup_id = %s', (startup_id,))
    images = cursor.fetchone()

    if images:
        return jsonify(images[0])  # Send the array of images
    else:
        return jsonify([]), 404
    cursor.close()
    conn.close()
@app.route('/api/add_business_images', methods=['POST'])
def add_business_image():
    data = request.json
    startup_id = data.get('startup_id')
    image_url = data.get('image_urls')

    if not startup_id or not image_url:
        return jsonify({'error': 'startup_id and image_urls are required'}), 400

    try:
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO business_images (startup_id, image_urls) VALUES (%s, %s) RETURNING *',
            (startup_id, image_url)
        )
        new_image = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Image added successfully', 'image': new_image}), 201

    except Exception as e:
        print('Error adding image:', e)
        return jsonify({'error': 'Failed to add image'}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5000)

