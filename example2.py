import os
from flask import Flask, render_template, request, send_file
from rembg import remove
from PIL import Image
import io
import logging

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:8081"}})

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def home():
    app.logger.info("Rendering home page")
    my_variable = False
    return render_template('index.html', my_variable=my_variable)

@app.route('/about')
def about():
    return render_template('about.html')

# @app.route('/illstor')
# def illstor():
#     return render_template('illstor.html')

@app.route('/remove-background', methods=['POST'])
def remove_background():
    try:
        app.logger.info("Received a request to remove background")

        if 'image' not in request.files:
            app.logger.error("No file part in the request")
            return "No file part in the request", 400

        file = request.files['image']

        if file.filename == '':
            app.logger.error("No selected file")
            return "No selected file", 400

        app.logger.info(f"Processing file: {file.filename}")

        input_image = Image.open(file)

        output_image = io.BytesIO()
        output = remove(input_image)
        output.save(output_image, format='PNG')
        output_image.seek(0)

        app.logger.info("Background removed successfully, returning the image")

        return send_file(
            output_image,
            mimetype='image/png',
            as_attachment=False
        )
    except Exception as e:
        app.logger.error(f"Failed to process image: {e}", exc_info=True)
        return "Failed to process image!", 500


# def get_image_list(directory):
#     image_list = []
#     for filename in os.listdir(directory):
#         if filename.endswith(".jpg") or filename.endswith(".png"):  
#             filepath = os.path.join(directory, filename)
#             try:
#                 with Image.open(filepath) as img:
#                     image_list.append((filename, img.size))
#             except IOError:
#                 print(f"Unable to open image file: {filename}")
#     return image_list

# def get_image_list(directory):
#     image_list = []
#     for filename in os.listdir(directory):
#         if filename.endswith((".jpg", ".png", ".svg")):  
#             filepath = os.path.join(directory, filename)
#             if filename.endswith(".svg"):
#                 # For SVG files, you can't get dimensions easily without additional libraries.
#                 # You can store a placeholder dimension or read the SVG file to get dimensions if necessary.
#                 image_list.append((filename, (0, 0)))
#             else:
#                 try:
#                     with Image.open(filepath) as img:
#                         image_list.append((filename, img.size))
#                 except IOError:
#                     print(f"Unable to open image file: {filename}")
#     return image_list
def get_image_list(directory):
    image_list = []
    for filename in os.listdir(directory):
        if filename.endswith((".svg")):  
            filepath = os.path.join(directory, filename)
            if filename.endswith(".svg"):
                image_list.append((filename, (0, 0)))  # Placeholder for SVG dimensions
            else:
                try:
                    with Image.open(filepath) as img:
                        image_list.append((filename, img.size))
                except IOError:
                    print(f"Unable to open image file: {filename}")
    return image_list

@app.route('/illstor')
def illstor():
    image_directory = './static/img' 
    images = get_image_list(image_directory)
    return render_template('illstor.html', images=images)

if __name__ == '__main__':
    app.run(port=8081, debug=True)