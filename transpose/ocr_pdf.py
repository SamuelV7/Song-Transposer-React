import pytesseract
import pdf2image
import os

def openfile(filename):
    with open(filename, 'rb') as f:
        return f.read()

def convertToImage(filename):
    pages = pdf2image.convert_from_path(filename)
    return pages

def getTextArray(filename):
    text = getText(filename)
    return [text]

def getText(filename):
    pages = convertToImage(filename)
    text = ""
    for page in pages:
        text += pytesseract.image_to_string(page, config='-c preserve_interword_spaces=1')
    return text

def testing(getText):
    test1 = "Grace_Greater_Than_Our_Sin_-_Key_G.pdf"
    test2 = "he_who_is_mighty-a-guitar.pdf"

    print(getText(test1))

    print("END OF TEST 1 \n")
    print(getText(test2))
    print("END OF TEST 2 \n")

def getPDFs(directory):
    files = os.listdir(directory)
    return files

def save(text, filename: str):
    name = filename.split(".")[0]
    with open(f"text/{name}.txt", 'w+') as f:
        f.write(text)

def convert_PDF_to_Text(directory):
    files = getPDFs(directory)
    # get files from the songsPDF directory and get text and then save it to a text file
    [save(getText(f"songsPDF/{file}"), file) for file in files]

convert_PDF_to_Text("songsPDF")